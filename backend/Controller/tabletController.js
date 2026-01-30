const express = require('express');
const tabletModel = require('../Schema/tabletSchema');
const app = express();
const path = require('path');




exports. addTablet = async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const formattedDateOfMfc = new Date(req.body.dateofmfc);
    const formattedDateOfExp = new Date(req.body.dateofexp);

    const newTablet = new tabletModel({
      image: req.file.filename,  // Store filename, not full path
      productcategorey: req.body.productcategorey,  
      productname: req.body.productname,  
      stock: Number(req.body.stock) || 0,  
      price: req.body.price ? Number(req.body.price) : 0,  
      dateofmfc: formattedDateOfMfc,  
      dateofexp: formattedDateOfExp,  
      quantity: req.body.quantity ? Number(req.body.quantity) : 0  
    });

    const savedTablet = await newTablet.save();

    res.status(201).json({
      success: true,
      message: "Tablet added successfully",
      tablet: savedTablet
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getTablet = async (req, res) => {
  try {
    const tablets = await tabletModel.find();

    // Add full image path
    const updatedTablets = tablets.map(tablet => ({
      ...tablet._doc,
      image: `http://127.0.0.1:6050/api/v1/tablet/images/${tablet.image}`
    }));

    res.send(updatedTablets)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};





exports.getTabletOne = async (req, res) => {
  try {
      const id = req.params.id;
      const result = await tabletModel.findById(id); // No need for {_id: id}

      if (!result) {
          return res.status(404).json({ message: "Tablet not found" });
      }

      const updatedTablet = {
          ...result._doc,
          image: `http://127.0.0.1:6050/api/v1/tablet/images/${result.image}`
      };

      res.json(updatedTablet);
      console.log(updatedTablet);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.error(err);
  }
};

// Update Tablet
exports.changeTablet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating tablet with ID:", id);
    console.log("Request Body:", req.body);
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

    // Ensure a file was uploaded before setting the image path
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    console.log("Updating tablet with data:", updateData); // Debugging

    // Find and update the tablet
    const updatedTablet = await tabletModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTablet) {
      return res.status(404).json({ success: false, message: "Tablet not found" });
    }

    res.status(200).json({ success: true, message: "Tablet updated successfully", updatedTablet });
  } catch (error) {
    console.error("Error updating tablet:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Tablet
exports.deleteTablet=async(req, res)=>{
  try {
    const id = req.params.id;
    const result = await tabletModel.deleteOne({ _id: id });
    console.log(result);
    res.status(200).json({ success: true, message: "Tablet deleted  successfully" });
   
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
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


