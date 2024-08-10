const { createAssignment, clockIn } = require('../controllers/assignment.cotroller');

const router = require('express').Router();

router.route('/assign-site').post(createAssignment);
router.route('/clockin/:assignnmentId').post(clockIn);

module.exports = router;