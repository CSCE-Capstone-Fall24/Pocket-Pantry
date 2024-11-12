INSERT INTO Pantry (user_id, food_name, quantity, unit, added_date, expiration_date, category, comment, is_shared, shared_with, location, price)
VALUES
    (1, '2% Milk', 1, 'gallon', NOW(), NOW() + INTERVAL '7 days', 'Dairy', '', FALSE, '{}', 'Fridge', 3.50),
    (1, 'Eggs', 12, 'count', NOW(), NOW() + INTERVAL '10 days', 'Dairy', 'Farm fresh', FALSE, '{}', 'Fridge', 2.30),
    (2, 'Apples', 5, 'count', NOW(), NOW() + INTERVAL '14 days', 'Fruit', 'Organic', FALSE, '{}', 'Pantry', 3.00),
    (1, 'Skinless Chicken Breast', 3, 'pounds', NOW(), NOW() + INTERVAL '3 days', 'Meat', '', FALSE, '{}', 'Freezer', 9.00),
    (3, 'Whole Wheat Bread', 1, 'loaf', NOW(), NOW() + INTERVAL '5 days', 'Bakery', '', FALSE, '{}', 'Pantry', 2.50),
    (2, 'Bananas', 6, 'count', NOW(), NOW() + INTERVAL '5 days', 'Fruit', 'Ripe', FALSE, '{}', 'Pantry', 1.20),
    (3, 'Sharp Cheddar Cheese', 1, 'pound', NOW(), NOW() + INTERVAL '30 days', 'Dairy', '', FALSE, '{}', 'Fridge', 5.50),
    (1, 'Tomatoes', 4, 'count', NOW(), NOW() + INTERVAL '7 days', 'Vegetable', 'Homegrown', FALSE, '{}', 'Fridge', 2.00),
    (2, 'Unsalted Butter', 0.5, 'pound', NOW(), NOW() + INTERVAL '20 days', 'Dairy', '', FALSE, '{}', 'Fridge', 2.75),
    (3, 'Orange Juice', 1, 'gallon', NOW(), NOW() + INTERVAL '10 days', 'Beverage', 'Freshly squeezed', FALSE, '{}', 'Fridge', 4.00);
