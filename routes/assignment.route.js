const { createAssignment, clockIn, getUserAssignments, getAllAssignments, getAssignmentByAssignmentId } = require('../controllers/assignment.cotroller');

const router = require('express').Router();

router.route('/assign-site').post(createAssignment);
router.route('/get-user-assignments/:userId').get(getUserAssignments);
router.route('/').get(getAllAssignments);
router.route('/clockin/:assignmentId').post(clockIn);
router.route('/:assignmentId').get(getAssignmentByAssignmentId);

module.exports = router;