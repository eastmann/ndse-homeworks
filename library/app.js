const express = require('express')
const formData = require('express-form-data')
const multer = require('multer')

const { Book } = require('./models')
const db = {
    books: []
}

const app = express()
const router = express.Router()

function getIndex(array, id) {
    return array.findIndex(item => item.id === id)
}

app.use(formData.parse())

app.get('/api/books/', (req, res) => {
    const { books } = db

    if (books.length) {
        res.json(books)
    } else {
        res.send('Пока нет ни одной книги :(')
    }
})

app.get('/api/books/:id', (req, res) => {
    const { books } = db
    const { id } = req.params
    const bookIndex = getIndex(books, id)

    if (bookIndex === -1) {
        res.status(404).res.json(`Такая книга не найдена`)
    } else {
        res.json(books[bookIndex])
    }
})

app.post('/api/books/', (req, res) => {
    const { books } = db
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const book = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(book)

    res.status(201)
    res.json(book)
})

app.put('/api/books/:id', (req, res) => {
    const { books } = db
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const bookIndex = getIndex(books, id)

    if (bookIndex === -1) {
        res.status(404).res.json(`Такая книга не найдена`)
    } else {
        books[bookIndex] = {
            ...books[bookIndex],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }
        res.json(books[bookIndex])
    }
})

app.delete('/api/books/:id', (req, res) => {
    const { books } = db
    const { id } = req.params
    const bookIndex = getIndex(books, id)

    if (bookIndex === -1) {
        res.status(404).res.json(`Такая книга не найдена`)
    } else {
        books.splice(bookIndex, 1)
        res.json('OK')
    }
})

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({
        id: 1,
        mail: 'test@mail.ru'
    })
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log(`App is listeting on port ${PORT}`)
})
