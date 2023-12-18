import express from 'express'
const app = express()
import authRouter from './router/authRoute.js'
import connectedToDb from './config/db.js'
import cookieParser from 'cookie-parser'
// import cors from cors
connectedToDb()
app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin: [process.env.CLIENT_URL],
//     credentials:true
// }))
app.use('/api/auth' , authRouter)

// app.use('/' ,(req,res) => {
//     res.status(200).json({
//       data: 'JWTauth server.'
//     })
// })


export default app