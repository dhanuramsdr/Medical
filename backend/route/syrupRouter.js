const express = require('express');
const syrupRoute= express.Router();


const multer = require('multer');
const path = require('path');
const { addSyrup, getSyrup, getSyrupOne, changeSerup, deleteSyrup } = require('../Controller/syrupController');

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
syrupRoute.use('/images', express.static(uploadPath));




syrupRoute.route("/addsyrup").post(upload.single('file'),addSyrup)
syrupRoute.route("/getsyrup").get(getSyrup)
syrupRoute.route("/getsyrupone/:id").get(getSyrupOne)

syrupRoute.route("/changesyrup/:id").put(upload.single('file'),changeSerup)
syrupRoute.route("/deletesyrup/:id").delete(deleteSyrup)






module.exports=syrupRoute
