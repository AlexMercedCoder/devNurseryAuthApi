const {Schema, model} = require('mongoose')

const notesSchema = new Schema ({
    username: {type: String, required: true},
    title: String,
    body: String
    
}, {timestamps: true})

module.exports = model('notes', notesSchema)