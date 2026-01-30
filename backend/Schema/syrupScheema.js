const mongoose = require('mongoose');
const serupSchema = new mongoose.Schema({
  productname: { type: String },
  productcategorey: { type: String,  },
  stock: { type: Number,  },
  price: { type: Number },
  dateofmfc: { type: Date },
  dateofexp: { type: Date },
  quantity: { type: Number },
  image: { type: String }  
 });
 module.exports = mongoose.model('serup', serupSchema);
