const userSchema = require('../Schema/userSchema')

require('dotenv').config({path:'../config/.env'})
exports.sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    const options = {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
    console.log('token',token);
    
  };
  