const http = require('http')

const server = http.createServer((request, response) => {
    console.log('Solicitud recibida', request.url)

    if (request.url === '/contacto') {
        response.end('Bienvenido a la seccion de contacto')
    } else if (request.url === '/sucursales') {
        response.end('Bienvenido a la seccion de sucursales')
    }
})

server.listen(8080, () => {
    console.log('Servidor web escuchando en el puerto 8080')
})