/// EJERCICIO CLASE
/*
const resultados = {}


//OPCION 1
for (let i = 0; i <= 10000; i++) {
    const random = Math.floor(Math.random() * 20 + 1);
    resultados[random]
    ? (resultados[random] ++)
    : (resultados[random] = 1);
}


//OPCION 2
for (let i = 0; i <= 10000; i++) {
    const random = Math.floor(Math.random() * 20 + 1);
    random in resultados
    ? (resultados[random] ++)
    : (resultados[random] = 1);
}

console.log(resultados)
*/

////////////////////////

const moment = require('moment')
console.log(moment())