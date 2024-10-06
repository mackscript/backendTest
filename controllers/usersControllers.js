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

exports.CreateUser = async (req, res) => {
  try {
    const contact = {
      name: req.body.name, // Assuming this should be 'name'
      number: req.body.number,
    };
    // const savedContact = await contact.save();
    res.status(201).json({
      status: { isSuccess: true, errorMessage: '' },
      data: contact,
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
