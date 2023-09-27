const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {
        require: true,
        type: String
    },
    name: {
        require: true,
        type: String,
        min: 2
    },
    email: {
        require: true,
        type: String,
    },
    address: {
        require: true,
        type: String
    },
    college: {
        require: true,
        type: String
    },
    mobile: {
        require: true,
        type: Number
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User