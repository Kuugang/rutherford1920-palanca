const mongoose = require('mongoose')

const appSchema = mongoose.Schema({
    codeName : {
        type: String,
        required: true
    },
    recipient : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('messages', appSchema)
