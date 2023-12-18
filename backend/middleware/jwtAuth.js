import JWT from 'jsonwebtoken'
               
const jwtAuth = (req,res,next) => {
 const token = (req.cookies && req.cookies.token) || null

  if (!token) {
      res.status(400).json({
        success:false,
        message:"token dosenot exists"
      })
  }
  
  try {
            
    const payload = JWT.verify(token,`process.env.SECRET` )
    req.user = {id:payload.id , email:payload.email}
  } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
  }

    next();
}

export default jwtAuth