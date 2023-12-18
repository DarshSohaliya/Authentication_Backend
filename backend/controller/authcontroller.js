import User from '../models/userSchema.js'
import emailValidator from 'email-validator'
import bcrypt from 'bcrypt'
const signup = async (req,res) =>{
    const {name,email ,password,confirmPassword} = req.body
    console.log(name,email ,password,confirmPassword);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success:false,
        message:"Every fild is required "
      })
    }

    const validEmail = emailValidator.validate(email)
    if (!validEmail) {
      return res.status(400).json({
        success:false,
        message:"Plese provide a valid email id"
      })
    }

    if(password!==confirmPassword){
         return res.status(400).json({
          success:false,
          message:"Password and confirmpassword is not match"
         })

    }

   try {

    const userInfo = new User(req.body)
    const result = await userInfo.save()
   return res.status(200).json({
    success: true,
    data:result
  
   })
   } catch (error) {

    if (error.code === 11000) {
        return res.status(400).json({
            success:false,
            message:'Account alrady exists'
          })
    }
      return res.status(400).json({
        success:false,
        message:error.message
      })
   }
     
}

const singin = async (req,res) =>{
  const {email,password} = req.body
  if (!email || !password) {
    return res.status(400).json({
      success:false,
      message:'Every field is nessary'
    })
}

  // if (!user || !(await bcrypt.compare(password,user.password))) {
    
  // }
try {
     
  const user =await User.findOne({email}).select("+password")

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      success:false,
      message:'Invalid credentials'
    })
  }

  const token = await user.jwtToken()
  user.password = undefined
 
  const cookieOption = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly:true
  }

   
  res.cookie("token" , token , cookieOption)

  res.status(200).json({
    success:true,
    data:user
  })
} catch (error) {
  res.status(400).json({
    success:false,
    message:error.message
  })
}

}

const getUser = async (req,res,next) => {
     const userId = req.user.id
    
     try {
      const user = await User.findById(userId)
      return res.status(200).json({
        success:true,
        data:user
      })
     } catch (error) {
       return res.status(400).json({
        success:false,
        message:error.message
       })
     }
}

const logout = (req,res) =>{
   try {
    const cookieOption ={
      expires: new Date(),
      httpOnly:true
    }
    res.cookie("token" , null , cookieOption)
    res.status(200).json({
      success:true,
      message:"Logout successfully"
    })
     } catch (error) {
       res.status(400).json({
        success:false,
        message:"Error"
       })
   }
}

export {signup,singin,getUser,logout}