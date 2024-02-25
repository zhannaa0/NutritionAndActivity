const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const User = require('./models/User');
const userRouter = require('./routes/userRouter');
const caloriesRouter = require('./routes/caloriesRouter');
const nutritionRouter = require('./routes/nutritionRouter');
const methodOverride = require('method-override');
const Post = require('./models/Posts')
const postsRouter = require('./routes/postsRouter')
const pdfRouter = require('./routes/pdfRouter');

mongoose.connect("mongodb+srv://zhanna14:zhanna123@cluster0.4ow5nxc.mongodb.net/assignment4?retryWrites=true&w=majority").then(async () => {
    app.listen(5010, () => {
        console.log("Connected to database and listening on port 5010");
    });
}).catch((err) => console.error('Error connecting to database:', err));

const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login'); 
    }
}; 

app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.status(403).send('You cannot access this page since you are not an admin | Вы не админ ');
    }
};

app.use(methodOverride('_method'));

app.use('/nutrition', authenticateUser, nutritionRouter);
app.use('/calories', authenticateUser, caloriesRouter);
app.use('/users', userRouter);
app.use('/generatePdf', authenticateUser, pdfRouter);
app.use('/posts', authenticateUser, isAdmin, postsRouter)



app.get('/', authenticateUser, async (req, res) => {
    try {
        let { language } = req.query;
        if (!language) {
            language = req.session.language || 'en'; 
        } else {
            req.session.language = language; 
        }

        let posts;
        if (language === 'en') {
            posts = await Post.find({}, 'image1 image2 image3 title_eng desc_eng creationDate updateDate').sort({ creationDate: -1 });
        } else if (language === 'ru') {
            posts = await Post.find({}, 'image1 image2 image3 title_ru desc_ru creationDate updateDate').sort({ creationDate: -1 });
        } else {
            posts = await Post.find({}, 'image1 image2 image3 title_eng desc_eng creationDate updateDate').sort({ creationDate: -1 });
        }

        res.render('index', { posts, language });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
});


app.post('/', authenticateUser, (req, res) => {
    const { language } = req.body;
    req.session.language = language; 
    res.redirect('/'); 
});
app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/posts',isAdmin, (req, res)=>{
    res.render('adminPosts');
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




app.get('/add',isAdmin, (req, res) => {
    res.render('addPosts');
  });

app.get('/update',isAdmin, (req, res) => {
  res.render('update');
});
  
// app.get('/addUser', isAdmin, (req, res)=>{
//     res.render('addUser');
// });


app.listen(port, ()=>{
    console.log(`App is listening on port ${port} ...`);
});
