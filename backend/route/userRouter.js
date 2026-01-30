const express=require('express')
const { registerUser, loginFun, logoutFun, getallusersFun } = require('../Controller/userController')

const userrouter=express.Router()
userrouter.route('/register').post(registerUser)
userrouter.route('/login').post(loginFun)
userrouter.route('/logout').post(logoutFun)
userrouter.route('/getusers').get(getallusersFun)




module.exports=userrouter
