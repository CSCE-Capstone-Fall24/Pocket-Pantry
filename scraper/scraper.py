# 137739
# 31490
# 112140
# 59389
# 44061
# 5289
# 25274
# 67888
# 70971

# import requests
from bs4 import BeautifulSoup, NavigableString
# import json
import cloudscraper
import re
import pandas as pd
from time import sleep

KNOWN_UNITS = [
    # Volume
    "cup", "cups", "c", "tablespoon", "tablespoons", "tbsp", "tbs", "Tbl", "T", 
    "teaspoon", "teaspoons", "tsp", "ml", "milliliter", "milliliters", "cc", 
    "l", "liter", "liters", "litre", "litres", "fl oz", "fluid ounce", "fluid ounces", 
    "pint", "pints", "pt", "quart", "quarts", "qt", "gallon", "gallons", "gal", 
    "drop", "drops", "gtt", "dash", "dashes", "pinch", "pinches", "handful", "handfuls",

    # Weight
    "gram", "grams", "g", "gm", "kilogram", "kilograms", "kg", "milligram", 
    "milligrams", "mg", "ounce", "ounces", "oz", "pound", "pounds", "lb", "lbs", 
    "stone", "stones", "st",

    # Miscellaneous
    "clove", "cloves", "slice", "slices", "stick", "sticks", "can", "cans", 
    "bottle", "bottles", "pack", "packs", "pkt", "packet", "packets", "bunch", 
    "bunches", "piece", "pieces", "pc", "leaf", "leaves", "sprig", "sprigs"
]


headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36'}

def scrape_ingredients(id):

    with open(f"{id}.html", "w") as myfile, open(f"{id}.txt", "w") as ingredients:
        scraper = cloudscraper.create_scraper()
        url = f"https://www.food.com/{id}"
        response = scraper.get(url, headers=headers)

        # myfile.write(str(response.content))
        # myfile.write("\n\n\n")
        soup = BeautifulSoup(response.content, "html.parser")
        myfile.write(str(soup))

        if response.status_code == 200:
            # page = BeautifulSoup(response.content, 'html.parser')

            serving_size = -1
            serving_size_section = soup.find_all('div', class_='facts__item')
            
            # for i in serving_size_section:
            #     print(i, "\n\n\n")
            # print(len(serving_size_section))

            # print("\n\n")
            # print(serving_size_section[2].find('span', class_="value"))
            # quit()
            try:
                serving_size_section = serving_size_section[2].find('span', class_="value")

                if serving_size_section:
                    serving_text = serving_size_section.get_text(strip=True)                    
                    serving_match = re.search(r'(\d+)-?(\d+)?', serving_text)
                    if serving_match:
                        if serving_match.group(2):  # if range i.e 4-5
                            lower = int(serving_match.group(1))
                            upper = int(serving_match.group(2))
                            serving_size = (lower + upper) / 2
                        else: # single digit number
                            serving_size = int(serving_match.group(1))

                print("SERVING SIZE GOT IS", serving_size)
            except:
                print("failed getting serving size")
            # quit()

            ingredients_section = soup.find('ul', class_='ingredient-list')
            ingredients = []
            quantities = []
            units = []

            # loop through all the <li> tags
            try:
                for li in ingredients_section.find_all('li', style="display: contents"):
                    quantity = li.find('span', class_='ingredient-quantity').get_text(strip=True)
                    quantity = " ".join(quantity.split())
                    
                    ingredient_text_span = li.find('span', class_='ingredient-text')
                    ingredient = ""
                    for content in ingredient_text_span.children:
                        if content.name == 'a':  # <a> tag, add a space before and after
                            ingredient += f" {content.get_text(strip=True)} "
                            # print(f"a tag {content.get_text(strip=True)}")
                        elif isinstance(content, NavigableString):
                            ingredient += content.strip()
                            # print(f"non a tag {content}")
                        # print(f"ingredient now {ingredient}")
                    ingredient = ingredient.replace("HTML_TAG_START", "").replace("HTML_TAG_END", "")
                    ingredient = " ".join(ingredient.split())

                    # ingredient = li.find('span', class_='ingredient-text').get_text(strip=True)
                    # ingredient = " ".join(ingredient.split())

                    # if first word of ingredient starts with '('
                    # match up to ), grab extra word if there
                    # take that value and add to "unit"
                    unit = "unknown unit"
                    if ingredient.startswith('('):
                        match = re.search(r'\(([^)]+)\)', ingredient)
                        if match:
                            # Extract unit and update ingredient
                            unit = match.group(1)
                            ingredient = ingredient[match.end():].strip()

                    # otherwise, if first word of ingredient is
                    # cup, cups, tablespoon, tablespoons, teaspoon, teaspoons
                    else:
                        first_word = ingredient.split()[0].lower()
                        if first_word in KNOWN_UNITS:
                            unit = first_word
                            ingredient = " ".join(ingredient.split()[1:])

                    if not quantity:
                        quantity = "No specific quantity"

                    ingredients.append(ingredient)
                    quantities.append(quantity)
                    units.append(unit)
            except Exception as e:
                print(f"error {e}")
                return [], [], [], -1
            
        return ingredients, quantities, units, serving_size

# scrape_ingredients(137739)

df = pd.read_csv("../datasets/100_raw_recipes.csv")
ingreds = []
quantities = []
units = []
serving_sizes = []
c = 0
for id in df["id"]:
    print(f"scraping {id}")
    ingr, quan, unit, serv = scrape_ingredients(id)
    print(f"got {ingr}\n{quan}\n{unit}\n\n")
    
    ingreds.append(ingr)
    quantities.append(quan)
    units.append(unit)
    serving_sizes.append(serv)

    sleep(.5)

    # c += 1
    # if c == 3:
    #     break

df = df.assign(ingredients_scraped=ingreds)
df = df.assign(quantities_scraped=quantities)
df = df.assign(units_scraped=units)
df = df.assign(serving_size=serving_sizes)

df.to_csv("scraped_data_w_serving_sizes.csv", encoding='utf-8', index=False)
# with open("test.txt", "w") as f:
    # for ing, quan, unit in zip(ingreds, quantities, units):
        # f.write(f"{}\n")

# scrape_ingredients(31490)
