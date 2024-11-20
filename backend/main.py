from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import or_, and_, any_, cast, Integer, func
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.dialects.postgresql import array
from sqlalchemy.dialects import postgresql

from datetime import datetime

from typing import List, Optional
from pydantic import BaseModel, Field
from fuzzywuzzy import fuzz, process

from database import get_db
from models import Recipes, Users, PlannedMeals, Pantry

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/all_recipes")
def all_recipes(db: Session = Depends(get_db)):

    all_r = db.query(Recipes).all()
    return all_r

@app.get("/all_users")
def all_users(db: Session = Depends(get_db)):

    all_u = db.query(Users).all()
    return all_u

@app.get("/user")
def single_user(user_id: int, db: Session = Depends(get_db)):

    all_u = db.query(Users).filter(Users.user_id == user_id).all()
    return all_u

@app.get("/all_pantry")
def all_pantry(db: Session = Depends(get_db)):

    all_p = db.query(Pantry).all()
    return all_p

@app.get("/all_meals")
def all_meals(db: Session = Depends(get_db)):

    all_m = db.query(PlannedMeals).all()
    return all_m

@app.get("/indv_pantry")
def get_user_pantry(user_id: int, db: Session = Depends(get_db)):
    user_pantry = db.query(Pantry).filter(Pantry.user_id == user_id).all()

    if not user_pantry:
        raise HTTPException(status_code=404, detail="No pantry items found for this user")

    return user_pantry

@app.get("/whole_pantry/")
def get_pantry_items(user_id: int, db: Session = Depends(get_db)):
    pantry_items = db.query(Pantry).filter(
        or_(
            Pantry.user_id == user_id,
            and_(
                Pantry.is_shared == True,
                user_id == any_(Pantry.shared_with)
            )
        )
    ).all()

    return pantry_items

class UserList(BaseModel):
    user_list: List[int]

@app.post("/unique_pantry_multiple_users/")
def multi_user_pantry_items(data: UserList, db: Session = Depends(get_db)):
    pantry_items = db.query(Pantry).filter(
        or_(
            Pantry.user_id.in_(data.user_list),
            and_(
                Pantry.is_shared == True,
                Pantry.shared_with.op('&&')(data.user_list)
            )
        )
    ).all()
    
    if not pantry_items:
        raise HTTPException(status_code=404, detail="No pantry items found for given criteria.")
    
    return pantry_items


@app.get("/indv_planned_meals")
def indv_planned_meals(user_id: int, db: Session = Depends(get_db)):
    user_meals = db.query(PlannedMeals).options(joinedload(PlannedMeals.recipe)).filter(PlannedMeals.user_id == user_id).all()

    if not user_meals:
        raise HTTPException(status_code=404, detail="No planned meals found for this user")

    return user_meals

@app.get("/planned_meals")
def planned_meals(user_id: int, db: Session = Depends(get_db)):
    all_meals = db.query(PlannedMeals).options(joinedload(PlannedMeals.recipe)).filter(
        or_(
            PlannedMeals.user_id == user_id,
            and_(
                PlannedMeals.is_shared == True,
                user_id == any_(PlannedMeals.shared_with)
            )
        )
    ).all()

    return all_meals

@app.get("/meals_shared_with")
def meals_shared_with(user_id: int, db: Session = Depends(get_db)):
    shared_meals = db.query(PlannedMeals).options(joinedload(PlannedMeals.recipe)).filter(
        and_(
            PlannedMeals.is_shared == True,
            user_id == any_(PlannedMeals.shared_with)
        )
    ).all()

    return shared_meals

class PlannedMealRequest(BaseModel):
    user_id: int
    recipe_id: int
    n_servings: float
    is_shared: bool
    shared_with: List[int]

@app.post("/add_planned_meal/")
def add_planned_meal(data: PlannedMealRequest, db: Session = Depends(get_db)):
    new_meal = PlannedMeals(
        user_id=data.user_id,
        recipe_id=data.recipe_id,
        n_servings=data.n_servings,
        is_shared=data.is_shared,
        shared_with=data.shared_with
    )

    db.add(new_meal)
    db.commit()
    db.refresh(new_meal)
    return {"message": "Meal added successfully", "meal": new_meal}

class RoommateRequest(BaseModel):
    user_id: int
    roommate_id: int

@app.post("/add_roommate/")
def add_roommate(data: RoommateRequest, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.user_id == data.user_id).first()
    
    if not user: # should always be there if valid ui
        raise HTTPException(status_code=404, detail="User not found")

    if user.roommates is None:
        user.roommates = []

    if data.roommate_id in user.roommates:
        raise HTTPException(status_code=400, detail="Roommate already added")

    updated_roommates = user.roommates + [data.roommate_id]
    user.roommates = updated_roommates

    db.commit()
    db.refresh(user)
    return {"message": "Roommate added successfully", "user_id": data.user_id, "updated_roommates": user.roommates}
   
@app.post("/remove_roommate/")
def remove_roomate(data: RoommateRequest, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.user_id == data.user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.roommates is None:
        return {"message": "You have no roommates", "user_id": data.user_id}
    
    try:
        idx = user.roommates.index(data.roommate_id)
        splice = user.roommates[:idx] + user.roommates[idx + 1:]
        user.roommates = splice

        db.commit()
        db.refresh(user)
        return {"message": "Roommate removed successfully", "user_id": data.user_id, "updated_roommates": user.roommates}
    
    except ValueError:
        return {"message": "User not found in your roommates"}

        
class ShareItemRequest(BaseModel):
    pantry_id: int
    roommate_id: int

@app.post("/share_item/")
def mark_pantry_item_shared(data: ShareItemRequest, db: Session = Depends(get_db)):
    item = db.query(Pantry).filter(Pantry.pantry_id == data.pantry_id).first()
    
    if not item:
        raise HTTPException(status_code=404, detail="item not found")

    if data.roommate_id in item.shared_with:
        raise HTTPException(status_code=400, detail="item already shared with roommate")

    updated_roommates = item.shared_with + [data.roommate_id]
    item.shared_with = updated_roommates

    item.is_shared = True

    db.commit()
    db.refresh(item)
    return {"message": "Roommate added to item successfully", "pantry_id": data.pantry_id, "updated_roommates": item.shared_with}
   
@app.post("/unshare_item/")
def mark_pantry_item_unshared(data: ShareItemRequest, db: Session = Depends(get_db)):
    item = db.query(Pantry).filter(Pantry.pantry_id == data.pantry_id).first()
    
    if not item:
        raise HTTPException(status_code=404, detail="item not found")

    try:
    #     idx = user.roommates.index(data.roommate_id)
        idx = item.shared_with.index(data.roommate_id)
        splice = item.shared_with[:idx] + item.shared_with[idx + 1:]
        item.shared_with = splice

        if len(splice) == 0:
            item.is_shared = False

        db.commit()
        db.refresh(item)
        return {"message": "Roommate removed successfully", "pantry_id": data.pantry_id, "updated_roommates": item.shared_with}
    
    except ValueError:
        return {"message": "roommate not shared with"}
    

class ShareMealRequest(BaseModel):
    meal_id: int
    roommate_id: int

@app.post("/share_meal/")
def share_meal(data: ShareMealRequest, db: Session = Depends(get_db)):
    meal = db.query(PlannedMeals).filter(PlannedMeals.meal_id == data.meal_id).first()
    
    if not meal:
        raise HTTPException(status_code=404, detail="meal not found")

    if data.roommate_id in meal.shared_with:
        raise HTTPException(status_code=400, detail="meal already shared with roommate")

    updated_roommates = meal.shared_with + [data.roommate_id]
    meal.shared_with = updated_roommates

    meal.is_shared = True

    db.commit()
    db.refresh(meal)
    return {"message": "Roommate added to meal successfully", "meal_id": data.meal_id, "updated_roommates": meal.shared_with}
   
@app.post("/unshare_meal/")
def mark_pantry_item_unshared(data: ShareMealRequest, db: Session = Depends(get_db)):
    meal = db.query(PlannedMeals).filter(PlannedMeals.meal_id == data.meal_id).first()
    
    if not meal:
        raise HTTPException(status_code=404, detail="meal not found")

    try:
    #     idx = user.roommates.index(data.roommate_id)
        idx = meal.shared_with.index(data.roommate_id)
        splice = meal.shared_with[:idx] + meal.shared_with[idx + 1:]
        meal.shared_with = splice

        if len(splice) == 0:
            meal.is_shared = False

        db.commit()
        db.refresh(meal)
        return {"message": "Roommate removed successfully", "meal_id": data.meal_id, "updated_roommates": meal.shared_with}
    
    except ValueError:
        return {"message": "roommate not shared with"}
    
class PantryItemCreate(BaseModel):
    food_name: str
    quantity: float
    unit: str
    user_id: Optional[int] = None
    added_date: Optional[datetime] = None
    expiration_date: Optional[datetime] = None
    category: Optional[str] = None
    comment: Optional[str] = None
    is_shared: Optional[bool] = False
    shared_with: Optional[List[int]] = Field(default_factory=list)
    location: Optional[str] = None
    price: Optional[float] = None

@app.get("/add_item/")
async def add_pantry_item(item: PantryItemCreate, db: Session = Depends(get_db)):
    pantry_item = Pantry(
        food_name=item.food_name,
        quantity=item.quantity,
        unit=item.unit,
        user_id=item.user_id,
        added_date=item.added_date or datetime.now,
        expiration_date=item.expiration_date,
        category=item.category,
        comment=item.comment,
        is_shared=item.is_shared,
        shared_with=item.shared_with,
        location=item.location,
        price=item.price
    )

    db.add(pantry_item)
    db.commit()
    db.refresh(pantry_item)

    return pantry_item
    

@app.post("/recipes_made_from_inventory/")
async def recipes_from_users_inventory(data: UserList, db: Session = Depends(get_db)):
    pantry_items = db.query(Pantry).filter(     #contains all items shared/or not without duplicates from users
        or_(
            Pantry.user_id.in_(data.user_list),
            and_(
                Pantry.is_shared == True,
                Pantry.shared_with.op('&&')(data.user_list)
            )
        )
    ).all()
    
    if not pantry_items:
        raise HTTPException(status_code=404, detail="No pantry items found for given criteria.")
    
    all_r = db.query(Recipes).all()         #fetches all recipes from database

    #********************************Not inclusive of quantity matching
    #fuzzy matching of ingredients to pantry items
    matched_recipes_ids = []                    #return value; stores the recipes (recipe.recipe_id) that can be cooked

    # Extract pantry ingredient names (normalized to lowercase for case-insensitive comparison)
    pantry_ingredients = [p_item.food_name.lower() for p_item in pantry_items]

    for recipe in all_r:  # Iterate through each recipe in the database
        r_ingredients = [r_item.lower() for r_item in recipe.ingredients]  # Normalize recipe ingredients to lowercase

        # Check if all ingredients in the recipe have a match in pantry items
        all_match = all(
            any(fuzz.ratio(r_ingredient, p_item) > 70 for p_item in pantry_ingredients)
            for r_ingredient in r_ingredients
        )

        if all_match:  # If all ingredients are matched, add the recipe ID
            matched_recipes_ids.append(recipe.recipe_id)

    return matched_recipes_ids


@app.post("/recipes_ordered_by_match/")
async def recipes_ordered_by_match(data: UserList, db: Session = Depends(get_db)):
    pantry_items = db.query(Pantry).filter(  # Fetch all pantry items (shared or not) for the user(s)
        or_(
            Pantry.user_id.in_(data.user_list),
            and_(
                Pantry.is_shared == True,
                Pantry.shared_with.op('&&')(data.user_list)
            )
        )
    ).all()

    if not pantry_items:
        raise HTTPException(status_code=404, detail="No pantry items found for given criteria.")

    all_r = db.query(Recipes).all()  # Fetch all recipes from the database

    # Extract pantry ingredient names (normalized to lowercase for case-insensitive comparison)
    pantry_ingredients = [p_item.food_name.lower() for p_item in pantry_items]

    # List to store recipes and their match counts
    recipe_matches = []

    for recipe in all_r:  # Iterate through each recipe in the database
        r_ingredients = [r_item.lower() for r_item in recipe.ingredients]  # Normalize recipe ingredients to lowercase

        # Calculate the number of ingredients matched from the pantry
        match_count = sum(
            any(fuzz.ratio(r_ingredient, p_item) > 70 for p_item in pantry_ingredients)
            for r_ingredient in r_ingredients
        )

        # Append recipe ID and match count to the list
        recipe_matches.append((recipe.recipe_id, match_count))

    # Sort recipes by match count in descending order
    recipe_matches.sort(key=lambda x: x[1], reverse=True)

    # Return the sorted list of recipe IDs
    return [recipe_id for recipe_id, _ in recipe_matches]
