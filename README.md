Zhanna Arystanbekova, SE-2205

# Connect to MongoDB Atlas (accessable from every IP )
[mongodb+srv://zhanna14:zhanna123@cluster0.4ow5nxc.mongodb.net/zhanna?retryWrites=true&w=majority](url)

# Admin page
Please, log in with this account to get admin page:

username: zhanna

passwors: 1234567


Admin can add, update, delete users. All logic is in userController.js 
Information such update Date, delete date and creation date also available on Atlas.

# Description of my app
I tried to use APIs for topic - animals and environment
My app provides 4 different APIs:
1) Animals Api (API ninja) - retrieves data of any type of animals.
2) Cat generator - get random cat image
3) NASA APOD (astronomy picture of the day)
4) Openweather - for fetching weather (it was from prev assignment)
User can download pdf file with api history (pdfRouter)

All of the APIs are firstly saved in my altas, then from atlas retrieving to my EJS.
For utilizing the database for efficient tracking i did ApiHistory (apihistories), which collects all user requests and responces.

I tried to use APIs for topic - animals and environment


# Users
Users can sign up and log in. All info of accounts are saved in users collection in Atlas.
If user is admin, when log in it redirects to admin page.
If user is not an admin, it redirects to main page
If there is issue with log in it will show error messages on console


# Controllers
Contains full logic of app.

# Routes
Routes with exported functions from controllers. (I tried to maintain clean code architecture)

# Models
Models are responsible for adding defining Schemas and new models to DB

# Views
Views containd dynamic EJS files for front-end

# Public
Static files for styles, etc.





