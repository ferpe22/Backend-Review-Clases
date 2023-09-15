

// scope 0 (padre)
let bar = 1

if (true) {
    // scope 1 (hijo)
    let bar = 2
}

//console.log(bar)

const foo = 3
//foo = 4
//console.log(foo)


const user = {
    name: "Fernando",
    lastname: "Pereira",
}

// user = {
    //     name: "Daniel"
    // }
    
    const user2 = user
    user2.name = "Daniel"
    
    //console.log({user, user2})
    
    //console.log({foo,user,user2})
    
    let x = 12
    let y = x
    x = 13
    
    //console.log({ x, y })
    
// PREGUNTA DE ENTREVISTA: COPIAS DE DATOS
// En el caso de los datos tipo primitivos, las copias se hace por valor.
// En el caso de los datos tipo objetos, las copias se hacer por referencias...es decir apuntan a un mismo espacio de memoria

/*//OPCION 1
function suma (a, b) {
    return a + b
}*/

/*//OPCION 2
const suma = function (a, b) {
    return a + b
}*/

/*//OPCION 3
const suma = (a, b) => {
    return a + b
}
const suma = (a, b) => a + b*/


const suma = function (a, b) { return a + b }
//console.log(typeof suma)
const resultado = suma(12,13)
//console.log({ resultado })


const mostrarLista = (array) => {
    if (array.length < 1) return "Lista vacia";
    for (let i = 0; i < array.length; i++) {
        console.log(array[i])
    }
    return `La lista tiene ${array.length} elementos`
    }
console.log(mostrarLista([]))
console.log(mostrarLista([11, 7, 22, 25]))


