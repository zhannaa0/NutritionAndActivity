const express = require('express');
const router = express.Router();
const { getAllUsers, signup, login, deleteUser, updateUser, addUser } = require('../controller/userController');

router.get('/admin', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

router.post('/addUser', addUser );
router.post('/deleteUser/:id', deleteUser);
router.post('/updateUser/:id',updateUser );


module.exports = router;
