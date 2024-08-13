const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');


const app = express();

// import routes
const userRoute = require('./routes/user.route');
const siteRoute = require('./routes/site.route');
const assignmentRoute = require('./routes/assignment.route');


app.use(helmet());
app.use(cors(
    {
        origin: "*"
    }
));


app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: false }));

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Database conncected successfully"))
    .catch((error) => {
        console.error(error);
    });

app.use(express.json());


// routes middleware

app.use('/api/v1/users', userRoute);
app.use('/api/v1/sites', siteRoute);
app.use('/api/v1/assignment', assignmentRoute);


const PORT = 8000 || process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});