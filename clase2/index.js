
//const result = Math.pow(2, 3) // vieja version de exponencial
const result = 2**3 // nueva version de exponencial

//console.log({ result })

const names = ["Santiago", "  Manuel ", " Juan", "Diego ", "Franco", "Fatima", "Fernando"]
const myname = "Fernando"

/*const newNames = []

for (let i = 0 ; i <= names.length - 1; i++) {
    const name = names[i].toLowerCase()
    newNames.push(name)
}*/


const newNames = names.map((el) => el.toLowerCase().trim()) // trim() => le saca los espacios al principio y al final de os strings

console.log(newNames)

const filteredNames = names
    .map((el) => el.toLowerCase())
    .filter(el => el[0] === "f")


const exists = names.includes(myname)

//console.log({ newNames, filteredNames, exists })


// EM8

const user = {
    name: 'Fernando',
    lastname:'Pereira',
    country: 'AR',
    age: 39
}

const entries = Object.entries(user)
const keys = Object.keys(user)
const values = Object.values(user)

//console.log ({ entries, keys, values })

const output = entries.reduce( (output, el) => {
    output += `${el[0]}: ${el[1]}
    `
    return output
}, "")

//console.log(output)

//SUMA

// const nums = [1, 2, 3, 4, 5]

// const resultado = nums.reduce((acc, el) => {
//     console.log(el)

//     acc = acc + el

//     return acc

// }, 0)

// console.log({ resultado })

const user2 = {
    name: 'Fernando',
    lastname:'Pereira',
    country: 'AR',
    age: 39
}

//const name = user2.name
//const country = user2.country

const { name, country } = user2 //indica que solo quiero quedarme con name y country del user2

const { age, ...newUser } = user2 // desestructuracion => dejo afuera age y y copio en un array nuevoUser el resto de las caracteristicas de user2

//console.log(age, newUser )

const arr = [
    [1, 3, 5, 7],
    [4, 6, 8, 10, 12]
]

const arr2 = arr.flat() //flat() => en un  array de arrays, lo que hace flat es juntarte todos los valores del array en uno solo

console.log({ arr, arr2 })

//OPERADOR FALSY || => si el primero valor es FALSO, muestra el 2do valor (valor x default). Si es primer termino es verdadero, muestra ese valor
const username = 'Fernando' || 'Anonimo'
const username1 = false || 'Anonimo'
const username2 = 0 || 'Anonimo'
const username3 = null || 'Anonimo'
const username4 = undefined || 'Anonimo'
const username5 = [] || 'Anonimo'
const username6 = {} || 'Anonimo'
const username7 = '' || 'Anonimo'

console.log({ username, username1, username2, username3, username4, username5, username6, username7 })


//OPERADOR NULLISH ?? => si el primero termino es nulo (null) o undefined, entonces me muestra el 2do valor 
const fernando = {
    //saldo: 0 si lo dejo en saldo 0, me muestra saldo 0, si le saco todo el termino es decir no tiene saldo, entonces muestra el default
}
const saldoDefault = 20
const saldo = fernando.saldo ?? saldoDefault

console.log({ saldo })

//OPERADOR AND && => si el primero valor es VERDADERO, muestra el 2do valor (valor x default). Si es primer termino es falso, muestra ese valor

const name2 = 'Fernando' && false && 'Pereira'

console.log(name2)