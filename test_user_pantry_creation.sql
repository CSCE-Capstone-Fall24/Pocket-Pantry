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
    '2006-09-18', 
    ARRAY['Chinese'], 
    ARRAY[23, 22, 16, 36, 22, 36], 
    55, 
    ARRAY['Season steak with salt and pepper, toss with cornstarch and set aside.', 'Add 1 ½ tablespoons of vegetable oil in a wok or deep fry pan on medium-high heat.', 'Cook the beef in small batches until browned, about 3 minutes per side, set beef aside.', 'Add vegetables to the wok and cook for about 3 minutes with remaining vegetable oil. Remove and set aside.', 'Add stir fry sauce to the wok and bring to a simmer.', 'While sauce heats, combine corn starch with about 2-3 tablespoons of water and whisk into sauce.', 'Simmer for an additional 2-3 minutes.', 'Add vegetables to and beef back back to the wok and cook until heated through.', 'Serve over noodles.'], 
    ARRAY['Vegetable Oil', 'Flank Steak', 'Lo Mein Noodles, 'Cornstarch', 'Frozen Stir Fry Vegetables', 'Salt', 'Pepper', 'Green Onions', 'Beef Stir Fry Sauce'], 
    ARRAY[3, 1, 1, 2, 12, 1, 1.5, 0.25, 10], 
    ARRAY['tbsp', 'lbs', 'lbs', 'tsp', 'ounces', 'tsp', 'tsp', 'cups', 'fl oz'], 
    6, 
    9, 
    9, 
    ARRAY[]
);


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
    'Do you like your cookies gooey? I do! I think that’s what makes it so hard to keep from eating all of them at once. That warm, melted butter texture and chocolatey flavor is what makes these the best chocolate chip cookies! I used to always make that old original Toll House chocolate chip cookie recipe but it needed an update and this original recipe hits the mark perfectly.', 
    55932, 
    976, 
    '2008-12-15',
    ARRAY['Dessert'], 
    ARRAY[14, 22, 65, 7, 5, 23, 15], 
    85,
    ARRAY['In a large bowl, cream the butter, granulated sugar, and brown sugar until creamy, then beat in the egg and vanilla.', 'In a separate bowl, whisk together the flour, cornstarch, baking soda, and salt.', 'Add the dry ingredients into the wet ingredients and mix until combined.', 'Cover the dough tightly with aluminum foil or plastic and chill in the refrigerator for at least 1 hour or up to 2 days.', 'Preheat the oven to 350F. Take the cookie dough from the refrigerator and allow to sit at room temperature for about 10 minutes.', 'Line 2 baking sheets with parchment paper and set aside. With a spoon or ice cream scoop, roll your cookie dough balls, about 1.5 tablespoons of cookie dough each.', 'Bake for 10-12 minutes until the cookies are barely golden brown around the edges. If you like your chocolate chip cookies extra gooey, bake for 8-10 minutes. Allow to cool before serving.'], 
    ARRAY['Unsalted Butter', 'Granulated Sugar', 'Brown Sugar', 'Large Egg', 'Vanilla Extract', 'All Purpose Flour', 'Cornstarch', 'Baking Soda', 'Salt', 'Semi-Sweet Chocolate Chips'], 
    ARRAY[0.75, 0.75, .25, 1, 2.5, 2, 2, 1, 0.5, 1.5], 
    ARRAY['cups', 'cups', 'cups', 'pieces', 'tsp', 'cups', 'tsp', 'tsp', 'tsp', 'cups'], 
    15, 
    8, 
    10, 
    ARRAY[]
);


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
    ARRAY[9, 20, 0, 24, 3, 15, 6], 
    315, 
    ARRAY['Melt butter in a skillet over medium heat. Cook and stir onion, celery, mushroom, and parsley in butter until slightly softened, 5 to 8 minutes.', 'Place bread cubes in a very large mixing bowl. Spoon cooked vegetables over bread cubes.', 'Season with salt, sage, poultry seasoning, thyme, marjoram, and pepper.', 'Pour in enough broth to moisten, then mix in eggs.', 'Transfer mixture to a slow cooker.', 'Cover and cook on High for 45 minutes, then reduce heat to Low and cook for 4 to 8 hours.'], 
    ARRAY['Butter', 'Chopped onion', 'Chopped celery', 'Sliced Mushrooms', 'Chopped Fresh Parsley', 'Bread Cubes', 'Salt', 'Dried Sage', 'Poultry Seasoning', 'Dried Thyme', 'Dried Marjoram', 'Ground Black Pepper', 'Chicken Broth', 'Large Eggs'], 
    ARRAY[1, 2, 2, 12, 0.25, 12, 1.5, 1.5, 1, 1, 0.5, 0.5, 4.5, 2], 
    ARRAY['cup', 'cups', 'cups', 'oz', 'cup', 'cups', 'tsp', 'tsp', 'tsp', 'tsp', 'tsp', 'tsp', 'cups', 'pieces'], 
    16, 
    6, 
    14, 
    ARRAY[]
);


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
    '<name>', 
    '<description>', 
    <food_com_id>, 
    <contributer_id>, 
    '<submitted_date>',
    ARRAY['<tag1>', '<tag2>'], 
    ARRAY[<nutrition1>, <nutrition2>], 
    <cook_time_minutes>, 
    ARRAY['<step1>', '<step2>'], 
    ARRAY['<ingredient1>', '<ingredient2>'], 
    ARRAY[<quantity1>, <quantity2>], 
    ARRAY['<unit1>', '<unit2>'], 
    <serving_size>, 
    <n_steps>, 
    <n_ingredients>, 
    ARRAY['<scraped_ingredient1>', '<scraped_ingredient2>']
);


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
    '<name>', 
    '<description>', 
    <food_com_id>, 
    <contributer_id>, 
    '<submitted_date>',
    ARRAY['<tag1>', '<tag2>'], 
    ARRAY[<nutrition1>, <nutrition2>], 
    <cook_time_minutes>, 
    ARRAY['<step1>', '<step2>'], 
    ARRAY['<ingredient1>', '<ingredient2>'], 
    ARRAY[<quantity1>, <quantity2>], 
    ARRAY['<unit1>', '<unit2>'], 
    <serving_size>, 
    <n_steps>, 
    <n_ingredients>, 
    ARRAY['<scraped_ingredient1>', '<scraped_ingredient2>']
);


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
    '<name>', 
    '<description>', 
    <food_com_id>, 
    <contributer_id>, 
    '<submitted_date>',
    ARRAY['<tag1>', '<tag2>'], 
    ARRAY[<nutrition1>, <nutrition2>], 
    <cook_time_minutes>, 
    ARRAY['<step1>', '<step2>'], 
    ARRAY['<ingredient1>', '<ingredient2>'], 
    ARRAY[<quantity1>, <quantity2>], 
    ARRAY['<unit1>', '<unit2>'], 
    <serving_size>, 
    <n_steps>, 
    <n_ingredients>, 
    ARRAY['<scraped_ingredient1>', '<scraped_ingredient2>']
);


INSERT INTO recipes_good (
    recipe_id, 
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
    '<name>', 
    '<description>', 
    <food_com_id>, 
    <contributer_id>, 
    '<submitted_date>',
    ARRAY['<tag1>', '<tag2>'], 
    ARRAY[<nutrition1>, <nutrition2>], 
    <cook_time_minutes>, 
    ARRAY['<step1>', '<step2>'], 
    ARRAY['<ingredient1>', '<ingredient2>'], 
    ARRAY[<quantity1>, <quantity2>], 
    ARRAY['<unit1>', '<unit2>'], 
    <serving_size>, 
    <n_steps>, 
    <n_ingredients>, 
    ARRAY['<scraped_ingredient1>', '<scraped_ingredient2>']
);
