import mongoose , {Schema} from "mongoose";
import jwt from  "jsonwebtoken"
import bcrypt from  'bcrypt'

const userSchema = new Schema(
    {

        fullname: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
         email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true


        },
        avatar : {
            type :String,
            required : true

        }, 
        contact : {
            type : String,
            required : true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        Timestamp: true
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.GenrateAcessToken = function() {
    return jwt.sign(
        {
            _id : this._id,
            fullname : this.fullname,
            email : this.email
        },  process.env.ACCESS_TOKEN_SECRET,
         {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,

        }
    )
    
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)
