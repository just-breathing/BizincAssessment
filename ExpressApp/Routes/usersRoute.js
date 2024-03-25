const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser,getAllUsers } = require('../controllers/usersController.js');

// Create a new user
router.post('/user', async (req, res) => {
  try {
    const { username, email,age } = req.body;
    const newUser = await createUser(username, email,age);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: `Error creating user : ${err}` });
  }
});

// Get a user by ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: `Error creating user : ${err}` });
  }
});

// Update a user by ID
router.put('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email } = req.body;
    const updatedUser = await updateUser(userId, username, email);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: `Error updating user : ${err}` });
  }
});

// Delete a user by ID
router.delete('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Error deleting user : ${err}` });
  }
});



// get all users
router.get('/all', async (req, res) => {
    try {
      const users=await getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: `Error getting all users : ${err}` });
    }
  });

module.exports = router;
