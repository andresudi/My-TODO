const Task = require('../models/task')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

const createTask = (req, res) => {
    const { activity, description, due_date } = req.body
    var decoded = jwt.verify(req.headers.token, 'process.env.JWT_SECRET')
    Task.create({
        activity: activity,
        description: description,
        due_date: new Date(due_date),
        UserId: decoded.id,
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
    let token = req.headers.token
    var decoded = jwt.verify(token, 'process.env.JWT_SECRET')
    console.log(token);
    
    console.log('log dari unfinished decode',decoded);
    
    Task.find({
        UserId: decoded.id,
        status: false,
    }).sort({createdAt: 1})
    .then((data) => {
        console.log(data);
        console.log('masuk');
        
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
    let token = req.headers.token
    var decoded = jwt.verify(token, 'process.env,JWT_SECRET')
    Task.find({
        UserId: decoded.id,
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
    var decoded = jwt.verify(req.body.token, 'process.env.JWT_SECRET')
    let emailUser = decoded.email 
    Task.updateOne({
        _id: req.params.id
    }, {
        status: true
    })
    .then(() => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
              user: 'hacktiv8andresudi@gmail.com',
              pass: 'hacktiv8Super'
            }
          })
      
        const mailOptions = {
            from: 'Task',
            to: `${emailUser}`,
            subject: 'Finished Task',
            text: `Yosh! congratulations for finishing your own task! hehe!`
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
}

const updateTask = (req, res) => {
    const { activity, due_date } = req.body
    Task.updateOne({
        _id: req.params.id
    }, {
        activity: activity,
        due_date: due_date
    })
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
}

const deleteTask = (req, res) => {
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