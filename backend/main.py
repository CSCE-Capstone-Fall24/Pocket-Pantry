from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import or_, and_, any_, cast, Integer, func, select, MetaData, Table
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.dialects.postgresql import array
from sqlalchemy.dialects import postgresql
from sqlalchemy.exc import NoResultFound

from datetime import datetime
import copy

from typing import List, Optional
from pydantic import BaseModel, Field, EmailStr
from fuzzywuzzy import fuzz, process

from database import get_db
from models import Recipes, Users, PlannedMeals, Pantry

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

GRAMS_CONVERSION = {
    # Volume to grams (based on water density)
    "cup": 240, "cups": 240, "c": 240,
    "tablespoon": 15, "tablespoons": 15, "tbsp": 15, "tbs": 15, "Tbl": 15, "T": 15,
    "teaspoon": 5, "teaspoons": 5, "tsp": 5,
    "ml": 1, "milliliter": 1, "milliliters": 1, "cc": 1,
    "l": 1000, "liter": 1000, "liters": 1000, "litre": 1000, "litres": 1000,
    "fl oz": 30, "fluid ounce": 30, "fluid ounces": 30,
    "pint": 473, "pints": 473, "pt": 473,
    "quart": 946, "quarts": 946, "qt": 946,
    "gallon": 3785, "gallons": 3785, "gal": 3785,
    "drop": 0.05, "drops": 0.05, "gtt": 0.05,
    "dash": 0.6, "dashes": 0.6,
    "pinch": 0.3, "pinches": 0.3,
    "handful": 30, "handfuls": 30,  

    # Weight to grams
    "gram": 1, "grams": 1, "g": 1, "gm": 1,
    "kilogram": 1000, "kilograms": 1000, "kg": 1000,
    "milligram": 0.001, "milligrams": 0.001, "mg": 0.001,
    "ounce": 28, "ounces": 28, "oz": 28,
    "pound": 454, "pounds": 454, "lb": 454, "lbs": 454,
    "stone": 6350, "stones": 6350, "st": 6350,

    # Miscellaneous (approximate based on common usage)
    "clove": 5, "cloves": 5,  
    "slice": 30, "slices": 30,  
    "stick": 113, "sticks": 113, 
    "can": 400, "cans": 400,  
    "bottle": 500, "bottles": 500,  
    "pack": 500, "packs": 500, "pkt": 500, "packet": 500, "packets": 500,
    "bunch": 150, "bunches": 150,  
    "piece": 100, "pieces": 100, "pc": 100,  
    "leaf": 1, "leaves": 1,  
    "sprig": 1, "sprigs": 1  
}

def convert_to_grams(quantity, unit_name):
    if unit_name in GRAMS_CONVERSION:
        return quantity * GRAMS_CONVERSION[unit_name]
    raise ValueError(f"Unit '{unit_name}' is not recognized")

def convert_from_grams(quantity, unit_name):
    if unit_name in GRAMS_CONVERSION:
        return quantity / GRAMS_CONVERSION[unit_name]
    raise ValueError(f"Unit '{unit_name}' is not recognized")


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
    rm = db.query(Users).filter(Users.user_id == data.roommate_id).first()

    if (data.user_id == data.roommate_id):
        raise HTTPException(status_code=404, detail="You cannot add yourself")

    if not user:  # Should always be there if valid UI
        raise HTTPException(status_code=404, detail="User not found")

    if not rm:
        raise HTTPException(status_code=404, detail="This user doesn't exist! Double check their ID!")

    if user.roommates is None:
        user.roommates = []

    if data.roommate_id in user.roommates:
        raise HTTPException(status_code=400, detail="Roommate already added")

    updated_roommates = user.roommates + [data.roommate_id]
    user.roommates = updated_roommates

    db.commit()
    db.refresh(user)

    roommate_data = []
    for roommate_id in user.roommates:
        roommate = db.query(Users).filter(Users.user_id == roommate_id).first()
        if not roommate:
            continue

        is_reciprocated = data.user_id in roommate.roommates
        roommate_data.append({
            "roommate_id": roommate.user_id,
            "username": roommate.username,
            "is_reciprocated": is_reciprocated,
        })

    return {
        "message": "Roommate added successfully",
        "user_id": data.user_id,
        "updated_roommates": roommate_data,
    }
   
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

        roommate_data = []
        for roommate_id in user.roommates:
            roommate = db.query(Users).filter(Users.user_id == roommate_id).first()
            if not roommate:
                continue

            is_reciprocated = data.user_id in roommate.roommates
            roommate_data.append({
                "roommate_id": roommate.user_id,
                "username": roommate.username,
                "is_reciprocated": is_reciprocated,
            })

        return {
            "message": "Roommate added successfully",
            "user_id": data.user_id,
            "updated_roommates": roommate_data,
        }
    
    except ValueError:
        return {"message": "User not found in your roommates"}

@app.get("/get_roommates/")
def get_roommates(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    roommates = user.roommates
    
    roommate_data = []
    for roommate_id in roommates:
        roommate = db.query(Users).filter(Users.user_id == roommate_id).first()
        if not roommate:
            continue

        is_reciprocated = user_id in roommate.roommates
        roommate_data.append({
            "roommate_id": roommate.user_id,
            "username": roommate.username,
            "is_reciprocated": is_reciprocated,
        })

    return {"roommates": roommate_data}

        
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


class UpdatePantryItemRequest(BaseModel):
    id: int  # Unique ID of the pantry item to update
    food_name: Optional[str] = None  
    unit: Optional[str] = None  
    user_id: int  
    added_date: Optional[datetime] = None  
    expiration_date: Optional[datetime] = None 
    category: Optional[str] = None  
    comment: Optional[str] = None  
    is_shared: Optional[bool] = None  
    shared_with: Optional[List[int]] = Field(default_factory=list)  
    location: Optional[str] = None  
    price: Optional[float] = None  

@app.put("/update_pantry_item/")
async def update_pantry_item(request: UpdatePantryItemRequest, db: Session = Depends(get_db)):
    # Fetch the pantry item to update
    pantry_item = db.query(Pantry).filter(Pantry.id == request.id, Pantry.user_id == request.user_id).first()

    if not pantry_item:
        raise HTTPException(status_code=404, detail="Pantry item not found or you do not have permission to update it.")

    # Update pantry item fields if provided in the request
    pantry_item.food_name = request.food_name if request.food_name else pantry_item.food_name
    pantry_item.quantity = request.quantity if request.quantity is not None else pantry_item.quantity
    pantry_item.unit = request.unit if request.unit else pantry_item.unit
    pantry_item.added_date = request.added_date if request.added_date else pantry_item.added_date
    pantry_item.expiration_date = request.expiration_date if request.expiration_date else pantry_item.expiration_date
    pantry_item.category = request.category if request.category else pantry_item.category
    pantry_item.comment = request.comment if request.comment else pantry_item.comment
    pantry_item.is_shared = request.is_shared if request.is_shared is not None else pantry_item.is_shared
    pantry_item.shared_with = request.shared_with if request.shared_with else pantry_item.shared_with
    pantry_item.location = request.location if request.location else pantry_item.location
    pantry_item.price = request.price if request.price is not None else pantry_item.price

    db.commit()

    return {"message": "Pantry item updated successfully", "item_id": pantry_item.id}


class RemovePantryItemRequest(BaseModel):
    id: int  # ID of the pantry item to remove
    user_id: int  # ID of the user requesting the removal

@app.put("/remove_pantry_item/")
async def remove_pantry_item(request: RemovePantryItemRequest, db: Session = Depends(get_db)):
    # Fetch the pantry item to remove
    pantry_item = db.query(Pantry).filter(Pantry.id == request.id, Pantry.user_id == request.user_id).first()

    if not pantry_item:
        raise HTTPException(status_code=404, detail="Pantry item not found or you do not have permission to remove it.")

    # Remove the pantry item
    db.delete(pantry_item)
    db.commit()

    return {"message": "Pantry item removed successfully", "item_id": request.id}



class AddFavoriteRequest(BaseModel):
    user_id: int  # ID of the user
    recipe_id: int  # ID of the recipe to add to favorites

@app.post("/add_favorite_recipe/")
async def add_favorite_recipe(data: AddFavoriteRequest, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.user_id == data.user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if data.password != user.hashed_confirmation_code:
        raise HTTPException(status_code=401, detail="Incorrect password.")

    user_roommates = user.roommates
    roommates_with_status = []
    for roommate_id in user_roommates:
        roommate = db.query(Users).filter(Users.user_id == roommate_id).first()
        if roommate:
            is_reciprocated = user.user_id in roommate.roommates
            roommates_with_status.append({
                "roommate_id": roommate.user_id,
                "username": roommate.username,
                "is_reciprocated": is_reciprocated,
            })

    user_data = {
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "account_created_at": user.account_created_at,
        "roommates": roommates_with_status,
        "favorite_recipes": user.favorite_recipes,
        "cooked_recipes": user.cooked_recipes,
    }

    return {"user_data": user_data}


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

@app.post("/signup")
def signup(data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(Users).filter(
        (Users.username == data.username) | (Users.email == data.email)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already exists.")
    
    # hashed_password = hash_password(data.password)
    hashed_password = data.password
    
    new_user = Users(
        username=data.username,
        email=data.email,
        hashed_confirmation_code=hashed_password,
        account_created_at=datetime.now(),
        roommates=[],
        favorite_recipes=[],
        cooked_recipes=[]
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    user_data = {
        "user_id": new_user.user_id,
        "username": new_user.username,
        "email": new_user.email,
        "account_created_at": new_user.account_created_at,
        "roommates": new_user.roommates,
        "favorite_recipes": new_user.favorite_recipes,
        "cooked_recipes": new_user.cooked_recipes,
    }

    return {"user_data": user_data}

class Reset(BaseModel):
    user_id: int
    old_pass: str
    new_pass: str

@app.post("/reset_pass")
def reset_pass(data: Reset, db: Session = Depends(get_db)):

    user = db.query(Users).filter(Users.user_id == data.user_id).first()

    if user.hashed_confirmation_code != data.old_pass:
        raise HTTPException(status_code=401, detail="Incorrect password.")

    # old pass is correct
    user.hashed_confirmation_code = data.new_pass

    db.commit()
    db.refresh(user)

    return {"message": "reset password successfully"}