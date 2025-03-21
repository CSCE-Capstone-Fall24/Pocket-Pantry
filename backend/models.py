from database import Base
from sqlalchemy import ForeignKey, Column, Integer, String, TIMESTAMP, Boolean, Text, Float, Date, Numeric
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship

class Recipes(Base):
    __tablename__ = "recipes_good"

    recipe_id = Column(Integer, nullable=False, primary_key=True)
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    food_com_id = Column(Integer, nullable=False)
    contributer_id = Column(Integer, nullable=False)
    submitted_date = Column(Date, nullable=False)
    tags = Column(ARRAY(Text), nullable=False)
    nutrition = Column(ARRAY(Numeric), nullable=False)
    cook_time_minutes = Column(Integer, nullable=False)
    cook_steps = Column(ARRAY(Text), nullable=False)
    ingredients = Column(ARRAY(Text), nullable=False)
    ingredient_quantities = Column(ARRAY(Numeric), nullable=False)
    ingredient_units = Column(ARRAY(Text), nullable=False)
    serving_size = Column(Numeric, nullable=False)
    n_steps = Column(Integer, nullable=False)
    n_ingredients = Column(Integer, nullable=False)
    ingredients_scraped = Column(ARRAY(Text), nullable=False)

class Users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, nullable=False)
    username = Column(Text)
    email = Column(Text)
    roommates = Column(ARRAY(Integer))
    favorite_recipes = Column(ARRAY(Integer))
    cooked_recipes = Column(ARRAY(Integer))
    hashed_confirmation_code = Column(Text)
    code_expires_at = Column(TIMESTAMP)
    account_created_at = Column(TIMESTAMP)
    topt_secret = Column(Text)

class PlannedMeals(Base):
    __tablename__ = "planned_meals"

    meal_id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer)
    recipe_id = Column(Integer, ForeignKey("recipes_good.recipe_id"))
    n_servings = Column(Numeric)
    is_shared = Column(Boolean)
    shared_with = Column(ARRAY(Integer))
    expiration_date = Column(TIMESTAMP)

    recipe = relationship("Recipes", backref="planned_meals")

class Pantry(Base):
    __tablename__ = "pantry"

    pantry_id = Column(Integer, primary_key=True, nullable=False)                    
    user_id = Column(Integer)
    food_name = Column(Text)                        
    quantity = Column(Numeric)                     
    unit = Column(Text)                   
    added_date = Column(TIMESTAMP)  
    expiration_date = Column(TIMESTAMP)
    category = Column(Text)            
    comment = Column(Text)                       
    is_shared = Column(Boolean)                     
    shared_with = Column(ARRAY(Integer))                   
    location = Column(Text)            
    price = Column(Numeric)                    

