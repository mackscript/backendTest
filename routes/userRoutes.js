const express = require('express');

const userController = require('../controllers/usersControllers');
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.CreateUser);

router.route('/:id').get(userController.getUserById);

module.exports = router;
