import mongoose from "mongoose";

const propertySchema = new schema(
    {

        owner : {
          type:Schema.Types.ObjectId,
      ref : "User"

        },
        name  : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true

        }, 
        type : {
            type: String, enum: ['flat', 'building', 'plot', 'bungalow'], required: true ,
        }, 
        size : {
            type : String,
            required : true
        }, 
        cost : {
            type : String,
            required : true
        }, 
        photos  : [
             {type : String, }
        ], 
        address : {
            type : schema.types.ObjectId,
            ref : 'Address'
        }
         

    }, {
        Timestamp : true
    }
)

export const Property = mongoose.model('Property', propertySchema)