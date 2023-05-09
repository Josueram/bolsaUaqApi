require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config');
const mainRouter = require("./mainRouter");
const expressFileUpload = require('express-fileupload');
const cloudinary = require('cloudinary')

db.sync()
    .then(() => console.log('DB connected'))
    .catch(console.log);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
// let ping = 14400000
// setTimeout(()=>{
//     console.log("ping")
// },ping)

// Config cloudinary
cloudinary.config({ 
    cloud_name: 'hj0rkvay8', 
    api_key: '717929115926744', 
    api_secret: 'qlQJvgoa-SMODGy4oiEZItKCybI' 
});

app.use('/api', mainRouter) // Main router

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}.`);
});
