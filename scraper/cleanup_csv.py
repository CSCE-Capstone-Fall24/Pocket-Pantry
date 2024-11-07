import pandas as pd
from fractions import Fraction
import re

df = pd.read_csv("scraped_data_w_serving_sizes.csv")

df['name'] = df['name'].str.split().str.join(' ')

def convert_quantity(quantity):
    if quantity == 'No specific quantity':
        return -1.0
    try:
        if '-' in quantity:
            parts = [float(Fraction(part.strip())) for part in re.split(r'-', quantity)]
            return sum(parts) / len(parts)

        quantity = re.sub(r'⁄|/', '/', quantity)
        return float(Fraction(quantity))
    except ValueError:
        return -1.0

df['quantities_scraped'] = df['quantities_scraped'].apply(
    lambda x: [convert_quantity(q) for q in eval(x)] if isinstance(x, str) else x
)

df['quantities_scraped'] = df['quantities_scraped'].apply(
    lambda x: [convert_quantity(q) for q in eval(x)] if isinstance(x, str) else x
)

df.rename(columns={
    'id': 'food_com_id',
    'contributor_id': 'contributer_id',
    'submitted': 'submitted_date',
    'minutes': 'cook_time_minutes',
    'steps': 'cook_steps',
    'quantities_scraped': 'ingredient_quantities',
    'units_scraped': 'ingredient_units'
}, inplace=True)

desired_columns = [
    'name', 'description', 'food_com_id', 'contributer_id', 'submitted_date', 'tags', 
    'nutrition', 'cook_time_minutes', 'cook_steps', 'ingredients', 
    'ingredient_quantities', 'ingredient_units', 'serving_size'
]
remaining_columns = [col for col in df.columns if col not in desired_columns]
df = df[desired_columns + remaining_columns]

df.to_csv("final.csv", index=False)
