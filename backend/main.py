from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from typing import List
from pydantic import BaseModel

from database import get_db
from models import Recipes, Users, PlannedMeals

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