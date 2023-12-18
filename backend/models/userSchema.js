import mongoose from "mongoose";
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required:[true,'User name is Required'],
            minLength:[5,'Name must be least 5 char'],
            maxLength:[50,'Name must be less than 50 char'],
            trim:true
        },
        email:{
            type:String,
            required:[true,'User email is Required'],
            unique:true,
            lowercase:true,
            unique:[true,'alrady registered']
        },
        password:{
            type:String,
            select:false
        },
        forgotPasswordToken:{
            type:String
        },
        forgotPasswordExpiryDate:{
            type:String
        }
},
{
    timestamps:true
})
userSchema.pre('save',async function(next){
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    return next()
  
})
userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this._id , email: this.email},
            "process.env.SECRET",
            {expiresIn:'24h'}
            
            )
    },
}

export default mongoose.model("User" , userSchema)