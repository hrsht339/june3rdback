const express = require("express")
const { userModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password,confirmpassword} = req.body
    try{
        if(password!=confirmpassword){
            res.send({
                "msg":"make sure to enter same password"
            })
        }
        else{
             bcrypt.hash(password,3,async(err,hashed)=>{
                 let user = new userModel({
                    email,
                    password:hashed
                })
                await user.save()
                res.send({
                    "msg":"user registered",
                    user
                })
            })
        }
    }
    catch(err){
        console.log(err)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        let user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
              if(result){
                const token = jwt.sign({id:user._id},"masai",{ expiresIn: '2h' })
                res.send({
                    "msg":"user loggedin",
                    token
                })
              }
              else{
                res.send({
                    "msg":"wrong password"
                })
              }
           })
        }
        else{
                res.send({
                    "msg":"user not found"
                })
        }
    }
    catch(err){
        console.log(err)
    }
})


module.exports={
    userRouter
}