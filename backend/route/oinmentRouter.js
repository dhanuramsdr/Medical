  const express = require('express');
const OilmentRoute= express.Router();

const multer = require('multer');
const path = require('path');
const { addOinment, getOinment, changeOinment, deleteOinment } = require('../Controller/oinmentController');



// Ensure the folder exists
const uploadPath = path.join(__dirname, '../Utils/images');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve images as static files
OilmentRoute.use('/images', express.static(uploadPath));

OilmentRoute.route("/addtoinment").post(upload.single('file'),addOinment)
OilmentRoute.route("/getoinment").get(getOinment)
OilmentRoute.route("/getoinmentone/:id").get(getOinment)

OilmentRoute.route("/changeoinment/:id").put(upload.single('file'),changeOinment)
OilmentRoute.route("/deleteoinment/:id").delete(deleteOinment)






module.exports=OilmentRoute
