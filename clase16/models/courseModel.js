const { Schema, model } = require('mongoose')

const courseSchema = Schema({
    title: String,
    description: String,
    difficulty: Number,
    topics: {
        type: Array,
        default: []    
    },
    professor: String,
    students: {
        type: Array,
        default: []
    }
})

module.exports = model('courses', courseSchema)