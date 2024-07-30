import mongoose, {Schema} from "mongoose";

const favoriteSchema  = new Schema(
    {
        owner  : {
           type:Schema.Types.ObjectId,
      ref : "User"
       }, 
       property : [
        { type: Schema.Types.ObjectId, ref: 'Property' }
       ]
    },
    {
        Timestamp : true

    }
)

export const Favorite  = mongoose.model("Favorite", favoriteSchema)