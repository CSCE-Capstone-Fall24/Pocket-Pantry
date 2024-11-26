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
    ARRAY[12, 17, 0, 8, 31, 13, 1], 
    15, 
    ARRAY['Place chicken in a bowl; pour 1/2 of the lemon juice over chicken and season with salt.', 'Heat olive oil in a medium skillet on medium-low heat. Place chicken into hot oil. Add remaining lemon juice and oregano; season with black pepper.', 'Cook chicken until golden brown and the juices run clear, 5 to 10 minutes per side. Internal temperature should read at least 165 degrees F.', 'Garnish chicken with parsley to serve.'], 
    ARRAY['Skinless Boneless Chicken Breast Halves', 'Medium Lemon', 'Salt', 'Freshly Ground Black Pepper', 'Olive Oil', 'Dried Oregano', 'Fresh Parsley Chopped'], 
    ARRAY[10, 1, 1, 1, 1, 1, 2], 
    ARRAY['oz', 'piece', 'pinches', 'pinches', 'tbsp', 'pinch', 'sprigs'], 
    2, 
    4, 
    7, 
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
    'Easy Weeknight Spaghetti', 
    'My family''s favorite weeknight friendly spaghetti recipe is quick and simple. The super flavorful spaghetti sauce is ready in 45 minutes and you can use your favorite ground meat to make it (beef, turkey, and chicken are all excellent).', 
    17867, 
    580, 
    '2010-11-30',
    ARRAY['Spaghetti', 'Quick Dinner', 'Comfort Food', 'Weeknight Meals', 'Italian'], 
    ARRAY[22, 26, 33, 42, 23, 18, 21], 
    45, 
    ARRAY['Heat the oil in a large pot over medium-high heat.', 'Add the meat and cook until browned, about 8 minutes. Use a wooden spoon to break the meat into smaller crumbles as the meat cooks.', 'Add the onions and cook, stirring every once in a while, until softened, about 5 minutes.', 'Stir in the garlic, tomato paste, oregano, and red pepper flakes and cook, stirring continuously for about 1 minute.', 'Pour in the water and use a wooden spoon to scrape up any bits of meat or onion stuck to the bottom of the pot.', 'Stir in the tomatoes, 3/4 teaspoon of salt, and a generous pinch of black pepper.', 'Bring the sauce to a low simmer. Cook uncovered for 25 minutes. As it cooks, stir and taste the sauce a few times so you can adjust the seasoning accordingly.', 'About 15 minutes before the spaghetti sauce finishes cooking, bring a large pot of salted water to a boil. Then, cook the pasta according to the package directions.', 'Remove the sauce from the heat and stir in the basil. Toss in the cooked pasta and leave for a minute so that it absorbs some of the sauce. Toss again, and then serve with grated parmesan cheese on top.'], 
    ARRAY['Dry Spaghetti Noodles', 'Lean Ground Beef', 'Olive Oil', 'Chopped Onion', 'Garlic Minced', 'Tomato Paste', 'Dried Oregano', 'Crushed Red Pepper Flakes', 'Crushed Tomatoes', 'Salt', 'Fresh Ground Black Pepper', 'Fresh Basil Leaves', 'Parmesan Cheese'], 
    ARRAY[1, 1, 3, 1, 3, 2, 0.5, 1, 1, 1, 1, 1, 2], 
    ARRAY['lbs', 'lbs', 'tbsp', 'cup', 'cloves', 'tbsp', 'tsp', 'pinch', 'can', 'pinch', 'pinch', 'handful', 'pinches'], 
    6, 
    9, 
    13, 
    ARRAY[]
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
    'Easy Apple Pie', 
    'This recipe is hands down, my favorite apple pie made from scratch! Juicy apple slices are coated in sugar and spices and then baked to perfection inside a flaky homemade pie crust. No need to worry about mushy apples or a soggy pie crust because this apple pie bakes to perfection every single time!', 
    64893, 
    901, 
    '2004-08-04',
    ARRAY['Dessert', 'Apple', 'Pie', 'Homemade', 'Baking', 'Comfort Food'], 
    ARRAY[19, 18, 148, 8, 3, 18, 28], 
    120, 
    ARRAY['Start by preparing this flaky pie crust recipe which makes two 9 inch pie crusts, one for the bottom and one for the top of the pie. The pie dough will need to chill for at least 1 hour before rolling out. Or use a store-bought pie crust and follow package directions.', 'Place oven rack in the center position and Preheat the oven to 400°F.', 'In a large bowl, combine the sliced apples, granulated sugar, light brown sugar, flour, cinnamon, nutmeg, and lemon juice and lemon zest; toss to coat evenly.', 'Remove the pie crust dough from the fridge and let rest at room temperature for 5-10 minutes. On a lightly floured surface, roll one disc into a 12 inch circle that is ⅛ inch thick. Carefully lay the crust into the bottom of a deep dish pie plate.', 'Spoon the apple filling over the bottom crust and discard juices at the bottom of the bowl. Roll out the second disc of pie crust until it is ⅛ inch thick and lay it over the apple filling.', 'Use a sharp knife to trim the dough along the outside edge of the pie plate. Lift the edges where the two pie crusts meet, gently press to seal and fold them under. Rotate the pie plate and repeat this process until edges are neatly tucked under themselves. Cut 4 slits in the top of the dough to allow steam to vent. Place the pie on a baking sheet.', 'Brush the surface of the pie crust with the egg wash and sprinkle with sanding sugar. Cover the edges with a pie shield or a strip of foil to keep them from over browning during the first 25 minutes.', 'Bake at 400°F for 25 minutes. Carefully remove the pie shield, turn the oven down to 375° and continue to bake for an additional 30-35 minutes or until the top is golden brown and the juices are bubbly. Cool at room temperature for at least 3 hours.'], 
    ARRAY['Pie Crusts', 'Green Apples', 'Granulated Sugar', 'Light Brown Sugar', 'All-Purpose Flour', 'Ground Cinnamon', 'Ground Nutmeg', 'Lemon Juice', 'Large Egg', 'Sanding Sugar'], 
    ARRAY[2, 7, 0.5, 0.5, 2, 1, 0.125, 1, 1, 2], 
    ARRAY['pieces', 'pieces', 'cup', 'cup', 'tbsp', 'tsp', 'tsp', 'tbsp', 'pieces', 'tbsp'], 
    8, 
    8, 
    10, 
    ARRAY[]
);
