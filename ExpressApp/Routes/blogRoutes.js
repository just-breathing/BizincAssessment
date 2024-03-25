const express = require('express');
const router = express.Router();
const { getUsersdata,getAllPostsAndCommentsCountByUsername,getAllPostsByUsername,getCommentsCountOnAPost} = require('../controllers/blogController.js');




// GET all users
router.get('/users/all', async (req, res) => {
    try {
      const data = await getUsersdata();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: `getting posts error : ${err}` });
    }
  });
  

// GET route to get all posts and count of comments on each post by using full name
router.get('/comments-count/posts/user/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const data = await getAllPostsAndCommentsCountByUsername(name);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: `getting posts error : ${err}` });
  }
});

// GET route to get all posts  by using full name
router.get('/posts/all/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const data = await getAllPostsByUsername(name);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: `getting posts error : ${err}` });
    }
  });


// GET route to get count comments on a post using title of the blog post
router.get('/comments-count/post-title/:title', async (req, res) => {
    try {
      const title = req.params.title;
      const data = await getCommentsCountOnAPost(title);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: `getting posts error : ${err}` });
    }
  });


module.exports = router;
