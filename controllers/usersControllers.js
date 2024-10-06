const fs = require('fs');
const mongoose = require('mongoose');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/user.json`));

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > users.length) {
    return res.status(400).json({
      status: { isSuccess: false, errorMessage: 'Invalid Id' },
      data: null,
    });
  }
  next();
};

exports.createUserValidation = (req, res, next) => {
  console.log('req.body', req.body);
  if (!req.body.name) {
    return res.status(400).json({
      status: { isSuccess: false, errorMessage: 'Name is Required.' },
      data: null,
    });
  }
  next();
};

exports.getAllUsers = async (req, res) => {
  const contacts = []; // Retrieve all contacts
  res.status(200).json({
    status: { isSuccess: true, errorMessage: '' },
    result: contacts.length,
    data: contacts,
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
  res.status(200).json({
    status: { isSuccess: true, errorMessage: '' },
    data: user,
  });
};

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'UserName is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required.'],
    unique: true,
  },
});
const User = mongoose.model('User', userSchema);

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
