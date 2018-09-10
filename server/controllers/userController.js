const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require('axios')

const register = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({
    email: email
  })
    .then(user => {
      if (!user || user == undefined) {
        User.create({
          name: name,
          email: email,
          password: password
        })
          .then(data => {
            res.status(200).json({
              message: `success add new user`,
              data
            });
          })
          .catch(err => {
            res.status(400).json({
              message: err.message
            });
          });
      } else {
        res.status(400).json({
          message: "email is already exist"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getAllUser = (req, res) => {
  User.find({})
    .then(data => {
      if (data.length == 0) {
        res.status(404).json({
          message: `cannot get users data`,
          data
        });
      } else {
        res.status(200).json({
          message: `succes get all users`,
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `Something is wrong`,
        err
      });
    });
};

const getOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(data => {
      res.status(200).json({
        message: `get user data with id ${req.params.id}`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `cannot get a user data`,
        err
      });
    });
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(data => {
      res.status(200).json({
        message: `User succesfully deleted`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        err
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email: email
  })
    .then(data_user => {
      if (data_user) {
        
        let check_pass = bcrypt.compareSync(password, data_user.password);
        if (check_pass) {
  
          let token = jwt.sign(
            { id: data_user._id, name: data_user.name, email: data_user.email },
            'process.env.JWT_SECRET'
          );
          res.status(200).json({
            message: `Login Success!`,
            token,
            email: data_user.email
          });
        } else {
          res.status(400).json({
            message: `Password is invalid!`
          });
        }
      } else {
        res.status(400).json({
          message: `Email is invalid!`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const loginfb = (req, res) => {
  let urlUser = `https://graph.facebook.com/me?fields=id,name,email&access_token=${
    req.body.token
  }`;

  axios.get(urlUser)
    .then(data => {
      User.findOne({
        email: data.data.email
      })
        .then(dataUser => {
          if (dataUser == null) {
            User.create({
              name: data.data.name,
              email: data.data.email,
              password: data.data.email
            })
              .then(newUser => {
                let token = jwt.sign(
                  {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                  },
                  'process.env.JWT_SECRET'
                );

                res.status(200).json({
                  message: `succesfully registered`,
                  token: token,
                  name: newUser.name,
                  email: newUser.email
                });
              })
              .catch(err => {
                res.status(400).json({
                  message: err.message
                });
              });
          } else {
     
            let token = jwt.sign(
              {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
              },
              'process.env.JWT_SECRET'
            );

            res.status(200).json({
              message: `login succesfully`,
              token: token,
              name: dataUser.name,
              email: dataUser.email
            });
          }
        })
        .catch(err => {
          res.status(400).json({
            err
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        err
      });
    });
};

module.exports = {
  register,
  getAllUser,
  getOneUser,
  deleteUser,
  login,
  loginfb
};
