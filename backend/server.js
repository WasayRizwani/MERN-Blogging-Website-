const express = require('express')
const connectDB = require('./database/index');
const {PORT}=require("./config/index");
const router = require('./Routes/index');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors=require("cors");
const corsOptions={
    credentials:true,
    origin:["http://localhost:3000"]
}

const app = express()
app.use("/storage",express.static("storage"));
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(router);
app.use(errorHandler); 

//Connect to database
connectDB();


app.listen(PORT, () => {
    console.log("server is runing on port ",PORT)
});