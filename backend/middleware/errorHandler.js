const { ValidationError } = require("joi");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
  
    if (err instanceof ValidationError) {
        statusCode = 400;
        message = err.message;
    }
    if (err.status){
        statusCode=err.status;
    }
    if (err.message){
        message=err.message;
    }
    

    res.status(statusCode).send(message);

}
module.exports = errorHandler;