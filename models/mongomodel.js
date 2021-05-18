const mongoose = require("mongoose");

const ExpenseTrackerschema = new mongoose.Schema({
    oauthid: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    typeoftransaction: {
        type: String,
        required: true
    },
    reasonofTransaction: {
        type: String,
        required: true
    },
    transactionamount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
    }
})

module.exports = mongoose.model('evernote', ExpenseTrackerschema);