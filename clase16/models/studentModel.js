const { Schema, model } = require('mongoose')

const studentSchema = Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    courses: {
        type: [
            {
                course: {
                    type: Schema.Types.ObjectId,
                    ref: 'courses'
                }
            }
        ],
        default: []
    }
})


studentSchema.pre('findOne', function () {
    console.log(this)
    this.populate('courses.course')
})


//utilizar una arrow function tiene la limitante que genera un scope limitado x la funcion. Es por es que no toma el 'this'. En este caso debemos usar una funcion tradicional para ampliar el scope (mejor dicho, no genere el scope acotado x a funcion) y este tomar el scope padre 'studentSchema'.
/*studentSchema.pre('findeOne', () => {
    console.log(this)
    this.populate('courses.course')
})*/

module.exports = model('students', studentSchema)

/**
 * 
{
    "first_name": "Iram",
    "last_name": "Gutiérrez",
    "email": "iram@mail.com",
    "gender": "M",
    "courses": [
        {
        "course": ObjectId("dsfasdfasdfasdfafsd")
        }
    ]
}
 * 
 */

