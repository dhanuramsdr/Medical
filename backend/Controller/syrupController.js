const express = require('express');
const syrupModel = require('../Schema/syrupScheema');
const app = express();
app.use(express.json({ limit: '50mb' })); // Increase the limit to handle large base64 images

// Add Serup
exports.addSyrup=async(req, res)=> {
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
      const newTablet = new syrupModel({
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
        message: "syrup added successfully",
        data: savedTablet
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
}

// Get Syrups
exports.getSyrup = async (req, res) => {
  try {
    const syrups = await syrupModel.find();
    const result = syrups.map(syrup => ({
      ...syrup._doc,
      image: `http://127.0.0.1:6050/api/v1/syrup/images/${syrup.image}` // Corrected path
    }));
    res.send(result);
    console.log(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};


 exports.getSyrupOne=async(req, res)=> {
    try {
        const id=req.params.id
      const result = await syrupModel.findById({_id:id});
      if (result) {
        res.send(result);
        console.log(result);
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  }
// Update Syrup
exports.changeSerup=async(req, res)=>{
  try {
    const { id } = req.params; // Get the tablet ID from request parameters
    console.log("Updating tablet with ID:", id);
    console.log("Request Body:", req.body); // Debugging
    console.log("Uploaded File:", req.file); // Debugging

    if (!id) {
      return res.status(400).json({ success: false, message: "Tablet ID is required" });
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
      updateData.image = `${req.file.filename}`; // Store only the filename
    }
    
    

    // Find the tablet and update
    const updatedTablet = await syrupModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTablet) {
      return res.status(404).json({ success: false, message: "Tablet not found" });
    }

    res.status(200).json({ success: true, message: "Tablet updated successfully", updatedTablet });
  } catch (error) {
    console.error("Error updating tablet:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Delete Serup
exports.deleteSyrup=async(req, res)=>{
  try {
    const id = req.params.id;
    const result = await syrupModel.deleteOne({ _id: id });
    res.send(result);
    console.log(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

