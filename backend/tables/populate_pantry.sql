INSERT INTO Pantry (user_id, food_name, quantity, unit, added_date, expiration_date, category, comment, is_shared, shared_with, location, price)
VALUES
    -- Dairy
    (2, '2% Milk', 1, 'gallon', NOW(), NOW() + INTERVAL '7 days', 'Dairy', '', FALSE, '{}', 'Fridge', 3.50),
    (2, 'Unsalted Butter', 0.5, 'pound', NOW(), NOW() + INTERVAL '20 days', 'Dairy', '', FALSE, '{}', 'Fridge', 2.75),
    (2, 'Sharp Cheddar Cheese', 1, 'pound', NOW(), NOW() + INTERVAL '30 days', 'Dairy', '', FALSE, '{}', 'Fridge', 5.50),
    (2, 'Greek Yogurt', 4, 'count', NOW(), NOW() + INTERVAL '10 days', 'Dairy', 'Strawberry flavored', FALSE, '{}', 'Fridge', 4.00),
    (2, 'Sour Cream', 1, 'pint', NOW(), NOW() + INTERVAL '14 days', 'Dairy', 'Full-fat', FALSE, '{}', 'Fridge', 2.25),
    
    -- Produce
    (2, 'Apples', 5, 'count', NOW(), NOW() + INTERVAL '14 days', 'Fruit', 'Organic', FALSE, '{}', 'Pantry', 3.00),
    (2, 'Bananas', 6, 'count', NOW(), NOW() + INTERVAL '5 days', 'Fruit', 'Ripe', FALSE, '{}', 'Pantry', 1.20),
    (2, 'Tomatoes', 4, 'count', NOW(), NOW() + INTERVAL '7 days', 'Vegetable', 'Homegrown', FALSE, '{}', 'Fridge', 2.00),
    (2, 'Baby Spinach', 1, 'bag', NOW(), NOW() + INTERVAL '5 days', 'Vegetable', 'Pre-washed', FALSE, '{}', 'Fridge', 3.00),
    (2, 'Carrots', 1, 'pound', NOW(), NOW() + INTERVAL '20 days', 'Vegetable', '', FALSE, '{}', 'Fridge', 1.50),
    (2, 'Russet Potatoes', 3, 'pounds', NOW(), NOW() + INTERVAL '30 days', 'Vegetable', '', FALSE, '{}', 'Pantry', 2.75),
    (2, 'Red Onions', 2, 'count', NOW(), NOW() + INTERVAL '21 days', 'Vegetable', '', FALSE, '{}', 'Pantry', 1.20),
    
    -- Meat
    (2, 'Skinless Chicken Breast', 3, 'pounds', NOW(), NOW() + INTERVAL '3 days', 'Meat', '', FALSE, '{}', 'Freezer', 9.00),
    (2, 'Ground Beef', 1, 'pound', NOW(), NOW() + INTERVAL '5 days', 'Meat', '85% lean', FALSE, '{}', 'Freezer', 4.50),
    (2, 'Pork Chops', 2, 'pounds', NOW(), NOW() + INTERVAL '7 days', 'Meat', '', FALSE, '{}', 'Freezer', 8.00),
    (2, 'Smoked Bacon', 1, 'pound', NOW(), NOW() + INTERVAL '10 days', 'Meat', '', FALSE, '{}', 'Fridge', 5.25),
    
    -- Pantry Staples
    (2, 'Spaghetti', 1, 'pound', NOW(), NOW() + INTERVAL '365 days', 'Pasta', '', FALSE, '{}', 'Pantry', 1.00),
    (2, 'White Rice', 5, 'pounds', NOW(), NOW() + INTERVAL '365 days', 'Grains', 'Long grain', FALSE, '{}', 'Pantry', 3.25),
    (2, 'Canned Black Beans', 4, 'cans', NOW(), NOW() + INTERVAL '730 days', 'Canned Goods', '', FALSE, '{}', 'Pantry', 4.00),
    (2, 'Canned Tomatoes', 3, 'cans', NOW(), NOW() + INTERVAL '730 days', 'Canned Goods', '', FALSE, '{}', 'Pantry', 2.70),
    (2, 'Extra Virgin Olive Oil', 1, 'liter', NOW(), NOW() + INTERVAL '365 days', 'Oil', '', FALSE, '{}', 'Pantry', 8.00),
    (2, 'All-Purpose Flour', 5, 'pounds', NOW(), NOW() + INTERVAL '180 days', 'Baking', '', FALSE, '{}', 'Pantry', 3.50),
    (2, 'Granulated Sugar', 4, 'pounds', NOW(), NOW() + INTERVAL '365 days', 'Baking', '', FALSE, '{}', 'Pantry', 2.80),
    (2, 'Kosher Salt', 1, 'pound', NOW(), NOW() + INTERVAL '730 days', 'Spices', '', FALSE, '{}', 'Pantry', 1.50),
    (2, 'Ground Black Pepper', 1, 'ounce', NOW(), NOW() + INTERVAL '365 days', 'Spices', '', FALSE, '{}', 'Pantry', 3.00),

    -- Beverages
    (2, 'Orange Juice', 1, 'gallon', NOW(), NOW() + INTERVAL '10 days', 'Beverage', 'Freshly squeezed', FALSE, '{}', 'Fridge', 4.00),
    (2, 'Coffee Beans', 1, 'pound', NOW(), NOW() + INTERVAL '180 days', 'Beverage', 'Medium roast', FALSE, '{}', 'Pantry', 12.00),
    (2, 'Green Tea Bags', 20, 'count', NOW(), NOW() + INTERVAL '365 days', 'Beverage', 'Organic', FALSE, '{}', 'Pantry', 4.50),
    
    -- Frozen Items
    (2, 'Frozen Peas', 1, 'pound', NOW(), NOW() + INTERVAL '180 days', 'Frozen', '', FALSE, '{}', 'Freezer', 1.80),
    (2, 'Pepperoni Frozen Pizza', 2, 'count', NOW(), NOW() + INTERVAL '90 days', 'Frozen', '', FALSE, '{}', 'Freezer', 6.00),
    (2, 'Vanilla Ice Cream', 1, 'quart', NOW(), NOW() + INTERVAL '30 days', 'Frozen', '', FALSE, '{}', 'Freezer', 3.75);
