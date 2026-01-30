const mongoose=require('mongoose')

const billsectionSchema=mongoose.Schema({
    
    
    total:{
        type:Number,
        default:0
    },

    billno:{
        type:String,
        default:''

    },

     tablet:[
        {
            tabletid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tablet'
            },
            tabletquantity:{
                type:Number,
                default:0
            },
            price:{
                type:Number,
                default:0
            }

            
        }
     ],

     oinment:[
        {
            oinmentid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'oilment'
            },
            quantity:{
                type:Number,
                default:0
            },
            price:{
                type:Number,
                default:0
            }
            
            
        }
     ],

     syrup:[
        {
            syrupid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'serup'
            },
            quantity:{
                type:Number,
                default:0
            },
            price:{
                type:Number,
                default:0
            }
            
            
        }
     ],

     createdat:{
        type:Date,
        default:Date.now
            }
}

)

module.exports=mongoose.model('billing',billsectionSchema)