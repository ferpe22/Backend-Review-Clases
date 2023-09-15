const { Router } = require('express')

const dictionaryRouter = Router()

const words = {
    //iram: 'Iram Gutierrez',
    fernando: 'Fernando Pereira',
}

const dictionaryService = {
    findWord: (word) => {
        return words[word]
    }
}

wordMiddleware = (req, res, next) => {
    console.log(req.params.word)

    return next()
}

dictionaryRouter.param('word', (req, res, next, value) => {
    const wordFound = dictionaryService.findWord(value)

    if (wordFound) {
        req.word = wordFound
    } else {
        req.word = null
    }
    
    return next()
})

dictionaryRouter.get('/:word([a-zA-Z%C%3%B3]+)', (req, res) => {
    return res.send(req.word)
})

dictionaryRouter.get('/:word', (req, res) => {
    return res.send(`Error con la palabra ${req.params.word}`)
})


module.exports = dictionaryRouter