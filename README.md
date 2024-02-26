Zhanna Arystanbekova, SE-2205

# Connect to MongoDB Atlas (accessable from every IP )
mongodb+srv://zhanna14:zhanna123@cluster0.4ow5nxc.mongodb.net/assignment4?retryWrites=true&w=majority


# Admin page
Please, log in with this account to get admin page:

username: zhanna

password: 1234567

# Installation
git clone https://github.com/zhannaa0/MyApp.git

npm install

npm start

Admin can add, update, delete users. All logic is in userController.js 
Information such update Date, delete date and creation date also available on Atlas.

# Description of my app
I tried to use APIs for topic - NUTRITION & HEALTHY ACTIVITY for wellness
My app provides 2 different APIs:
1) Nutrition Api - retrieves data of food components.
2) Calories burned - retrieves data of burned calories after 1 hour of activity

All of the APIs are firstly saved in my altas, then from atlas retrieving to my EJS.
For utilizing the database for efficient tracking i did ApiHistory (apihistories), which collects all user requests and responces.


# My own REST API for posts (publication)
Admin can add, update, delete posts. I used method-override for PUT and DELETE


# Localization
Pges available in RU and EN


# Users
Users can sign up and log in. All info of accounts are saved in users collection in Atlas.
If user is unauthorized it redirects to login
If user is admin, when log in it redirects to admin page.
If user is not an admin, it redirects to main page
If there is issue with log in it will show error messages on console
Regular user can NOT access admin page
I used BCRYPT for hashing passwords 



# Controllers
Contains full logic of app.

# Routes
Routes with exported functions from controllers. 

# Models
Models are responsible for adding defining Schemas and new models to DB

# Views
Views containd dynamic EJS files for front-end

# Public
Static files for styles, etc.





