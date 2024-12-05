const express = require('express');
const router = express.Router();
const userController = require('../controllers/staffControllers');

// Route to get all users
router.get('/all-users', userController.getAllUsers);

// Route to get all staff members
router.get('/all-staff', userController.getAllStaff);

// Route to promote a staff member to manager
router.post('/promote-to-manager', userController.promoteToManager);

// Route to update user details
router.put('/update-role', userController.updateUserRole);

// Route to delete a user by ID
router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;
