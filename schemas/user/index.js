const {Schema, model} = require('mongoose')

const userSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String}
})

module.exports = model('user', userSchema)