const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // Ensure the route is correctly defined
    const locals = {
        title: "Nodejs Blog",
        description: "abcagasjfafarfa",
    }
    res.render('index.ejs', { locals });
});
router.get('/about', (req, res) => {
    res.render('about')
})
module.exports = router;
