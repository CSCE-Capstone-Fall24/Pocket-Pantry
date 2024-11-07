import pandas as pd
from fractions import Fraction
import re
import ast
import json
import csv

def format_array_for_postgres(value, numeric=False):
    """Convert to PostgreSQL array format with proper quote escaping."""
    if isinstance(value, float) and pd.isna(value):
        return '{}'
    
    if isinstance(value, str):
        try:
            value = ast.literal_eval(value)
        except:
            try:
                value = json.loads(value)
            except:
                value = [value]
    
    if not isinstance(value, (list, tuple)):
        value = [value]
    
    formatted_items = []
    for item in value:
        if pd.isna(item):
            formatted_items.append('NULL')
        elif numeric and isinstance(item, (int, float)):
            formatted_items.append(str(item))
        else:
            # escape any backslashes
            item_str = str(item).replace('\\', '\\\\')
            # escape quotes properly for PostgreSQL array format
            item_str = item_str.replace('"', '\\"')
            formatted_items.append(f'"{item_str}"')
    
    return '{' + ','.join(formatted_items) + '}'

def convert_quantity(quantity):
    """Convert ingredient quantities and handle ranges."""
    if pd.isna(quantity) or quantity == 'No specific quantity':
        return -1.0
    try:
        if '-' in quantity:
            parts = [float(Fraction(part.strip())) for part in re.split(r'-', quantity)]
            return sum(parts) / len(parts)
        quantity = re.sub(r'⁄|/', '/', quantity)
        return float(Fraction(quantity))
    except ValueError:
        return -1.0

df = pd.read_csv("scraped_data_w_serving_sizes.csv")

df['name'] = df['name'].str.split().str.join(' ')

df['quantities_scraped'] = df['quantities_scraped'].apply(
    lambda x: [convert_quantity(q) for q in x.split(',')] if isinstance(x, str) else x
)

array_columns = [
    'tags', 'nutrition', 'steps', 'ingredients',
    'quantities_scraped', 'units_scraped', 'ingredients_scraped'
]

for col in array_columns:
    if col in ['nutrition', 'quantities_scraped']:
        df[col] = df[col].apply(lambda x: format_array_for_postgres(x, numeric=True))
    else:
        df[col] = df[col].apply(lambda x: format_array_for_postgres(x))

column_mapping = {
    'id': 'food_com_id',
    'contributor_id': 'contributer_id',
    'submitted': 'submitted_date',
    'minutes': 'cook_time_minutes',
    'steps': 'cook_steps',
    'quantities_scraped': 'ingredient_quantities',
    'units_scraped': 'ingredient_units'
}
df.rename(columns=column_mapping, inplace=True)

desired_columns = [
    'name', 'description', 'food_com_id', 'contributer_id', 'submitted_date', 
    'tags', 'nutrition', 'cook_time_minutes', 'cook_steps', 'ingredients',
    'ingredient_quantities', 'ingredient_units', 'serving_size', 'n_steps',
    'n_ingredients', 'ingredients_scraped'
]

for col in desired_columns:
    if col not in df.columns:
        print(f"Warning: Column {col} not found in DataFrame")

remaining_columns = [col for col in df.columns if col not in desired_columns]
df = df[desired_columns + remaining_columns]

df['submitted_date'] = pd.to_datetime(df['submitted_date']).dt.strftime('%Y-%m-%d')

df.to_csv("final.csv", index=False, quoting=csv.QUOTE_MINIMAL, escapechar='\\')

print("\nSample of formatted data:")
print(df[['tags', 'nutrition', 'cook_steps']].head(1))