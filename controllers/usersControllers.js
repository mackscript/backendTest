const fs = require('fs');
const mongoose = require('mongoose');
// const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/user.json`));
const User = require('../modal/userModal');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: { isSuccess: true, errorMessage: '' },
      result: users.length,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      status: { isSuccess: false, errorMessage: err },
      data: null,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: { isSuccess: true, errorMessage: '' },
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: { isSuccess: false, errorMessage: err.message },
      data: null,
    });
  }
};

exports.CreateUser = async (req, res) => {
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      password: req.body.password,
    });
    // const savedContact = await newUser.save();
    res.status(201).json({
      status: { isSuccess: true, errorMessage: '' },
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: {
        isSuccess: false,
        errorMessage: err.message || 'Failed to create user',
      },
      data: null,
    });
  }
};
