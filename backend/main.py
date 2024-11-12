from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from typing import List
from pydantic import BaseModel

from database import get_db
from models import Recipes, Users, PlannedMeals, Pantry

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/recipes")
def test_posts(db: Session = Depends(get_db)):

    all_r = db.query(Recipes).all()

    return all_r

@app.get("/users")
def test_posts(db: Session = Depends(get_db)):

    all_u = db.query(Users).all()

    return all_u

@app.get("/all_pantry")
def test_posts(db: Session = Depends(get_db)):

    all_p = db.query(Pantry).all()

    return all_p

@app.get("/pantry")
def get_user_pantry(user_id: int, db: Session = Depends(get_db)):
    user_pantry = db.query(Pantry).filter(Pantry.user_id == user_id).all()

    if not user_pantry:
        raise HTTPException(status_code=404, detail="No pantry items found for this user")

    return user_pantry

@app.get("/planned_meals")
def get_user_pantry(user_id: int, db: Session = Depends(get_db)):
    user_meals = db.query(PlannedMeals).filter(PlannedMeals.user_id == user_id).all()

    if not user_meals:
        raise HTTPException(status_code=404, detail="No planned meals found for this user")

    return user_meals

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
    # return {"message": "hi"}