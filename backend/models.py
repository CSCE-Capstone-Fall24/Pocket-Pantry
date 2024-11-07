from database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, Text, Float, Date, ARRAY, Numeric


class Test(Base):
    __tablename__ = "test"

    id = Column(Integer,primary_key=True,nullable=False)


class Recipes(Base):
    __tablename__ = "recipes"

    # Define columns based on the schema
    name = Column(Text, nullable=False, primary_key=True)
    description = Column(Text, nullable=False)
    food_com_id = Column(Integer, nullable=False)
    contributer_id = Column(Integer, nullable=False)
    submitted_date = Column(Date, nullable=False)
    tags = Column(ARRAY(Text), nullable=False)  # Using ARRAY for an array of tags
    nutrition = Column(ARRAY(Numeric), nullable=False)  # ARRAY of numeric values for nutrition
    cook_time_minutes = Column(Integer, nullable=False)
    cook_steps = Column(ARRAY(Text), nullable=False)  # ARRAY for an array of cooking steps
    ingredients = Column(ARRAY(Text), nullable=False)  # ARRAY for an array of ingredients
    ingredient_quantities = Column(ARRAY(Numeric), nullable=False)  # ARRAY of numeric values for ingredient quantities
    ingredient_units = Column(ARRAY(Text), nullable=False)  # ARRAY of units for ingredients
    serving_size = Column(Numeric, nullable=False)
    n_steps = Column(Integer, nullable=False)
    n_ingredients = Column(Integer, nullable=False)
    ingredients_scraped = Column(ARRAY(Text), nullable=False)  # ARRAY for scraped ingredients

