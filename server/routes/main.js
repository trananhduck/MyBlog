const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => { // Ensure the route is correctly defined
    try {
        const locals = {
            title: "Nodejs Blog",
            description: "abcagasjfafarfa",
        }

        let perPage = 6;
        let page = req.query.page || 1;
        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }]).skip(perPage * page - perPage).limit(perPage).exec();
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { locals, data, currentPage: hasNextPage ? nextPage : null });
    } catch (error) {
        console.log(error);
        // Nếu có lỗi, bạn có thể gửi phản hồi với thông báo lỗi
        res.status(500).send('Server error'); // Gửi phản hồi lỗi
    }
});


// router.get('/', async (req, res) => { // Ensure the route is correctly defined
//     const locals = {
//         title: "Nodejs Blog",
//         description: "abcagasjfafarfa",
//     }
//     try {
//         const data = await Post.find();
//         res.render('index', { locals, data });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error'); // Gửi phản hồi lỗi
//     }
// });

//GET/
//Post :id
router.get('/post/:id', async (req, res) => { // Ensure the route is correctly defined


    try {

        let slug = req.params.id;
        const data = await Post.findById({ _id: slug })
        const locals = {
            title: data.title,
            description: "abcagasjfafarfa",
        }
        res.render('post', { locals, data })
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error'); // Gửi phản hồi lỗi
    }
});
router.get('/about', (req, res) => {
    res.render('about');
});
//POST/
//Search
router.post('/search', async (req, res) => { // Ensure the route is correctly defined

    try {
        const locals = {
            title: "Search",
            description: "abcagasjfafarfa",
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
            ]
        });
        res.render("search", {
            data, 
            locals
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error'); // Gửi phản hồi lỗi
    }
});













// Hàm chèn dữ liệu
function insertPostData() {
    Post.insertMany([
        {
            title: "Building a block",
            body: "This is the body text"
        },
        {
            title: "abcdeffgafafa",
            body: "This is the body text"
        }
    ])
}

insertPostData();
module.exports = router;
