const jwt = require('jsonwebtoken');
const UserId = require('../controller/userController');
const User = require('../model/user');
// Generate a JWT token
const token = jwt.sign({ userId: User._id }, 'ananth');


module.exports = token;