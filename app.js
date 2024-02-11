const express = require('express');
const mongoose = require('mongoose')
const app = new express();
const port = 3000;
const WeatherRouter = require('./routes/routerWeather')
const NasaRouter = require('./routes/routerNasa')
const CatRouter = require('./routes/routerCats')
const AnimalsRouter = require('./routes/routerAnimals')
const bodyParser = require('body-parser')
const User = require('./models/User')
const userRouter = require('./routes/userRouter')
const methodOverride = require('method-override')
const pdfRouter = require('./routes/pdfRouter')


app.set('view engine', 'ejs');

app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/weather', WeatherRouter)
app.use('/nasa', NasaRouter)
app.use('/catgen', CatRouter)
app.use('/animals', AnimalsRouter)
app.use('/users', userRouter)
app.use('/generatePdf', pdfRouter)



app.get('/', (req, res)=>{
    res.render('index');
})


app.get('/nasa', (req, res)=>{
    res.render('nasa')
})


app.get('/weather', (req, res)=>{
    res.render('weather');
})


app.get('/catgen', (req, res)=>{
    res.render('catgen')
})


app.get('/login', (req, res)=>{
    res.render('login')
})

app.get('/signUp', (req, res)=>{
    res.render('signUp')
})

app.get('/admin', async (req, res) => {
    try {
        const users = await User.find({}, 'name username isAdmin creationDate updateDate deletionDate');

        res.render('admin', { users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/animals', (req, res)=>{
    res.render('animals')
})

app.get('/addUser', (req, res)=>{
    res.render('addUser')
})



app.listen(port, ()=>{
    console.log(`App is listening on port ${port} ...`)
})

mongoose.connect("mongodb+srv://zhanna14:zhanna123@cluster0.4ow5nxc.mongodb.net/zhanna?retryWrites=true&w=majority").then(async () => {

  app.listen(5010, () => {
    console.log("Connected to database and listening on port 5010");
  });
}).catch((err) => console.error('Error connecting to database:', err));
