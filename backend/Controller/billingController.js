const express = require('express');


const app = express();
const path = require('path');
const billingScheema = require('../Schema/billingScheema');



exports.createBilling = async (req, res) => {
  try {
    console.log("Body:", req.body);

    // Extracting data correctly from request body
    const { total, billno, tablet, oinment, syrup } = req.body;

    // Creating a new billing document
    const billing = await billingScheema.create({
      total,
      billno,
      tablet,
      oinment,
      syrup
    });

    res.status(201).json({
      success: true,
      message: "Billing record added successfully",
      data: billing
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// const updatedTablet = {
//     ...result._doc,
//     image: `http://127.0.0.1:6050/api/v1/tablet/images/${result.image}`
// };

exports.getAllBilling = async (req, res) => {
  try {
    // Populate tabletid, oinmentid, and syrupid fields
    const billings = await billingScheema
      .find()
      .populate('tablet.tabletid')   // Populate tablet details
      .populate('oinment.oinmentid') // Populate ointment details
      .populate('syrup.syrupid');    // Populate syrup details

    res.status(200).json({ success: true, billings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};






 exports.getBillbyid=async(req, res)=> {
    try {
        const id=req.params.id
      const result = await billingScheema.findById(id)
      .populate('tablet.tabletid')   
      .populate('oinment.oinmentid') 
      .populate('syrup.syrupid'); 
      if (result) {
        res.send(result);
        console.log(result);
      }
    } catch (err) {
      res.status(500).send(err); 
      console.log(err);
    }
  }
// Update Tablet
// total,
// billno,
// tablet,
// oinment,
// syrup
exports.changeBiil=async(req, res)=>{
  try {
    const id = req.params.id;
    const {   total,
      billno,
      tablet,
      oinment,
      syrup  } = req.body;
    const result = await billingScheema.findByIdAndUpdate(
      { _id: id },
      { $set: {    total,
        billno,
        tablet,
        oinment,
        syrup } },
      { new: true }
    );
    res.status(200).json({
      data:result,
      message:"billing details updated succewssfully"

    });
    
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

// Delete Tablet
exports.deleteOneBill=async(req, res)=>{
  try {
    const id = req.params.id;
    const result = await billingScheema.deleteOne({ _id: id });
    res.send(result);
    console.log(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}


exports.deleteTablet=async(req, res)=>{
  try {
    const result = await tabletModel.delete();
    res.send(result);
    console.log(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}





//add image cloudinary
// exports.addTablet=async(req, res)=> {
  
//   try {
        
//     let images = [];
//     if (typeof req.body.images === "string") {
//         images.push(req.body.images);
//     } else {
//         images = req.body.images;
//     }

//     const imagesLink = [];  
//     for (let i = 0; i < images.length; i++) {
//         const result = await cloudinary.v2.uploader.upload(images[i], {
//             folder: "products",
//         });
//         imagesLink.push({
//             public_id: result.public_id,
//             url: result.secure_url,
//         });
//     }

//     const result = await cloudinary.v2.uploader.upload(req.body.logo, {
//         folder: "brands",
//     });
//     const brandLogo = {
//         public_id: result.public_id,
//         url: result.secure_url,
//     };

//     req.body.brand = {
//         name: req.body.brandname,
//         logo: brandLogo,
//     };
//     req.body.images = imagesLink;
//     req.body.user = req.user.id;

//     let specs = [];
//     req.body.specifications.forEach((s) => {
//         specs.push(JSON.parse(s));
//     });
//     req.body.specifications = specs;

//     const product = await tabletModel.create(req.body);

//     res.status(201).json({
//         success: true,
//         product,
//     });
// } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//     });
// }
// }


