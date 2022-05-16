const express = require('express')
const routes = require('./routes')
const db = require('./config/db')
require('./models/Empresas')
require('./models/Vacantes')

db.sync()
    .then(()=> console.log('DB connected'))
    .catch(error=> console.log(error))

const app = express()  

const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',routes())

app.listen(process.env.PORT || 3000, () =>{
    console.log('Server is running on port 3000');
});