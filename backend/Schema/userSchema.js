const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  name: {
    type:String

  },
  email:{
    type:String
},
  password:{
    type:String
},
  role:{
    type:String,
    default:'user'
  },
phonenumber:{
     type:Number,
  default:0
}
  
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
      next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to generate JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "90d",
  });
};


// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// userSchema.pre('save')

module.exports = mongoose.model('User', userSchema);
