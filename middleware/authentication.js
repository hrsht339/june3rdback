const jwt = require("jsonwebtoken")

const authentication = async(req,res,next)=>{
    const token = req.headers.authorization
    let decoded = jwt.verify(token,"masai")
    if(decoded){
        req.body.userid=decoded.id
        next()
    }
    else{
        res.send({
            "msg":"not authorized"
        })
    }
}

module.exports = {
    authentication
}