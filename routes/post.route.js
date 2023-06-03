const express = require("express")
const { postModel } = require("../models/post.model")

const postRouter = express.Router()

postRouter.post("/post",async(req,res)=>{
    const post = req.body
    try{
        let obj = new postModel(post)
        await obj.save()
                res.send({
                    "msg":"post added",
                    obj
                })
           
    }
    catch(err){
        console.log(err)
    }
})

postRouter.get("/post",async(req,res)=>{
    try{
        let obj = await postModel.find()
                res.send(obj)
           
    }
    catch(err){
        console.log(err)
    }
})

postRouter.delete("/post/:id",async(req,res)=>{
    let body=req.params
    console.log(body)
    try{
        let obj = await postModel.findByIdAndDelete(body.id)
                res.send(obj)
           
    }
    catch(err){
        console.log(err)
    }
})


module.exports={
    postRouter
}