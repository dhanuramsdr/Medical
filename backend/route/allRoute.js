const allRouter = require('express').Router();
const userRoute=require('./userRouter')
const tabletRoute=require('../route/tabletRoute')
const oinmentRoute=require('../route/oinmentRouter')
const serupRouter=require('./syrupRouter');
const billingRoute = require('./billingRouter');



allRouter.use("/user", userRoute)
allRouter.use("/tablet", tabletRoute)
allRouter.use("/oinment", oinmentRoute)
allRouter.use("/syrup",serupRouter)
allRouter.use("/billing",billingRoute)










module.exports = allRouter;