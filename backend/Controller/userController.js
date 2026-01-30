const bcrypt = require('bcrypt')
const loginModel=require('../Schema/userSchema')
const jsonwebtoken=require("jsonwebtoken")
const { sendToken } = require('../Utils/sendToken')
require('dotenv').config({ path: '/backend/connection/db' })

exports.registerUser = async (req, res) => {
 
  
  try {
      console.log("Received Data:", req.body);
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
          return res.status(400).json({ success: false, message: "Missing fields" });
      }

      const result=await loginModel.create({name,email,password})

      if(!result){
        res.status(404).json({
          message:'register fail'
        })
      }
      console.log(result);
      
        res.status(200).json({
         message:'User register successfully',
        })

        
      // Continue with user registration logic...
  } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

  


exports.loginFun=async(req, res, next)=> {
    try {
      const { email, password } = req.body;
      console.log('req.body',req.body);
      
  
      // Check if email and password are provided
      if (!email || !password) {
        return next("Email or password values are missing");
      }
  
      // Look for the user in the database
      const user = await loginModel.findOne({ email }).select("+password");
      if (!user) {
        return next("Invalid Email or Password");
      }
  
      // Compare the entered password with the stored hash
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next("Invalid Email or Password");
      }
  
      // Send token upon successful login
      sendToken(user, 201, res);
    } catch (err) {
      next(err);
    }
  }
  
  exports.logoutFun=async(req, res,next)=> {
    try {
        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'     

        })

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Logged Out faile",
        });
    }
}


exports.getallusersFun=async(req, res,next)=> {
  try {
      
    const result=await loginModel.find()
    console.log("result",result);
    res.status(200).json({
      sucess:true,
      data:result
    })
    

      
  } catch (error) {
      res.status(404).json({
          success: false,
          message: "Logged Out faile",
      });
  }
}


// try {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error(err);
//             throw new Error('Server error');
//         }
//         res.clearCookie('connect.sid');
//         res.json({ message: 'Logout successful' });
//     });
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
// }

