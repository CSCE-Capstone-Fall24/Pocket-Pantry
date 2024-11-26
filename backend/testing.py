from sqlalchemy import or_, and_, any_, cast, Integer, func
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.dialects.postgresql import array
from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.dialects import postgresql

from itertools import combinations
from datetime import datetime
import copy

from typing import List, Optional
from pydantic import BaseModel, Field
from fuzzywuzzy import fuzz, process

from database import get_db
from models import Recipes, Users, PlannedMeals, Pantry

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

def convert_list_to_grams(quantities, unit_names):
    if len(quantities) != len(unit_names):
        raise ValueError("The number of quantities must match the number of unit names")
    converted_quantities = []
    for quantity, unit_name in zip(quantities, unit_names):
        if unit_name in GRAMS_CONVERSION:
            converted_quantities.append(quantity * GRAMS_CONVERSION[unit_name])
        else:
            raise ValueError(f"Unit '{unit_name}' is not recognized")
    return converted_quantities

def convert_list_from_grams(quantities, unit_names):
    if len(quantities) != len(unit_names):
        raise ValueError("The number of quantities must match the number of unit names")
    converted_quantities = []
    for quantity, unit_name in zip(quantities, unit_names):
        if unit_name in GRAMS_CONVERSION:
            converted_quantities.append(quantity / GRAMS_CONVERSION[unit_name])
        else:
            raise ValueError(f"Unit '{unit_name}' is not recognized")
    return converted_quantities


app = FastAPI()
@app.post("/shopping_list/")
async def shopping_list(user_id: int, db: Session = Depends(get_db) ):
    db: Session = Session()

    #fetch planned meals of the individual user and those that are shared with them
    planned_meals = db.query(PlannedMeals).options(joinedload(PlannedMeals.recipe)).filter(
        or_(
            PlannedMeals.user_id == user_id,
            and_(
                PlannedMeals.is_shared == True,
                user_id == any_(PlannedMeals.shared_with)
            )
        )
    ).all()

    user_matches_by_meal = []
    unique_users = set()  # Use a set to avoid duplicates automatically

    for meal in planned_meals:
        user_list = []
        user_list.append(meal.user_id)
        user_list.extend(meal.shared_with)
        user_list = sorted(user_list)  # Sort for consistency in pairing
        user_matches_by_meal.append(user_list)

    user_matches_unique = []

    for user_match in user_matches_by_meal:
        if user_match not in user_matches_unique:
            user_matches_unique.append(user_match)

    # Find all unique individual users
    for user_match in user_matches_unique:
        unique_users.update(user_match)  # Add all users from each list to the set

    # Convert to a sorted list if needed
    unique_users = sorted(unique_users)

    # Find all 2-pair connections
    pair_connections = set()  # Use a set to avoid duplicate pairs

    for user_match in user_matches_unique:
        # Generate all 2-pair combinations
        pairs = combinations(user_match, 2)  # Generate all 2-pair combinations
        pair_connections.update(pairs)  # Add pairs to the set

    # Convert the set to a list if needed
    pair_connections = list(pair_connections)
    unique_users = list(unique_users)

    meal_info = []

    for meal in planned_meals:
        meal_id = meal.meal_id
        users = []
        users.append(meal.user_id)
        users.append(meal.shared_with)
        users = users.sort() 
        #query recipe table (recipes_good for meal info)
        recipe_details = db.query(Recipes).filter(Recipes.recipe_id == meal.recipe_id).first()
        ingredient_names = recipe_details.ingredients
        quantities = recipe_details.ingredient_quantities
        units = recipe_details.ingredient_units
        indv_meal_info = [meal_id, users, ingredient_names, quantities, units]
        meal_info.append(indv_meal_info)


    #fetch all the pantry items the users are associated with
    pantry_items = db.query(Pantry).filter(
        or_(
            Pantry.user_id.in_(user_list),
            and_(
                Pantry.is_shared == True,
                Pantry.shared_with.op('&&')(user_list)
            )
        )
    ).all()
    

    return


shopping_list(4)


#print(fuzz.WRatio("Easy Weeknight Spaghetti".lower(), "Spaghetti".lower()))