const express= require('express')
const {User, Account}= require('../db')
const jwt= require('jsonwebtoken')
const zod= require('zod')
const JWT_SECRETKEY = require('../config')
const authMiddleware = require('../authMiddleware')

const userRouter= express.Router()

const userSignupSchema= zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

userRouter.post('/signup', async (req, res)=>{
    const schemaValidation= userSignupSchema.safeParse(req.body)

    if (!schemaValidation.success){
        return res.json({
            message: 'Incorrect Inputs'
        })
    }

    const user_exists= await User.findOne({
        username: req.body.username
    })
    if(user_exists){
        return res.json(
            {
                message: 'User already exists'
            }
        )
    }

    else{
        const dbUser= await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })

        const userId= dbUser._id

        const userAccount= await Account.create({
            userId: userId,
            balance: 1+ Math.random()*10000
        })

        const token= jwt.sign({userId}, JWT_SECRETKEY)

        return res.json({
            message: 'User created successfully',
            token: token
        })
    }
})


const userSigninSchema= zod.object({
    username: zod.string(),
    password: zod.string()
})

userRouter.post('/signin', async (req, res)=>{
    const schemaValidation= userSigninSchema.safeParse(req.body) 

    if(!schemaValidation.success){
        return res.json({
            message: 'please enter correct inputs'
        })
    }

    const user_exists= await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(!user_exists){
        return res.json({
            message: 'User does\'nt exist' 
        }) 
    }

    else{
        const userId= user_exists._id
        const token= jwt.sign({userId}, JWT_SECRETKEY)

        return res.json({
            message: 'signed in successfully',
            token: token
        })
    }
})

const updateSchema= zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

userRouter.put('/', authMiddleware, async (req, res)=>{
    const updateSchemaValidate= updateSchema.safeParse(req.body)

    if(!updateSchemaValidate.success){
        return res.json({
            message: 'Invalid inputs'
        })
    }
    else{
        const user= await User.findOneAndUpdate({
            _id: req.userId
        }, req.body)

        return res.json({
            message: 'Updated successfully'
        })
    }
})

userRouter.get('/bulk', async (req, res)=>{
    const filter= req.query.filter || ''

    const user= await User.find({
        $or: [
        {
            firstName: {
            '$regex': filter
        }
    }, {
        lastName: {
            '$regex': filter
        }
    }
    ]
})
    return res.json({
        users: user.map(user=>{
            return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
            }
        })
    })
})

module.exports= userRouter