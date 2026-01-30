const express = require('express');
const oinmentModel = require('../Schema/oinmentScheema');

const app = express();
app.use(express.json({ limit: '50mb' })); // Increase the limit to handle large base64 images

// Add Oilment
exports.addOinment=async(req, res)=> {
    try {
      console.log("Headers:", req.headers);
      console.log("Body:", req.body);
      console.log("File:", req.file);
  
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
  
      // Convert string dates to Date objects
      const formattedDateOfMfc = new Date(req.body.dateofmfc);
      const formattedDateOfExp = new Date(req.body.dateofexp);
  
      // Create a new tablet document
      const newTablet = new oinmentModel({
        image: req.file.filename,  // Store only the filename
        productcategorey: req.body.tabletcategorey,  
        productname: req.body.tabletname,  
        stock: Number(req.body.stock) || 0,  
        price: req.body.price ? Number(req.body.price) : 0,  
        dateofmfc: formattedDateOfMfc,  
        dateofexp: formattedDateOfExp,  
        quantity: req.body.quantity ? Number(req.body.quantity) : 0  
      });
  
      // Save the new tablet in the database
      const savedTablet = await newTablet.save();
  
      res.status(201).json({
        success: true,
        message: "oinment added successfully",
        data: savedTablet
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
}

// Get Oinments
// Get Oinments
exports.getOinment = async (req, res) => {
  try {
    const oinments = await oinmentModel.find();
    const result = oinments.map(oinment => ({
      ...oinment._doc,
      image: `http://127.0.0.1:6050/api/v1/oinment/images/${oinment.image}` // Corrected path
    }));
    if (result) {
      res.send(result);
      console.log(result);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};


 exports.getOinmentOne=async(req, res)=> {
    try {
        const id=req.params.id
      const result = await oinmentModel.findById({_id:id});
      if (result) {
        res.send(result);
        console.log(result);
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  }
// Update Oinment
exports.changeOinment = async (req, res) => {
  try {
    const { id } = req.params; // Get the ointment ID from request parameters
    console.log("Updating ointment with ID:", id);
    console.log("Request Body:", req.body); // Debugging
    console.log("Uploaded File:", req.file); // Debugging

    if (!id) {
      return res.status(400).json({ success: false, message: "Ointment ID is required" });
    }

    const updateData = {
      productname: req.body.productname,
      productcategorey: req.body.productcategorey,
      stock: req.body.stock,
      price: req.body.price,
      dateofmfc: req.body.dateofmfc,
      dateofexp: req.body.dateofexp,
    };

    // If there's an image file, update the image field
    if (req.file) {
      updateData.image = `${req.file.filename}`; // Ensure correct path without extra `/`
    }

    // Find the ointment and update
    const updatedOinment = await oinmentModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedOinment) {
      return res.status(404).json({ success: false, message: "Ointment not found" });
    }

    res.status(200).json({ success: true, message: "Ointment updated successfully", updatedOinment });
  } catch (error) {
    console.error("Error updating ointment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Delete Oinment
exports.deleteOinment=async(req, res)=>{
  try {
    const id = req.params.id;
    const result = await oinmentModel.deleteOne({ _id: id });
    res.send(result);
    console.log(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

