const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
router.get('/', (req, res) => { // Ensure the route is correctly defined
    const locals = {
        title: "Nodejs Blog",
        description: "abcagasjfafarfa",
    }
    res.render('index.ejs', { locals });
});

function insertPostData() {
    Post.insertMany([
        {
            title: "Building a block",
            body: "This is the body text"
        }
    ])
}
insertPostData();











router.get('/about', (req, res) => {
    res.render('about')
})
module.exports = router;
