const Task = require('../models/task')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

const createTask = (req, res) => {
    const { activity, description, due_date } = req.body
    let loggedInUser = req.loggedInUser
    Task.create({
        activity: activity,
        description: description,
        due_date: new Date(due_date),
        UserId: loggedInUser._id,
    })
    .then((data) => {
        res.status(201).json({
            message: `Success create a new task`,
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const readAllTask = (req, res) => {
    Task.find()
    .then((data) => {
        res.status(201).json({
            message: `Task list`,
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const findOneTask = (req,res) => {
    Task.findOne({
        _id: req.params.id
    })
    .then((data) => {
        res.status(201).json({
            message: 'task 1',
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const findUnfinishedTask = (req, res) => {
    let loggedInUser = req.loggedInUser
    Task.find({
        UserId: loggedInUser._id,
        status: false,
    }).sort({createdAt: 1})
    .then((data) => {
        res.status(200).json({
            message: `unfinished task list`,
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const findFinishedTask = (req, res) => {
    let loggedInUser = req.loggedInUser
    Task.find({
        UserId: loggedInUser.id,
        status: true,
    })
    .then((data) => {
        res.status(200).json({
            message: `finished task list`,
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const doneTask = (req, res) => {
    console.log('req body donetask', req.body);
    
    let loggedInUser = req.loggedInUser
    console.log('req loggedInUser', loggedInUser);
    
    Task.findOne({
        _id: req.params.id
    })
    .then((data) => {
        if (data) {
            if (String(data.UserId) == String(loggedInUser._id)) {
                Task.updateOne({
                    _id: req.params.id
                }, {
                    status: true
                })
                .then(() => {
                    console.log('masuk kirim email');
                    
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: true,
                        auth: {
                          user: 'hacktiv8andresudi@gmail.com',
                          pass: `hacktiv8Super`
                        }
                      })
                    const mailOptions = {
                        from: '"MY TODO" <hacktiv8andresudi@gmail.com>',
                        to: `${loggedInUser.email}`,
                        subject: 'Finished Task',
                        text: `Yosh! congratulations for finishing task ${req.body.activity} with description ${req.body.description}!\n Thank you for using MY TODO apps`
                    }
                                
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err) {
                            res.status(400).json({
                                message: err.message
                            })
                        } else {
                            res.status(200).json({
                                message: `email has been sent!`
                            })
                        }
                    })
                    res.status(201).json({
                        message: `Task Done!`
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                })
            } else {
                res.status(400).json({
                    message: `You don't have access to do this action!`
                })
            }
        } else {
            res.status(400).json({
                message: `Data Not Found`
            })
        }
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const updateTask = (req, res) => { 
    const { activity, description, due_date } = req.body
    let loggedInUser = req.loggedInUser
    Task.findOne({
        _id: req.params.id
    })
    .then((data) => {
        if (data) {
            if (String(data.UserId) == String(loggedInUser._id)) {
                let dataUpdate = {}
                if(activity) dataUpdate.activity = activity
                if(description) dataUpdate.description = description
                if(due_date) dataUpdate.due_date = due_date
                Task.updateOne({
                    _id: req.params.id
                }, dataUpdate)
                .then(() => {
                    res.status(201).json({
                        message: `success update task`
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                })
            } else {
                res.status(400).json({
                    message: `You don't have access to do this action!`
                })
            }
        } else {
            res.status(400).json({
                message: `Data Not Found`
            })
        }
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const deleteTask = (req, res) => {
    let loggedInUser = req.loggedInUser
    Task.findOne({
        _id: req.params.id
    })
    .then((data) => {
        console.log(data);
        console.log(loggedInUser);
        if (data) {
            if(String(data.UserId) == String(loggedInUser._id)) {
                Task.deleteOne({_id: req.params.id})
                .then(() => {
                    res.status(200).json({
                        message: `success delete task`
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                })
            } else {
                res.status(400).json({
                    message: `You don't have access to do this action!`
                })
            }
        } else {
            res.status(400).json({
                message: `Data not found`
            })
        }
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

module.exports = {
    createTask,
    readAllTask,
    updateTask,
    deleteTask,
    findOneTask,
    findFinishedTask,
    findUnfinishedTask,
    doneTask,
}