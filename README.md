# **![][image1]**

# **Pocket Pantry**

*Final Report*

Nick Cunningham  
Brian Glasheen  
Connor Hoffman  
Zack Shawver  
Jacob Miller

Department of Computer Science and Engineering  
Texas A\&M University

Fall 2024  
Table of Contents

[**1 Executive Summary	3**](#1-executive-summary)

[**2 Introduction	4**](#2-introduction)

[2.1 Problem Background	4](#2.1-problem-background)

[2.2 Needs Statement	4](#2.2-needs-statement)

[2.3 Goals and Objectives	4](#2.3-goals-and-objectives)

[**3 Final Project Design	5**](#heading=h.icvqvli8kg6m)

[3.1 System Overview	5](#3.1-overview)

[3.2 Design Updates	5](#3.2-design-updates)

[3.3 Development Specifications	5](#3.3-development-specifications)

[3.4 Industry Standards	5](#heading=h.uis2qs6z5ev2)

[**4 Validation and Testing	6**](#4-validation-and-testing)

[4.1 Testing Description	6](#4.1-testing-description)

[4.2 Product Validation	6](#heading=h.eaa3exxfb35g)

[**5 Project Management	7**](#5-project-management)

[5.1 Team Roles	7](#5.1-team-roles)

[5.2 Updated Implementation Schedule	7](#5.2-implementation-schedule)

[**6 Results and Evaluation	8**](#6-results-and-evaluation)

[6.1 Experimental Results	8](#heading=h.iylzgfijjooq)

[6.2 User Feedback	8](#6.1-user-feedback)

[**7 User’s Manual	9**](#7-user’s-manual)

[7.1 Getting Started	9](#7.1-getting-started)

[7.2 Features Overview	9](#heading=h.f096andr8zbw)

       [7.3 Common Use Cases	9](#heading=h.kar3pvfviiqg)

[**8 Future Work and Recommendations	10**](#8-future-work-and-recommendations)

[**9 References	11**](#9-references)

[**10 Appendices	12**](#heading=h.85r5ytmdofdy)

# 

# **1 Executive Summary** {#1-executive-summary}

Pocket Pantry is a mobile app designed to help college students manage their food more effectively, save money, and reduce food wastage. It focuses on three main features: tracking pantry items, recommending recipes, and managing shared ingredients with roommates. The app allows students to organize their pantry, get recipe suggestions based on what they already have, and easily share food with roommates. This makes it easier to plan meals, avoid duplicate purchases, and ensure food doesn’t go to waste.

Pocket Pantry’s design is focused on ease of use. Its intuitive interface allows students to quickly add, edit, or remove items from their pantry and share food with roommates. It also provides real-time updates, ensuring that everyone stays informed about what’s available in the shared fridge or pantry. With Pocket Pantry, students can make better use of the food they already have, reduce waste, and avoid unnecessary grocery store trips.

Pocket Pantry is built using a modern tech stack. The front-end is developed with React Native, making it accessible on both iOS and Android devices, while the back-end is powered by Python with FastAPI for smooth, reliable performance. The app provides a secure, seamless experience for users while handling all the complexities of food management behind the scenes.

Pocket Pantry addresses common challenges faced by college students in managing their food, offering an efficient, user-friendly solution that helps them save time and money.

# 

# **2 Introduction** {#2-introduction}

## 2.1 Problem Background {#2.1-problem-background}

College students often face tight budgets and busy schedules, making it difficult to efficiently manage their food expenses and plan meals. As a result, many students buy groceries without fully utilizing what they already have, leading to ingredients expiring before they are used. Additionally, students living with roommates may have trouble differentiating between shared and personal ingredients, causing duplicate purchases and confusion over what belongs to each person. These issues can also lead to crowded storage spaces, creating additional barriers to cooking at home and making students more likely to spend money eating out. Our proposed solution will address these challenges, which place extra financial strains on students who may already be struggling to make ends meet.

## 2.2 Needs Statement {#2.2-needs-statement}

Existing meal planner applications typically do not cater to the unique needs and constraints of college students previously mentioned. There is a need for a solution that simplifies cooking and meal planning at home, reduces food waste, and allows students to manage shared ingredients. Having all three features in one application will help college students save time and money.

## 2.3 Goals and Objectives {#2.3-goals-and-objectives}

With over 80% of college students living with roommates \[1\], it’s crucial that our mobile application can handle shared food storage spaces. This will be done by focusing on three key areas—tracking and organizing existing ingredients, utilizing them through recipe recommendations, and managing shared commodities with other users.

Effective inventory management is essential for college students to ensure that they make the most of their existing ingredients and new purchases. To prevent food waste, students need a reliable method to track expiration dates, helping them prioritize the use of perishable items before they go bad.

Streamlined meal planning tools that recommend recipes based on what a user has in stock will help college students utilize their existing ingredients and simplify the cooking process. Furthermore, students need a way to schedule their meals around their personal commitments and activities.

Students living with roommates need a way to differentiate between shared and personal ingredients. This will help minimize duplicate purchases, saving users money and reducing food waste.

# **3 Final Project Design**

## 3.1 Overview {#3.1-overview}

Pocket Pantry is a mobile application designed to simplify kitchen management and improve collaboration among roommates. The app was built with React Native in the front-end, for an intuitive user experience, while a PostgreSQL database hosted on Heroku serves as the backend. A Python FastAPI layer acts as the intermediary, providing efficient access to the database and powering the app’s core functionalities. This enables smooth inventory management to track pantry items, meal planning for creating and organizing recipes, and collaborative sharing to facilitate seamless communication and resource sharing among users. The api layer is hosted on a personal server, ensuring flexibility, cost-efficiency, and rapid modifications.

## 3.2 Design Updates {#3.2-design-updates}

### 3.2.1 Tech Stack Updates

Throughout development, we made the following adjustments to our tech stack to improve the app's functionality and development workflow:

**Android to iOS**

Initially, development and testing were focused on Android devices. However, due to challenges with Android Studio and the availability of iOS testing devices and Expo Go app, we shifted our primary focus to iPhone development. While the app remains functional on Android, certain features are buggy, but further implementation of cross-platform capabilities wouldn’t be too hard to do in the future.

**TYPEORM to SQLAlchemy**

Our initial plan for the backend was to use TYPEORM, a JavaScript-based ORM, alongside a JavaScript API. To simplify and speed up our development cycle, we switched to SQLAlchemy, a leading industry Python SQL toolkit and ORM, with FastAPI being used to set up our endpoints. FastAPI offers a hot reload feature on saves (similar to React) which enables rapid modification of the API to speed up our development cycle. FastAPI and SQLAlchemy are plug and play, with the latter making complex queries and database operations straightforward and safe.

### 3.2.2 Feature Updates

While Pocket Pantry successfully implements core functionalities such as inventory management, meal planning, and collaborative sharing, several features and enhancements remain on our ideal development roadmap due to time constraints:

**Authentication and Security Enhancements:**

Although the app includes basic authentication, we were unable to implement a fully secure system using JSON Web Tokens (JWT) for user session management. Additionally, industry-standard encryption for sensitive data, such as password hashing and encrypted API communication, was not fully implemented. These features are critical for ensuring the privacy and security of user data and would be required before publishing.

**Advanced Recipe Suggestions:**

A planned feature was the ability to suggest recipes based on available pantry items, dietary restrictions, and user preferences. While basic filtering is functional, a more intelligent, algorithm-driven recommendation system remains incomplete.

**Offline Mode:**

We intended to allow users to access their pantry and meal plans without internet connectivity. This would have required local storage integration and sync capabilities, which were not implemented in this iteration.

**Push Notifications:**

Features such as expiration date reminders for pantry items or alerts for shared changes by roommates were planned but not implemented.

**Receipt Scanning:**

One of our most ambitious planned features was the integration of receipt scanning using optical character recognition (OCR). This would allow users to automatically update their pantry inventory by scanning store receipts, significantly improving user convenience. However, due to the technical complexity and time constraints, this feature was not implemented.

## 3.3 Development Specifications {#3.3-development-specifications}

### 3.3.1 Backend

**Database:**  
Our app uses a centralized PostgreSQL database hosted on Heroku to store and manage user data. This includes user account information, pantry data, recipes, and meal plans. The database schema is optimized to handle relationships between items, recipes, and users, ensuring efficient queries.

**API Layer:**  
A Python-based FastAPI layer bridges the front-end and the PostgreSQL database, providing RESTful endpoints for CRUD operations. The API leverages SQLAlchemy to manage interactions with the database and ensure query safety. SQLAlchemy simplifies query writing and database management by allowing Python objects to map directly to database tables, ensuring efficient and organized data handling.

### 3.3.1 Frontend

**User Interface:**  
The front-end was built with React Native. It offers an intuitive user experience. Key interface features include:

* **Recipe Filtering:** Users can search and filter recipes based on ingredients available in their pantry or by meal name.  
* **Calendar-Based Meal Planning:** Users can schedule meals for specific dates.  
* **Collaborative Features:** Designed for households, the UI supports shared access to pantry and meal planning features. Users can:  
  * **Add or Remove Roommates:** Users can add and remove other users as needed. This functionality ensures that the app remains useful even as household dynamics change.  
  * **Pantry Item Sharing:** Roommates can collaboratively update and track shared pantry items, with changes instantly reflected for all members. For example, if one roommate adds a newly purchased item or consumes an existing one, the entire household is updated in real time.  
  * **Shared Meal Plans:** Roommates can collectively view and modify the household’s meal schedule, making it easier to coordinate shared meals or individual plans.

## 3.4 Final User Features List

### 3.4.1 Features

Below is a comprehensive list of all user features offered by Pocket Pantry organized by page location within the app. Italicized bullets are background updates that will take place to make changes within other corresponding pages and areas of the app that are automatically performed between our front and back ends.

Login Page

* Existing user login  
  * User enters email/password credentials of their user  
  * *Login button will only bring you to the other pages with a valid Email/Password combination*  
* Create new user  
  * *New user enters new unique email and password credentials*

User Page

* View roommates/household  
  * Add/remove roommates  
  * *Has protections so that both users must add each other to have interactive meal plans/shareable pantry items*  
* View favorited recipes

Recipe/Meal Page

* Search for recipe  
  * Search for recipe by name \- in text search bar  
  * Search with filters  
* Filter menu/options and interactions  
  * Use items on hand only  
* Select a Recipe  
  * Open individual recipe display  
  * Add to calendar (@date and time) for individual and group meals  
* *Added to calendar display page for the user and roommates on meal*  
  * Displayed with Ingredients (have/need indicators) and prep instructions  
  * Favorite the recipe  
* *Added to favorited recipes list*  
  * Unfavorite the recipe  
* *Removed from favorited recipes list*  
  * Adjust serving size  
* *Changes ingredient quantities*  
* *Added to planned recipes with adjusted quantities*  
* Calendar view (displayed vertically, nearest dates at the top)  
  * Shows how many people a meal is planned for  
  * When the meal is opened the specific roommates on the meal are displayed  
* Adjust serving size of planned meal  
  * *Adjust shopping list calculations*  
* Selecting meal opens recipe view of above without repetitive options  
  * Remove meal from planned calendar  
  * Mark Recipe as cooked  
    * *Removes items from inventory*  
* Warning if items are needed for the planned meal are not in pantry

Pantry Page

* All items on hand in list format (shared and user owned) organized by item category  
  * Shared items marked with user specific colored icon of users shared with  
  * Item expiration displayed with item  
    * Items highlighted for soon expiration   
      * \< 1 Week to expiration \= orange text color  
      * Items at expiration date or past \= red text color  
      * \> 1 Week to expiration \= black text color  
* Mark item as shareable  
  * *User selects roommates to be shared with*  
* Edit Inventory button  
  * Add items by typing name and quantity  
    * *Available to all users on item*  
  * Remove items on click/adjust quantity  
    * *Available to all users on item*  
  * Adjust expiration date  
    * *Available to all users on item*  
  * Change Item sharing privileges of users  
    * *Only available to item owner*

Shopping List

* *Generates based on planned items minus what’s on hand between all users on each planned meal*  
  * For planned meals that are shared: all user’s fridges will be taken into account, and users can decide what portion of their ingredients to use if there is an excess  
* Quantities displayed  
* Check off button  
  * *User adds items to inventory individually to captured desired item listing name and quantities of user*  
* Distinct shared and individual shopping lists for shared meals and individual meals by usernames of roommates shared with

### 3.4.2 User Interface

Login  
![][image2]![][image3]

User Page  
![][image4]![][image5]

Recipe/Meal Page  
![][image6]![][image8]

Pantry  
![][image9]![][image10]

Shopping List  
![][image11]

# **4 Validation and Testing** {#4-validation-and-testing}

## 4.1 Testing Description {#4.1-testing-description}

As we developed the Pocket Pantry application we unit tested each function of our app in 3 phases: backend implementation, frontend implementation, and integration testing. Each core component was implemented separately on both the frontend and backend as each page of the application was addressed. We coordinated which functions our team synchronously completed between frontend and backend developers to ensure the frontend/backend components were implemented with the same functionality in mind, so the UI-design matched the completed functionality of the backend.  Below is the testing process followed for each phase of the project.

To test backend functions we tested as each endpoint was completed. We unit tested endpoints using curl commands on a testing user that was inputted in our database using sql and curl commands of other developed endpoints. This was tested in this way to ensure expected functionality before implementation with the frontend. However, some of the larger more complex functions are difficult to test in this way due to the large inputs of data. This includes the endpoints for recommended recipes that are provided based on the user’s pantry and the shopping list generation. These functions were tested in portions as each part was developed, particularly the shopping list function which ended up being more than 200 lines of code. It usually followed in the process of: testing if the data gathered was correct (did the query grab all of the desired pantry items? And relevant recipes?), perform the calculations based on the recipes, and finally unit conversions/data formatting for output. However, due to the size of data being analyzed setting up a full coverage unit test was difficult for these large functions which were tweaked following integration.

To test frontend functionality we utilized the Expo Go application on the iPhone app store which allowed for local running of our react-native app on the iPhone. Running and testing on the iPhone allowed us to view the design appearance on our intended interface. Expo Go also supports the hot-reload feature offered with react-native, so live edits were visible on the mobile device. The frontend had a similar approach to the backend for unit testing. As components were completed on the front end, such as anything that performed navigation or buttons that made appearance changes, we tested them with hard coded items/values for validating our UI design. For example, this included creating fake ‘users’ on the inventory page and selecting to share items to these ‘users’ using the share buttons implemented on the pantry item edit/creation popup to see evidence of pantry item display cards being updated with the usernames of the users shared on the item. We completed many tests of this design for most all frontend functions of the Pocket Pantry Application. 

After completing the backend functions and UI design of each page on our app, we then integrated the frontend with backend functionality using SQLAlchemy as our ORM. Once this was done we used multiple test users to test all functions with different data being handled and to test the functionality of our shared functionality. Each of these test users had different pantries and shared items to each other, so we could account for all considered edge cases. This involved inventory tracking on pen and paper to write out expected shopping list generation, expected item ownership, identifying recipes craftable, and all other expected function outputs to verify proper implementation and integration of our app functions.

**Full Functions Tested and Supported by Pocket Pantry listed by Backend Endpoints:**

**User Page**

* **Successful GET request for all users**: The `/all_users` endpoint retrieves all users from the database.  
* **Successful GET request for a single user**: The `/user` endpoint fetches a specific user by `user_id`.  
* **Roommate Management**:  
  * **Adding Roommates**: Users can successfully add a roommate via `/add_roommate`.  
  * **Removing Roommates**: Users can successfully remove a roommate via `/remove_roommate`.  
  * **Fetch Roommates**: Roommates of a user are successfully fetched via `/get_roommates`.

### **Login Page**

* **Login Authentication**:  
  * **Successful POST request for login**: `/login` authenticates a user based on username or email and password.  
  * **Successful POST request for signup**: `/signup` registers a new user and adds their details to the database.  
  * **Successful POST request for password reset**: `/reset_pass` allows a user to change their password.

### **Pantry Page**

* **Pantry Item Management**:  
  * **Successful GET request for user-specific pantry items**: `/indv_pantry` retrieves all items for a user.  
  * **Successful POST request to add a pantry item**: `/add_item` adds a new pantry item to the user's list.  
  * **Successful POST request to update a pantry item**: `/update_item` updates existing pantry items, including shared information.  
  * **Successful POST request to remove a pantry item**: `/remove_pantry_item` deletes items from the pantry.  
  * **Successful POST request to mark pantry items as shared**: `/share_item` and `/set_item_shared_with` share pantry items with roommates or remove shared status.  
  * **Successful GET request for combined pantry inventory**: `/whole_pantry` fetches pantry items accessible to a user, including shared items.

### **Meals/Recipe Page**

* **Recipe Management**:  
  * **Successful GET request for all recipes**: `/all_recipes` retrieves all recipes.  
  * **Successful GET request for recipes from inventory**: `/recipes_made_from_inventory` identifies recipes that can be cooked using available ingredients.  
  * **Successful POST request to fetch a recipe**: `/fetch_recipe_by_id` and `/fetch_recipe_by_name` retrieve recipes by ID or name, with fuzzy matching support.  
* **Planned Meal Management**:  
  * **Successful GET request for planned meals**: `/planned_meals` fetches meals planned by a user or shared with them.  
  * **Successful POST request to add a planned meal**: `/add_planned_meal` allows users to plan meals with serving size and sharing options.  
  * **Successful POST request to update a planned meal**: `/update_meal` updates details of planned meals.  
  * **Successful POST request to delete a planned meal**: `/delete_planned_meal` removes planned meals or adjusts sharing.

### **Shopping List Page**

* **Shopping List Generation**:  
  * **Successful POST request for shopping list**: `/shopping_list` generates a shopping list based on planned meals and available inventory.

    

## 4.2 Product Validation

Pocket Pantry underwent comprehensive validation to ensure the app’s functionalities align with the project’s goals of improving food management, reducing waste, and enhancing collaboration among users. This section highlights the validated features, testing methodologies, and their impact on user experience.

#### **Validated Features**

The following functionalities were successfully validated through rigorous testing:

1. **Inventory Synchronization**  
   * Users can track pantry items with real-time updates shared across household members.  
   * Expiration date alerts and status indicators (e.g., color-coded reminders) were tested and confirmed functional.  
2. **Recipe Generation**  
   * Recipes are recommended based on available ingredients in the user’s pantry.  
   * The app accurately filters recipes with the fewest missing ingredients.  
3. **Shared Ingredient Tracking**  
   * Users can share pantry items with selected roommates, and any updates (e.g., quantity adjustments) are reflected instantly for all shared users.  
   * Permissions to modify shared items were tested to ensure only authorized users can make changes.  
4. **Shopping List Generation**  
   * The app successfully generates a comprehensive shopping list based on planned meals, considering available ingredients across shared and individual pantries.  
   * Quantities are calculated accurately, and items are organized by user contributions.  
5. **Meal Planning and Collaboration**  
   * Users can plan individual or shared meals, and all household members can view and edit the plans.  
   * Adjustments to serving sizes dynamically update required ingredients and shopping lists.

#### **Testing Methodologies**

To validate the above functionalities, the following testing processes were employed:

1. **Backend Testing**  
   * Endpoint testing using cURL commands ensured correct data retrieval and manipulation.  
   * Complex functions like recipe recommendation and shopping list generation were broken into smaller components for unit testing.  
2. **Frontend Testing**  
   * The Expo Go app was used to validate the user interface on iOS devices.  
   * Hardcoded data scenarios simulated edge cases for navigation and button interactions, ensuring expected visual and functional outcomes.  
3. **Integration Testing**  
   * Multiple test users with varying pantry data were created to simulate real-world scenarios.  
   * Shared features were tested with live updates to validate real-time synchronization.

#### **User Benefits**

The validation process confirmed that Pocket Pantry meets the following user needs:

1. **Efficient Inventory Management**  
   * Reduced food waste through better tracking and expiration reminders.  
   * Enhanced organization with shared pantry features.  
2. **Streamlined Meal Planning**  
   * Simplified cooking process with recipe suggestions tailored to available ingredients.  
   * Improved collaboration for shared meal preparation.  
3. **Cost Savings**  
   * Reduced duplicate purchases by tracking shared ingredients.  
   * Generated accurate shopping lists based on meal plans.

#### **Visual Validation Examples**

To support the validation process, here are some key examples:

| Feature | Validation Example |
| ----- | ----- |
| Inventory Synchronization | A user adds an item to the pantry, and it is instantly visible to all shared members. |
| Recipe Generation | A recipe requiring only two missing ingredients is recommended from a list of 50\. |
| Shopping List Generation | A shopping list is created with precise quantities based on planned meals. |

#### **Limitations and Recommendations**

Although the core functionalities were validated, certain features remain incomplete or require improvement:

1. **Authentication and Security**  
   * While basic authentication is functional, advanced security features (e.g., JWT tokens) need to be implemented.  
2. **Advanced Recipe Suggestions**  
   * An intelligent algorithm-driven recommendation system can enhance user experience further.  
3. **Offline Access**  
   * Local storage integration for offline access remains a high-priority enhancement.

The successful validation of Pocket Pantry’s features demonstrates the app’s potential to meet user needs effectively. Future iterations can build on this strong foundation to deliver an even more robust and user-friendly experience.

# 

# **5 Project Management** {#5-project-management}

## 5.1 Team Roles {#5.1-team-roles}

* Nick Cunningham: Front-end developer and Project Manager.  
* Brian Glasheen: Full-stack developer.  
* Connor Hoffman: Back-end developer.  
* Zack Shawver: Graphics and user interface designer.  
* Jacob Miller: Front-end developer.

## 5.2 Implementation Schedule {#5.2-implementation-schedule}

Below is our proposed project schedule

![][image12]

# 

# **6 Results and Evaluation** {#6-results-and-evaluation}

## 6.1 User Feedback {#6.1-user-feedback}

As outlined in our CDR, we planned to collect feedback from people we knew. We all asked our roommates and friends to fill out our survey after getting a run-through of the Pocket Pantry app. We asked various questions and also asked them to rate the features Pocket Pantry provides. Below are the results:

![][image13]

# 

# **7 User’s Manual** {#7-user’s-manual}

## 7.1 Getting Started {#7.1-getting-started}

If it is before December 20th, you can skip setting up the API yourself and use the server the team is hosting the API on. (Do not input sensitive data, use fake passwords)

### 7.1.1 Python API

* Navigate to the /backend/ directory  
* Create a .env file   
* To use our database on Heroku, put the following in the .env (on one line)

DATABASE\_URL=\[...\]

* Install the required packages (you might need additional dependencies- psycopg2, etc )

$ pip install \-r requirements.txt

* Run FastAPI, for options specifying ip/port, reference [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)

$ fastapi run main.py 

![][image14]

Your output should look something like this.

Now the API is running\! To test it out you can view some data in your browser. Go to [http://localhost:8000/all\_recipes](http://localhost:8000/all_recipes) to view all of the recipes

### 7.1.2 React Native

* Navigate to the /react/Pocket-Pantry/ directory  
* Create a .env file with the ip address and port of the API (on one line)

EXPO\_PUBLIC\_API\_URL=http://\<API IP ADDRESS\>:\<PORT\>/

* where \<API IP ADDRESS\> and \<PORT\> are the ip address and the port you have the API running on. If it is on localhost you can simply put

EXPO\_PUBLIC\_API\_URL=http://localhost:8000/ or

EXPO\_PUBLIC\_API\_URL=http://127.0.0.1:8000/

If you are using the team’s server you can put the following

EXPO\_PUBLIC\_API\_URL=\[...\]

* Install the node packages (you will need Node Package Manager, [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

$ npm install

* When the packages install, you can run the app with expo

$ npx expo start

* To access on the web version, press w (some mobile focused features like swipe refresh do not work on the web and a phone-like browser aspect ratio is recommended)  
* To run the mobile version download the Expo Go app from the app/play store  
* Once downloaded, ensure your phone and laptop are on the same network  
* Scan the QR code


# 

# **8 Future Work and Recommendations** {#8-future-work-and-recommendations}

	Going forward, our goals for Pocket Pantry are to add additional dietary filters, allow users to add custom recipes, and advanced analytics for meal planning. Adding dietary filters will allow users with certain allergies (i.e. peanut, shellfish) and other conditions such as lactose intolerance to filter out results from recipe search that don’t meet their dietary demands. Pocket Pantry works to improve the lives of all college students, even those who can’t consume certain food.

 Custom recipes is a feature that almost made it into the final product. However, the addition of recipes caused conflicts with the recipes already in the database, so it had to be scrapped at the last minute. Adding custom recipes will be useful to those college students whose families have an assortment of recipes that they would like to store digitally. 

AI has experienced massive developments over the past decade. The use of AI to recommend recipes to users will allow users to experience more of what our app has to offer, enhancing the user experience.

Finally, we hope to implement a calorie tracker. Massive weight gains/losses is a major concern for college students as they adapt to planning meals independently. A calorie tracker with indications for if a user is going over/under the daily recommended amount of calories will be a useful tool for college students wanting to eat healthy.

# **9 References** {#9-references}

\[1\] Benchworks by Elentra. (2024). The impact of roommates on first-year students | Skyfactor Benchworks. The Impact of Roommates on First-Year Students. [https://www.skyfactor.com/research-article/roommates-impact/](https://www.skyfactor.com/research-article/roommates-impact/)

[image1]: imgs/0.png
[image2]: imgs/1.png
[image3]: imgs/3.png
[image4]: imgs/4.png
[image5]: imgs/5.png
[image6]: imgs/6.png
<!-- [image7]: imgs/2.png -->
[image8]: imgs/8.png
[image9]: imgs/9.png
[image10]: imgs/10.png
[image11]: imgs/11.png
