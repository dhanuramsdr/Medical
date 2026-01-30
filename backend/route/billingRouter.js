const { createBilling, getAllBilling, getBillbyid, changeBiil, deleteOneBill } = require('../Controller/billingController');

const billingRoute = require('express').Router();


billingRoute.route("/createbill").post(createBilling)

billingRoute.route("/getallbill").get(getAllBilling)

billingRoute.route("/getallbillbyid/:id").get(getBillbyid)

billingRoute.route("/changeBiil/:id").put(changeBiil)

billingRoute.route("/deleteOneBill/:id").delete(deleteOneBill)














module.exports = billingRoute;