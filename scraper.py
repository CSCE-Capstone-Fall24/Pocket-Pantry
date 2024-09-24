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
from bs4 import BeautifulSoup
# import json
import cloudscraper
import re

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
            page = BeautifulSoup(response.content, 'html.parser')
            ingredients_section = soup.find('ul', class_='ingredient-list')

            ingredient_mapping = {}

            # loop through all the <li> tags
            for li in ingredients_section.find_all('li', style="display: contents"):
                quantity = li.find('span', class_='ingredient-quantity').get_text(strip=True)
                ingredient = li.find('span', class_='ingredient-text').get_text(strip=True)

                if not quantity:
                    quantity = "No specific quantity"

                ingredient_mapping[ingredient] = quantity
        
            for k, v in ingredient_mapping.items():
                ingredients.write(f"{v}, {k}\n")

# scrape_ingredients(137739)
scrape_ingredients(31490)
