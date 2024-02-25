const express = require('express')
const User = require('../models/User')
const router = express.Router()

const Post = require('../models/Posts')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();

        res.render('adminPosts', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/add', async (req, res) => {
    try {
    if (!req.session.user.isAdmin) {
        return res.status(403).json({ message: 'Access Denied' });
    }
    const { image1, image2, image3, title_ru, title_eng, desc_eng,desc_ru } = req.body;

    if (!image1 || !image2 || !image3 || !title_ru|| !title_eng || !desc_eng|| !desc_ru) {
        return res.status(400).json({ error: 'Please provide full required info' });
    }

    const newPost = new Post({
        image1, image2, image3, title_ru, title_eng, desc_eng,desc_ru
    });

    
        await newPost.save();
        console.log(newPost);
        res.redirect('/posts');
    } catch (error) {
        console.error('Error saving post:', error);
        return res.status(500).json({ error: 'An error occurred while saving the post' });
    }
});



router.get('/:id', async (req, res) => {
    try {

        if (!req.session.user.isAdmin) {
            return res.status(403).json({ message: 'Access Denied' });
        }

        const id = req.params.id;
        const post = await Post.findOne({ _id: id });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.render('update', { post }); 
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'An error occurred while fetching the post' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.session.user.isAdmin) {
            return res.status(403).json({ message: 'Access Denied' });
        }

        const id = req.params.id;
        const { image1, image2, image3, title_ru, title_eng, desc_eng,desc_ru } = req.body;

        let post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (image1) post.image1 = image1;
        if (image2) post.image2 = image2;
        if (image3) post.image3 = image3;
        if (title_ru) post.title_ru = title_ru;
        if (title_eng) post.title_eng = title_eng;
        if (desc_eng) post.desc_eng = desc_eng;
        if (desc_ru) post.desc_ru = desc_ru;

        await post.save();
        res.redirect('/posts')
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'An error occurred while updating the post' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!req.session.user.isAdmin) {
            return res.status(403).json({ message: 'Access Denied' });
        }

        const id = req.params.id;

        const deletedPost = await Post.findOneAndDelete({ _id: id });

        if (!deletedPost) {
            return res.status(404).json({ error: 'Post does not exist' });
        }

        res.redirect('/posts')
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
});





module.exports = router