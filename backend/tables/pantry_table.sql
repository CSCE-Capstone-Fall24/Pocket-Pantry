CREATE TABLE Pantry (
    id SERIAL PRIMARY KEY,                    
    user_id INT REFERENCES Users(user_id),    
    food_name TEXT NOT NULL,                  
    quantity DECIMAL NOT NULL,                
    unit TEXT NOT NULL,                       
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    expiration_date TIMESTAMP,                
    category TEXT,                            
    comment TEXT,                             
    is_shared BOOLEAN DEFAULT FALSE,          
    shared_with INT[] DEFAULT '{}',           
    location TEXT,                            
    price DECIMAL                             
);