const express = require('express')
const cors = require('cors')
// const routes = require('routes')
const db = require('./config/db')
require('./models/Empresas')
require('./models/Vacantes')

db.sync()
    .then(()=> console.log('DB connected'))
    .catch(error=> console.log(error))

const app = express()  

app.use(cors())

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT || 3000, () =>{
    console.log('Server is running...');
});