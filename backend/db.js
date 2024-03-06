const mongoose= require('mongoose')

mongoose.connect('mongodb+srv://admin_dd:SXRCQXcJXkr49XA6@cluster0.m6dpom5.mongodb.net/paytm')

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        minLength: 6,
        maxLength: 25
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    password:{
        type: String,
        trim: true
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account= mongoose.model('Account', accountSchema)
const User= mongoose.model('User', userSchema)

module.exports= {
    User, 
    Account
}