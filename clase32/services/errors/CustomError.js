class CustomError {
  static createError({ name= 'Error', cause, message, code = 1}) {
    const error = new Error(message, { cause })
    error.name = name
    error.code = code
    throw error
  }
}

// Un metodo static se puede invocar a patir de la clase y no de la instancia. El metodo aplica directamente sobre la clase.
// CustomError.createError() // es la forma de invocar el metodo static CLASE.METODO()

// En cambio si no seria static primero debes crear una instancia de la clase y posteriormente ejecutar el metodo.
// const instance = new CustomError()
// instance.createError()

//En resumen, un metodo normal se ejecuta sobre la instancia y un estatico se ejecuta sobre la clase!

module.exports = CustomError