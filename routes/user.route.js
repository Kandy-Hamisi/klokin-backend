const { addUser, loginUser, fetchAllUsers, loginAdmin } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/create').post(addUser);
router.route('/login-user').post(loginUser);
router.route('/login-admin').post(loginAdmin);
router.route('/').get(fetchAllUsers);

module.exports = router;