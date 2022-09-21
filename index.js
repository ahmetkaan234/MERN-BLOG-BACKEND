const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv =require('dotenv');
const pageRouter =require('./routes/pageRoutes')

const app =express();
dotenv.config();


app.use(cors())
app.use(express.json());



app.use('/', pageRouter)


//connection DB

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_DB).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port : ${PORT}`);
    })
}).catch((error) => {

    console.log(error.message);
})
