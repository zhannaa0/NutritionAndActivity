const User = require('../models/User')
const bcrypt =  require('bcrypt')

const getAllUsers =  async (req, res, next)=>{
    let users;
    try{
        users = await User.find();
        res.render('admin', { users, user: req.user });
    } catch(err){
        console.log(err)
    }

    if(!users){
        return res.status(404).json({ message: 'No Users Found' })
    }

    return res.status(200).json({ users})
}


const signup = async (req, res) => {
    const { name, username, password, isAdmin } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // const hashedPassword = bcrypt.hashSync(password, 7);

        const user = new User({
            name,
            username,
            // password: hashedPassword,
            password,
            isAdmin 
        });

        await user.save();

        return res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const login = async (req, res) =>{
    const {username, password} = req.body

    let existingUser;

    try{
        existingUser = await User.findOne({username})

    } catch(err){
        console.error(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }

    if(!existingUser){
        return res.status(404).json({message: 'User with this username does not exist'});
    }

    // const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    const isPasswordCorrect = password === existingUser.password;

    if (!isPasswordCorrect){
        console.log('Incorrect password');
        return res.status(400).json({message: 'Incorrect password'});
    }

    console.log('Login successful');
    req.session.user = existingUser;

    if (existingUser.isAdmin) {
        
        console.log('Admin login detected');
        return res.status(200).json({ isAdmin: true });
    }
    console.log('Not an admin, continuing with regular response');
    return res.status(200).json({message: 'Login successful'});
}

const deleteUser = async (req, res) => {
    const userId = req.params.id; 


    try {
        if (!req.session.user.isAdmin) {
            return res.status(403).json({ message: 'Access Denied' });
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
}

const updateUser = async (req, res) => {
    const { newUsername, newPassword, newIsAdmin, newName } = req.body;
    if (!req.session.user.isAdmin) {
        return res.status(403).json({ message: 'Access Denied' });
    }



    const updateFields = {
        name: newName,
        username: newUsername,
        isAdmin: newIsAdmin === 'on',
        updateDate: new Date(),
    };
    if (newPassword !== '') {
        updateFields.password = newPassword;
    }

    User.findByIdAndUpdate(req.params.id, updateFields, { new: true }) 
        .then((updatedUser) => {
            console.log('User successfully updated:', updatedUser);
            res.redirect('/admin');
        })
        .catch((error) => {
            console.error('Error updating user:', error);
            res.status(500).send('Internal Server Error');
        });
};

const addUser = async (req, res) => {
    if (!req.session.user.isAdmin) {
        return res.status(403).json({ message: 'Access Denied' });
    }
    const { name, username, password, isAdmin } = req.body;

    let existingUser;


    try {
        existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // const hashedPassword = bcrypt.hashSync(password, 7);

        const user = new User({
            name,
            username,
            // password: hashedPassword,
            password,
            isAdmin 
        });

        await user.save();

        return res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




module.exports = {
    getAllUsers: getAllUsers,
    signup: signup,
    login: login,
    deleteUser: deleteUser,
    updateUser: updateUser,
    addUser: addUser
  };
