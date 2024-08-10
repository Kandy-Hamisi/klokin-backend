const { addUser, loginUser, fetchAllUsers } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/create').post(addUser);
router.route('/login-user').post(loginUser);
router.route('/').get(fetchAllUsers);

module.exports = router;