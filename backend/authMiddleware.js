const JWT_SECRETKEY = require("./config")
const jwt= require('jsonwebtoken')

const authMiddleware=(req, res, next)=>{
    const authorizationHeader= req.headers.authorization

    if(!authorizationHeader || !authorizationHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message: 'Invalid credentials'
        })
    }
    const token= authorizationHeader.split(' ')[1]

   
    try{
        const decoded= jwt.verify(token, JWT_SECRETKEY)

        req.userId= decoded.userId
        next()
        
    }
    catch (error){
        return res.json({
            message: console.error()
        })
    }
}

module.exports= authMiddleware