const express = require('express');
const multer = require('multer');
const path = require('path');
const { addTablet, getTablet, changeTablet, deleteTablet, getTabletOne } = require('../Controller/tabletController');

const tabletRoute = express.Router();

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
tabletRoute.use('/images', express.static(uploadPath));

// Routes
tabletRoute.route("/addtablet").post(upload.single('file'), addTablet);
tabletRoute.route("/gettablet").get(getTablet);
tabletRoute.route("/gettabletone/:id").get(getTabletOne);
tabletRoute.route("/changetablet/:id").put(upload.single('file'),changeTablet);
tabletRoute.route("/deletetablet/:id").delete(deleteTablet);

module.exports = tabletRoute;
