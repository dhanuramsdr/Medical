const mongoose=require('mongoose')
require('dotenv').config({ path: '../config/.env' })

const createConnection=()=>{
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("db succesfully connected");
}).catch((err)=>{
    console.log(err);
})

}
module.exports=createConnection;