var express = require('express');
var router = express.Router();
const {
  register, 
  getAllUser, 
  getOneUser,
  deleteUser,
  login,
  loginfb
} = require('../controllers/userController')

router.get('/', getAllUser)
router.post('/register', register)
router.post('/login', login)
router.post('/loginfb', loginfb)

router 
  .route('/:id')
  .get(getOneUser)
  .delete(deleteUser)

module.exports = router;
