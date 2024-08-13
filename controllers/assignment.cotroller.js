const Assignment = require("../models/Assignment");


const createAssignment = async (req, res) => {
    try {
        const {
            siteId,
            userId,
            date
        } = req.body;

        // Validate input
        if (!siteId || !userId || !date) {
            return res.status(400).json({ message: 'Site ID, Data Collector ID, and Date are required.' });
        }

        // check if the data collector is already assigned to a specific site on the same day
        // const existingAssignment = await Assignment.findOne({
        //     user: userId,
        //     date: new Date(date).toISOString().split('T')[0] //ensure the date comparison is by day
        // })

        // Convert the date to start and end of the day for comparison
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0); // Set to start of the day

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // Set to end of the day

        // Check if the data collector is already assigned to a specific site on the same day
        const existingAssignment = await Assignment.findOne({
            userId: userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingAssignment) {
            return res.status(400).json({ message: 'Data Collector is already assigned to this site on this day.' });
        }

        // create assignment
        const assignment = new Assignment({ siteId, userId, date });
        await assignment.save();

        res.status(201).json(assignment);
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const clockIn = async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const { clockInTime } = req.body;

        if (!clockInTime) {
            return res.status(400).json({ message: 'Clock-in time is required.' });
        }

        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found.' });
        }


        assignment.clockInTime = new Date(clockInTime);
        await assignment.save();

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUserAssignments = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Find assignments for the user
        const assignments = await Assignment.find({ userId }).populate('siteId', 'location');

        if (!assignments.length) {
            return res.status(404).json({ message: 'No assignments found for this user.' });
        }

        res.status(200).json({
            message: 'Assignments found',
            assignments
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllAssignments = async (req, res) => {
    try {
        const allAssignments = await Assignment.find({})
        .populate('siteId', 'location')
        .populate('userId', 'userName');

        res.status(200).json(allAssignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAssignmentByAssignmentId = async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const assignment = await Assignment.findById(assignmentId)
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found.' });
        }
        res.status(200).json(assignment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createAssignment,
    clockIn,
    getUserAssignments,
    getAllAssignments,
    getAssignmentByAssignmentId,
}