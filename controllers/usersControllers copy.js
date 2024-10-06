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

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: { isSuccess: true, errorMessage: '' },
    result: users.length,
    data: users,
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

const contactSchema = {
  name: String,
  number: String,
};
const Contact = mongoose.model('Contact', contactSchema);

exports.CreateUser = (req, res) => {
  const contact = new Contact({
    email: req.body.name,
    number: req.body.number,
  });

  contact.save(function (err) {
    if (err) {
      res.status(400).json({
        status: { isSuccess: false, errorMessage: '' },
        data: null,
      });
    } else {
      res.status(201).json({
        status: { isSuccess: true, errorMessage: '' },
        data: req.body,
      });
    }
  });
  // const newId = users[users.length - 1].id + 1;
  // // const newUser = Object.assign({ id: newId }, req.body);
  // const newUser = { id: newId, ...req.body };
  // users.push(newUser);
  // fs.writeFile(
  //   `${__dirname}/../data/user.json`,
  //   JSON.stringify(users),
  //   (err) => {
  //     res.status(201).json({
  //       status: { isSuccess: true, errorMessage: '' },
  //       data: newUser,
  //     });
  //   }
  // );
};
