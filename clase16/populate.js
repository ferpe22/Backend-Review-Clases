const mongoose = require('mongoose')
const studentModel = require('./models/studentModel')
const courseModel = require('./models/courseModel')

const MONGODB_CONNECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase16-populate?retryWrites=true&w=majority'

mongoose.connect(MONGODB_CONNECT)
.then(async _ => {
    console.log('Connected to MongoDB')

    const fernando = await studentModel.findOne() //.populate('courses.course')

    /* const firstCourse = await courseModel.findOne()

    fernando.courses.push({ course: firstCourse._id })

    await studentModel.updateOne({ _id: fernando._id }, fernando)*/

    console.log({ fernando: JSON.stringify(fernando, null, 2) })

    /*return courseModel.create({
        title: 'Backend',
        description: 'Programacion Backend con Node.js',
        difficulty: 6,
        topics: ['Javascript', 'Node.js', 'Express', 'MongoDB'],
        professor: 'Iram Gutierrez'
    })*/

    /*return studentModel.create({
        "first_name": "Fernando",
        "last_name": "Pereira",
        "email": "fp22@mail.com",
        "gender": "M",
    })*/
})
.catch((error) => console.log(error))