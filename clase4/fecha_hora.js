/*

/////////DESAFIO CLASE//////////
const fs = require('fs')

const archivo = './archivo_fecha_hora_actual.txt'

const now = new Date().toUTCString()
console.log(now)

const fechaHoraActual = now


fs.writeFile(archivo, fechaHoraActual, (err) => {
    if(err !== null) {
        console.log(err)
        return err
    }

    fs.readFile(archivo, 'utf-8', (err, contenidoArchivo) => {
        if (err !== null) {
            console.log(err)
            return err
        }

        console.log({ contenidoArchivo })

        const nvoContenido = `
La hora actual es la detallada anteriormente`

        fs.appendFile(archivo, nvoContenido, (err) => {
            if(err !== null) {
                console.log(err)
                return err
            }

            fs.unlink(archivo, (err) => {
                if(err !== null) {
                    console.log(err)
                    return err
                }
            })
        })
    })
})
*/
/////////FS CON SINCRONIA////////////////////////////
/*
const fs = require('fs')

const contenido = 'Primer contenido para escribir en un archivo'
const archivo = './archivo_sync.txt'

fs.writeFileSync(archivo, contenido)

if(fs.existsSync(archivo)){
    const contenidoArchivo = fs.readFileSync(archivo, 'utf-8')
    
    console.log({ contenidoArchivo })
    
    console.log(contenidoArchivo == contenido)
    
    const nuevoContenido = `
    Contenido adicional para escribir en el archivo`
    
    fs.appendFileSync(archivo, nuevoContenido )
    
    fs.unlinkSync(archivo)
} else {
    console.log('El archivo no existe')
}
*/
///////////FS CON PROMESAS (ASINCRONICO)//////////////

const fs = require('fs')
const contenido = 'Primer contenido para escribir en un archivo con promesas'
const archivo = './archivo_promises.txt'

fs.promises.writeFile(archivo, contenido)
    .then(() => {
        console.log('Archivo escrito correctamente')
        return fs.promises.readFile(archivo, 'utf-8')
    })
    .then((contenidoAdicional)=> {
        console.log({ contenidoAdicional })
        const nvoContenido = `
    Contenido adicional para guardar en el archivo`
        return fs.promises.appendFile(archivo, nvoContenido)    
    })
    .then(() => {
        console.log('Archivo actualizado correctamente')
        //return fs.promises.unlink(archivo)
    })

    .catch((err) => {
        console.log({ err })
    })

////////////FS CON ASYNC AWAIT///////////
/*
const fs = require('fs')
const contenido = 'Primer contenido en un archivo con async await'
const archivo = './archivo_promises_.txt'

// Si antes de a promesa poner el await solo...no funcion ya que el await debe estar encerrado en una funcion con async. Para ellos se agrega la arrow funtion de ASYNC
// const init = async () => {
//         const resultado = await fs.promises.readFile(archivo, 'utf-8')
//         console.log({ resultado })
// }


//Como puede ser que tengas algun error, tenes que hacer algo para manejar ese error, por eso se agrega el try/catch a la function async.

const init = async () => {
    try {
        const resultado = await fs.promises.readFile(archivo, 'utf-8')
        console.log({ resultado })
    } catch (e) {
        console.log('Ocurrio un error!')
    }
}

init()
*/

