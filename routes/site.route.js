const { addSite, getAllSites } = require('../controllers/site.controller');

const router = require('express').Router();

router.route('/create').post(addSite);
router.route('/').get(getAllSites);

module.exports = router;