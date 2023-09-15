class Persona {
    constructor(name) {
        this.name = name
    }
}

const fernando = new Persona("Fernando")
//console.log(fernando)

////////////////////////////////////////////////////////////////////
class Contador {
    #nombre
    constructor(nombre) {
        this.#nombre = nombre
        this.contador = 0
    }

    static contadorGlobal = 0

    getResponsable () {
        return `El responsable es ${this.#nombre}`
    }

    contar () {
        this.contador++
        Contador.contadorGlobal++
    }

    getCuentaIndividual () {
        return this.contador
    }

    getCuentaGlobal () {
        return Contador.contadorGlobal
    }

}

const santiago = new Contador("Santiago")
const fatima = new Contador("Fatima")
const douglas = new Contador("Douglas")

console.log(santiago.getResponsable())
process.exit()

fatima.contar()
santiago.contar()
douglas.contar()
fatima.contar()

console.log(santiago.getCuentaIndividual(), santiago.getCuentaGlobal())
console.log(fatima.getCuentaIndividual(), fatima.getCuentaGlobal())
console.log(douglas.getCuentaIndividual(), douglas.getCuentaGlobal())