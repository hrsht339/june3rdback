const express = require("express")
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/user.route")
const cors = require("cors")
const { postRouter } = require("./routes/post.route")
const { authentication } = require("./middleware/authentication")
const app = express()
app.use(cors())

app.use(express.json())

app.use("/",userRouter)
app.use(authentication)
app.use("/",postRouter)

app.listen(4500,async()=>{
    try{
        await connection
        console.log("db connected")
    }
    catch(err){
        console.log(err)
    }
    console.log("server connected")
})