const mongoose = require('mongoose');
const {CONNECTION_STRING} = require("../config/index");
const connectDB = async () => {
    try {
        dbConnection=await mongoose.connect(CONNECTION_STRING);
        console.log("Database connected successfully with host ",dbConnection.connection.host);
    }

    catch (error) {
        console.log("Error occured while connection to the database "+error);
    }
}
module.exports=connectDB;