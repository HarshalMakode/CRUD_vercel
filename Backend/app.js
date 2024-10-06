const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const studentRoute = require('./routes/student.route.js');
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/students", studentRoute);


app.get('/', (req,res)=>{
    res.send("Hello form Node API server")
});

app.get("/api/students", (req, res) => {
    console.log("Received a request for students");
    // your logic here
});

mongoose.connect("mongodb+srv://harshalmakode26:K6woOov6pvvf831o@cruddb.mlexk.mongodb.net/?retryWrites=true&w=majority&appName=crudDB")
.then(() => {
    const PORT = process.env.PORT || 3000; 
    console.log("Connected to database!");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(() => {
    console.log("Connection failed!");
});

module.exports = app;

