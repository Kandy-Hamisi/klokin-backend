const Site = require("../models/Site");


// add site
const addSite = async (req, res) => {
    try {
        // get the site details from the client
        const {
            location,
            gps: { latitude, longitude, altitude, precision },
            _gps_latitude,
            _gps_longitude,
            _gps_altitude,
            _gps_precision
        } = req.body;
        
        // check if the road name already exists
        const site = await Site.findOne({ location });
        if (site) {
            return res.status(400).json({ message: 'Site already exists' });
        }

        // Create new site information object
        const newSiteInfo = new Site({
            location,
            gps: {
            latitude,
            longitude,
            altitude,
            precision
            },
            _gps_latitude,
            _gps_longitude,
            _gps_altitude,
            _gps_precision
        });
    
        // Save the site information to the database
        const siteInfo = await newSiteInfo.save();
    
        res.status(201).json({
            success: true,
            data: siteInfo
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// get all the sites

const getAllSites = async (req, res) => {
    try {
        const sites = await Site.find();
        res.status(200).json({
            success: true,
            sites
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addSite,
    getAllSites,
}