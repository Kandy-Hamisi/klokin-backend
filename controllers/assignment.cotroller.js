const Assignment = require("../models/Assignment");


const createAssignment = async (req, res) => {
    try {
        const {
            siteId,
            userId,
            date
        } = req.body;

        // Validate input
        if (!siteId || !dataCollectorId || !date) {
            return res.status(400).json({ message: 'Site ID, Data Collector ID, and Date are required.' });
        }

        // check if the data collector is already assigned to a specific site on the same day
        const existingAssignment = await Assignment.findOne({
            user: userId,
            date: new Date(date).toISOString().split('T')[0] //ensure the date comparison is by day
        })

        if (existingAssignment) {
            return res.status(400).json({ message: 'Data Collector is already assigned to this site on this day.' });
        }

        // create assignment
        const assignment = new Assignment({ site: siteId, dataCollector: dataCollectorId, date });
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
        const { assignmentId } = req.params;
        const clockInTime = req.body;

        if (!clockInTime) {
            return res.status(400).json({ message: 'Clock-in time is required.' });
        }

        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found.' });
        }

/* The line `assignment.clockInTime = new Date(clockInTime);` is setting the `clockInTime` property of
the `assignment` object to a new Date object created from the `clockInTime` value provided in the
request body. This line is updating the `clockInTime` property of the assignment with the new date
and time value. */
        assignment.clockInTime = new Date(clockInTime);
        await assignment.save();

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createAssignment,
    clockIn
}