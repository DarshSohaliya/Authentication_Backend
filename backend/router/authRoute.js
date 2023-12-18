import express from 'express'
import { signup,singin,getUser,logout } from '../controller/authcontroller.js'
import jwtAuth from '../middleware/jwtAuth.js'

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/singin',singin)
authRouter.get('/user' , jwtAuth, getUser)
authRouter.get('/logout' ,jwtAuth , logout)
export default authRouter