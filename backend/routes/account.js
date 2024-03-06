const express= require('express')
const mongoose= require('mongoose')
const authMiddleware= require('../authMiddleware')
const {Account}= require('../db')
const zod= require('zod')


const accountRouter= express.Router()

accountRouter.get('/balance', authMiddleware, async (req, res)=>{
    const userId= req.userId

    const account= await Account.findOne({
        userId: userId
    })

    return res.json({
        balance: account.balance
    })
})

const transferSchema= zod.object({
    amount: zod.number(),
    to: zod.string()
})

accountRouter.post('/transfer', authMiddleware, async (req, res)=>{
    const transferSchemaValidate= transferSchema.safeParse(req.body)
    
    if(!transferSchemaValidate.success){
        return res.json({
            message: 'enter correct inputs'
        })
    }

    else{
      const {amount, to}= req.body

    const session=await mongoose.startSession()
    session.startTransaction()

    const payeeAccount= await Account.findOne({
        userId: to
    }).session(session)
    
    if(!payeeAccount){
        await session.abortTransaction()
        return res.json({
            message: 'No account found with these credentials'
        })
    }

    const payerAccount= await Account.findOne({
        userId: req.userId
    }).session(session)
    if(payerAccount.balance<req.body.amount){
        await session.abortTransaction()
        return res.json({
            message: 'Insufficient balance'
        })
    }

    await Account.updateOne({userId: req.userId}, {'$inc': {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {'$inc': {balance: amount}}).session(session)

    await session.commitTransaction()
    res.json({
        message: 'Transfer successful'
    })
}
})





module.exports= accountRouter