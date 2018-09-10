var express = require('express');
var router = express.Router();
const { 
  createTask,
  readAllTask,
  updateTask,
  deleteTask,
  findOneTask,
  findFinishedTask,
  findUnfinishedTask,
} = require('../controllers/taskController')
const isLogin = require('../middlewares/isLogin')

router.get('/unfinishedtask', isLogin, findUnfinishedTask)
router.get('/finishedtask', isLogin, findFinishedTask)

router.post('/', isLogin, createTask)
router.get('/', isLogin, readAllTask)

router.get('/:id', isLogin, findOneTask)
router.put('/:id', isLogin, updateTask)
router.delete('/:id', isLogin, deleteTask)

module.exports = router;
