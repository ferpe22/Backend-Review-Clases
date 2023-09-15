//DESAFIO

const objetos =  [
    {
    manzanas:3,
    peras:2,
    carne:1,
    jugos:5,
    dulces:2
    },
    {
    manzanas:1,
    sandias:1,
    huevos:6,
    jugos:1,
    panes:4
    }
]

const newList = objetos.map((el => {
    const arr = Object.keys(el)
    console.log(arr)
    return arr
})
)
console.log(newList.flat())
