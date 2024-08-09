

// add the users into the system

const User = require("../models/User");

const addUser = async (req, res) => {
    try {
        // get the user details from the form
        const { userName, idNumber, role, uniqueKey } = req.body;

        // check if the user already exists
        const userExists = await User.findOne({ idNumber });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        // create a new user
        const newUser = new User({
            userName,
            idNumber,
            role,
            uniqueKey
        });

        // save the user
        await newUser.save();

        res.status(201).json({ user: newUser, message: "User added successfully" })
    

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

const loginUser = async (req, res) => {
    try {
        const { userName, idNumber, role, uniqueKey } = req.body;

        const user = await User.findOne({ idNumber });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.uniqueKey !== uniqueKey) {
            return res.status(403).json({
                message: "This device is not associated witht this user"
            });
        }

        res.status(200).json({
            message: "User logged in successfully",
            user
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addUser, loginUser };