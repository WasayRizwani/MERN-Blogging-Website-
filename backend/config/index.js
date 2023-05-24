const environment=require("dotenv").config();
const PORT =process.env.PORT ;
const CONNECTION_STRING=process.env.CONNECTION_STRING;
const ACCESS_SECRET=process.env.ACCESS_SECRET;
const REFRESH_SECRET=process.env.REFRESH_SECRET;
const BACKEND_PATH=process.env.BACKEND_PATH;
module.exports={
    PORT,
    CONNECTION_STRING,
    ACCESS_SECRET,
    REFRESH_SECRET,
    BACKEND_PATH
};