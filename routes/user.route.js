const { addUser, loginUser } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/create').post(addUser);
router.route('/login-user').post(loginUser);

module.exports = router;