--recipe id num: 133
INSERT INTO recipes_good (
    name,
    description, 
    food_com_id, 
    contributer_id, 
    submitted_date, 
    tags, 
    nutrition, 
    cook_time_minutes, 
    cook_steps, 
    ingredients, 
    ingredient_quantities, 
    ingredient_units, 
    serving_size, 
    n_steps, 
    n_ingredients, 
    ingredients_scraped
) 
VALUES (
    'Teriyaki Beef Stir Fry', 
    'Don''t dream of Chinese takeout…make it yourself with this beef stir fry recipe! Tender slices of beef in a savory yet sweet sauce, just like your local takeout place makes, only healthier without all that oil. My family loves when I make this beef stir fry recipe, and you''re going to love it too!', 
    78324, 
    104, 
    DATE '2006-09-18', 
    ARRAY['Chinese'], 
    ARRAY[506, 22, 16, 36, 22, 36], 
    55, 
    ARRAY['Season steak with salt and pepper, toss with cornstarch and set aside.', 'Add 1 ½ tablespoons of vegetable oil in a wok or deep fry pan on medium-high heat.', 'Cook the beef in small batches until browned, about 3 minutes per side, set beef aside.', 'Add vegetables to the wok and cook for about 3 minutes with remaining vegetable oil. Remove and set aside.', 'Add stir fry sauce to the wok and bring to a simmer.', 'While sauce heats, combine corn starch with about 2-3 tablespoons of water and whisk into sauce.', 'Simmer for an additional 2-3 minutes.', 'Add vegetables to and beef back back to the wok and cook until heated through.', 'Serve over noodles.'], 
    ARRAY['Vegetable Oil', 'Flank Steak', 'Lo Mein Noodles', 'Cornstarch', 'Frozen Stir Fry Vegetables', 'Salt', 'Pepper', 'Green Onions', 'Beef Stir Fry Sauce'], 
    ARRAY[3, 1, 1, 2, 12, 1, 1.5, 0.25, 10], 
    ARRAY['tbsp', 'lbs', 'lbs', 'tsp', 'ounces', 'tsp', 'tsp', 'cups', 'fl oz'], 
    6, 
    9, 
    9, 
    ARRAY[]::text[]
);

--recipe id num: 134
INSERT INTO recipes_good (
    name, 
    description, 
    food_com_id, 
    contributer_id, 
    submitted_date, 
    tags, 
    nutrition, 
    cook_time_minutes, 
    cook_steps, 
    ingredients, 
    ingredient_quantities, 
    ingredient_units, 
    serving_size, 
    n_steps, 
    n_ingredients, 
    ingredients_scraped
) 
VALUES (
    'Classic Chocolate Chip Cookie', 
    'Do you like your cookies gooey? I do! I think that''s what makes it so hard to keep from eating all of them at once. That warm, melted butter texture and chocolatey flavor is what makes these the best chocolate chip cookies! I used to always make that old original Toll House chocolate chip cookie recipe but it needed an update and this original recipe hits the mark perfectly.', 
    55932, 
    976, 
    '2008-12-15',
    ARRAY['Dessert'], 
    ARRAY[308, 22, 65, 7, 5, 23, 15], 
    85,
    ARRAY['In a large bowl, cream the butter, granulated sugar, and brown sugar until creamy, then beat in the egg and vanilla.', 'In a separate bowl, whisk together the flour, cornstarch, baking soda, and salt.', 'Add the dry ingredients into the wet ingredients and mix until combined.', 'Cover the dough tightly with aluminum foil or plastic and chill in the refrigerator for at least 1 hour or up to 2 days.', 'Preheat the oven to 350F. Take the cookie dough from the refrigerator and allow to sit at room temperature for about 10 minutes.', 'Line 2 baking sheets with parchment paper and set aside. With a spoon or ice cream scoop, roll your cookie dough balls, about 1.5 tablespoons of cookie dough each.', 'Bake for 10-12 minutes until the cookies are barely golden brown around the edges. If you like your chocolate chip cookies extra gooey, bake for 8-10 minutes. Allow to cool before serving.'], 
    ARRAY['Unsalted Butter', 'Granulated Sugar', 'Brown Sugar', 'Large Egg', 'Vanilla Extract', 'All Purpose Flour', 'Cornstarch', 'Baking Soda', 'Salt', 'Semi-Sweet Chocolate Chips'], 
    ARRAY[0.75, 0.75, .25, 1, 2.5, 2, 2, 1, 0.5, 1.5], 
    ARRAY['cups', 'cups', 'cups', 'pieces', 'tsp', 'cups', 'tsp', 'tsp', 'tsp', 'cups'], 
    15, 
    8, 
    10, 
    ARRAY[]::text[]
);

--recipe id num: 135
INSERT INTO recipes_good (
    name, 
    description, 
    food_com_id, 
    contributer_id, 
    submitted_date, 
    tags, 
    nutrition, 
    cook_time_minutes, 
    cook_steps, 
    ingredients, 
    ingredient_quantities, 
    ingredient_units, 
    serving_size, 
    n_steps, 
    n_ingredients, 
    ingredients_scraped
) 
VALUES ( 
    'Slow Cooker Stuffing', 
    'This crockpot stuffing is an easy way to make extra stuffing for a large crowd — and it frees up stove space because it cooks in a slow cooker. This recipe is designed for use in a standard 4-quart slow cooker and is very tasty and moist!', 
    55053, 
    451, 
    '2006-04-28',
    ARRAY['Group', 'Dinner', 'Slow Cook'], 
    ARRAY[198, 20, 0, 24, 3, 15, 6], 
    315, 
    ARRAY['Melt butter in a skillet over medium heat. Cook and stir onion, celery, mushroom, and parsley in butter until slightly softened, 5 to 8 minutes.', 'Place bread cubes in a very large mixing bowl. Spoon cooked vegetables over bread cubes.', 'Season with salt, sage, poultry seasoning, thyme, marjoram, and pepper.', 'Pour in enough broth to moisten, then mix in eggs.', 'Transfer mixture to a slow cooker.', 'Cover and cook on High for 45 minutes, then reduce heat to Low and cook for 4 to 8 hours.'], 
    ARRAY['Butter', 'Chopped onion', 'Chopped celery', 'Sliced Mushrooms', 'Chopped Fresh Parsley', 'Bread Cubes', 'Salt', 'Dried Sage', 'Poultry Seasoning', 'Dried Thyme', 'Dried Marjoram', 'Ground Black Pepper', 'Chicken Broth', 'Large Eggs'], 
    ARRAY[1, 2, 2, 12, 0.25, 12, 1.5, 1.5, 1, 1, 0.5, 0.5, 4.5, 2], 
    ARRAY['cup', 'cups', 'cups', 'oz', 'cup', 'cups', 'tsp', 'tsp', 'tsp', 'tsp', 'tsp', 'tsp', 'cups', 'pieces'], 
    16, 
    6, 
    14, 
    ARRAY[]::text[]
);

--recipe id num: 136
INSERT INTO recipes_good ( 
    name, 
    description, 
    food_com_id, 
    contributer_id, 
    submitted_date, 
    tags, 
    nutrition, 
    cook_time_minutes, 
    cook_steps, 
    ingredients, 
    ingredient_quantities, 
    ingredient_units, 
    serving_size, 
    n_steps, 
    n_ingredients, 
    ingredients_scraped
) 
VALUES (
    'Simple Lemon Herb Chicken', 
    'This lemon-herb chicken is a simple, quick, and delicious dish. All you need are a few herbs, a lemon, and of course, the chicken! The amount of spices is completely up to you. You can add more or less according to your taste.', 
    14132, 
    206, 
    '2015-03-27',
    ARRAY['Chicken', 'Quick and Easy', 'Lemon', 'Herb', 'Healthy'], 
    ARRAY[264, 17, 0, 8, 31, 13, 1], 
    15, 
    ARRAY['Place chicken in a bowl; pour 1/2 of the lemon juice over chicken and season with salt.', 'Heat olive oil in a medium skillet on medium-low heat. Place chicken into hot oil. Add remaining lemon juice and oregano; season with black pepper.', 'Cook chicken until golden brown and the juices run clear, 5 to 10 minutes per side. Internal temperature should read at least 165 degrees F.', 'Garnish chicken with parsley to serve.'], 
    ARRAY['Skinless Boneless Chicken Breast Halves', 'Medium Lemon', 'Salt', 'Freshly Ground Black Pepper', 'Olive Oil', 'Dried Oregano', 'Fresh Parsley Chopped'], 
    ARRAY[10, 1, 1, 1, 1, 1, 2], 
    ARRAY['oz', 'piece', 'pinches', 'pinches', 'tbsp', 'pinch', 'sprigs'], 
    2, 
    4, 
    7, 
    ARRAY[]::text[]
);

--recipe id num: 137
INSERT INTO recipes_good ( 
    name, 
    description, 
    food_com_id, 
    contributer_id, 
    submitted_date, 
    tags, 
    nutrition, 
    cook_time_minutes, 
    cook_steps, 
    ingredients, 
    ingredient_quantities, 
    ingredient_units, 
    serving_size, 
    n_steps, 
    n_ingredients, 
    ingredients_scraped
) 
VALUES (
    'Easy Weeknight Spaghetti', 
    'My family''s favorite weeknight friendly spaghetti recipe is quick and simple. The super flavorful spaghetti sauce is ready in 45 minutes and you can use your favorite ground meat to make it (beef, turkey, and chicken are all excellent).', 
    17867, 
    580, 
    '2010-11-30',
    ARRAY['Spaghetti', 'Quick Dinner', 'Comfort Food', 'Weeknight Meals', 'Italian'], 
    ARRAY[484, 26, 33, 42, 23, 18, 21], 
    45, 
    ARRAY['Heat the oil in a large pot over medium-high heat.', 'Add the meat and cook until browned, about 8 minutes. Use a wooden spoon to break the meat into smaller crumbles as the meat cooks.', 'Add the onions and cook, stirring every once in a while, until softened, about 5 minutes.', 'Stir in the garlic, tomato paste, oregano, and red pepper flakes and cook, stirring continuously for about 1 minute.', 'Pour in the water and use a wooden spoon to scrape up any bits of meat or onion stuck to the bottom of the pot.', 'Stir in the tomatoes, 3/4 teaspoon of salt, and a generous pinch of black pepper.', 'Bring the sauce to a low simmer. Cook uncovered for 25 minutes. As it cooks, stir and taste the sauce a few times so you can adjust the seasoning accordingly.', 'About 15 minutes before the spaghetti sauce finishes cooking, bring a large pot of salted water to a boil. Then, cook the pasta according to the package directions.', 'Remove the sauce from the heat and stir in the basil. Toss in the cooked pasta and leave for a minute so that it absorbs some of the sauce. Toss again, and then serve with grated parmesan cheese on top.'], 
    ARRAY['Dry Spaghetti Noodles', 'Lean Ground Beef', 'Olive Oil', 'Chopped Onion', 'Garlic Minced', 'Tomato Paste', 'Dried Oregano', 'Crushed Red Pepper Flakes', 'Crushed Tomatoes', 'Salt', 'Fresh Ground Black Pepper', 'Fresh Basil Leaves', 'Parmesan Cheese'], 
    ARRAY[1, 1, 3, 1, 3, 2, 0.5, 1, 1, 1, 1, 1, 2], 
    ARRAY['lbs', 'lbs', 'tbsp', 'cup', 'cloves', 'tbsp', 'tsp', 'pinch', 'can', 'pinch', 'pinch', 'handful', 'pinches'], 
    6, 
    9, 
    13, 
    ARRAY[]::text[]
);

--recipe id num: 166
INSERT INTO recipes_good (
    name, 
    description, 
    food_com_id, 
    contributer_id, 
    submitted_date, 
    tags, 
    nutrition, 
    cook_time_minutes, 
    cook_steps, 
    ingredients, 
    ingredient_quantities, 
    ingredient_units, 
    serving_size, 
    n_steps, 
    n_ingredients, 
    ingredients_scraped
) 
VALUES (
    'Easy Apple Pie', 
    'This recipe is hands down, my favorite apple pie made from scratch! Juicy apple slices are coated in sugar and spices and then baked to perfection inside a flaky homemade pie crust. No need to worry about mushy apples or a soggy pie crust because this apple pie bakes to perfection every single time!', 
    64893, 
    901, 
    '2004-08-04',
    ARRAY['Dessert', 'Apple', 'Pie', 'Homemade', 'Baking', 'Comfort Food'], 
    ARRAY[418, 18, 148, 8, 3, 18, 28], 
    120, 
    ARRAY['Start by preparing this flaky pie crust recipe which makes two 9 inch pie crusts, one for the bottom and one for the top of the pie. The pie dough will need to chill for at least 1 hour before rolling out. Or use a store-bought pie crust and follow package directions.', 'Place oven rack in the center position and Preheat the oven to 400°F.', 'In a large bowl, combine the sliced apples, granulated sugar, light brown sugar, flour, cinnamon, nutmeg, and lemon juice and lemon zest; toss to coat evenly.', 'Remove the pie crust dough from the fridge and let rest at room temperature for 5-10 minutes. On a lightly floured surface, roll one disc into a 12 inch circle that is ⅛ inch thick. Carefully lay the crust into the bottom of a deep dish pie plate.', 'Spoon the apple filling over the bottom crust and discard juices at the bottom of the bowl. Roll out the second disc of pie crust until it is ⅛ inch thick and lay it over the apple filling.', 'Use a sharp knife to trim the dough along the outside edge of the pie plate. Lift the edges where the two pie crusts meet, gently press to seal and fold them under. Rotate the pie plate and repeat this process until edges are neatly tucked under themselves. Cut 4 slits in the top of the dough to allow steam to vent. Place the pie on a baking sheet.', 'Brush the surface of the pie crust with the egg wash and sprinkle with sanding sugar. Cover the edges with a pie shield or a strip of foil to keep them from over browning during the first 25 minutes.', 'Bake at 400°F for 25 minutes. Carefully remove the pie shield, turn the oven down to 375° and continue to bake for an additional 30-35 minutes or until the top is golden brown and the juices are bubbly. Cool at room temperature for at least 3 hours.'], 
    ARRAY['Pie Crusts', 'Green Apples', 'Granulated Sugar', 'Light Brown Sugar', 'All-Purpose Flour', 'Ground Cinnamon', 'Ground Nutmeg', 'Lemon Juice', 'Large Egg', 'Sanding Sugar'], 
    ARRAY[2, 7, 0.5, 0.5, 2, 1, 0.125, 1, 1, 2], 
    ARRAY['pieces', 'pieces', 'cup', 'cup', 'tbsp', 'tsp', 'tsp', 'tbsp', 'pieces', 'tbsp'], 
    8, 
    8, 
    10, 
    ARRAY[]::text[]
);

--query to assign user## planned meal
INSERT INTO planned_meals (user_id, recipe_id, n_servings, is_shared, shared_with, expiration_date)
VALUES (72, 133, 6, FALSE, '{}', '2024-12-02'::TIMESTAMP);

--update recipe field in database query
UPDATE recipes_good
SET nutrition = ARRAY[484, 26, 33, 42, 23, 18, 21]
WHERE recipe_id = 136;

--select field from desired recipe in database
SELECT name FROM recipes_good WHERE recipe_id = 133;

