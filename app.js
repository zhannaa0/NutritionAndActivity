const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = 3000;
const WeatherRouter = require('./routes/routerWeather');
const NasaRouter = require('./routes/routerNasa');
const CatRouter = require('./routes/routerCats');
const AnimalsRouter = require('./routes/routerAnimals');
const bodyParser = require('body-parser');
const User = require('./models/User');
const userRouter = require('./routes/userRouter');
const methodOverride = require('method-override');
const pdfRouter = require('./routes/pdfRouter');

mongoose.connect("mongodb+srv://zhanna14:zhanna123@cluster0.4ow5nxc.mongodb.net/zhanna?retryWrites=true&w=majority").then(async () => {
    app.listen(5010, () => {
        console.log("Connected to database and listening on port 5010");
    });
}).catch((err) => console.error('Error connecting to database:', err));

const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        res.redirect('/login'); // User is not logged in, redirect to the login page
    }
};

app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const isAdmin = (req, res, next) => {
    if (req.session.user.isAdmin) {
        next();
    } else {
        res.status(403).send('You cannot access this page since you are not an admin.');
    }
};

app.use('/weather', authenticateUser, WeatherRouter);
app.use('/nasa', authenticateUser, NasaRouter);
app.use('/catgen', authenticateUser, CatRouter);
app.use('/animals', authenticateUser, AnimalsRouter);
app.use('/users', userRouter);
app.use('/generatePdf', authenticateUser, pdfRouter);

app.get('/', authenticateUser,(req, res)=>{
    res.render('index');
});

app.get('/nasa', (req, res)=>{
    res.render('nasa');
});

app.get('/weather', (req, res)=>{
    res.render('weather');
});

app.get('/catgen', (req, res)=>{
    res.render('catgen');
});

app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/signUp', (req, res)=>{
    res.render('signUp');
});

app.get('/admin', isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, 'name username isAdmin creationDate updateDate deletionDate');
        res.render('admin', { users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/animals', (req, res)=>{
    res.render('animals');
});

app.get('/addUser', isAdmin, (req, res)=>{
    res.render('addUser');
});

app.listen(port, ()=>{
    console.log(`App is listening on port ${port} ...`);
});
