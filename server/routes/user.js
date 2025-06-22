const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Route to get a user by ID - Protected by authentication
router.get('/:id', auth, userController.getUserById);

// Route to update a user by ID - Protected by authentication
router.put('/:id', auth, userController.updateUser);

module.exports = router;