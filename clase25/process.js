//console.log(process.argv.slice(2))

let mode = 'dev'

const modeFound = process.argv.slice(2).findIndex( arg => arg === '--mode')

if(modeFound !== -1){
  mode = process.argv.slice(2)[modeFound + 1] || 'dev'
}

const MONGODB_CONNECT_PROD = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase24_Integrador?retryWrites=true&w=majority'
const MONGODB_CONNECT_DEV = 'mongodb+srv://ferpereira22:franco15@cluster1.1l8kmh9.mongodb.net/clase24_Integrador?retryWrites=true&w=majority'

console.log(`Ejecutando en modo ${mode}`)

process.on('uncaughtException', e => {
  process.exit(2)
  console.log('Exepcion capturada')
})

process.on('exit', code => {
  console.log('Finalizando el proceso', code)
})

console('hola')




