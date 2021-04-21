const express = require('express')
const router = express.Router()

const upload = require('../middlware/file')

const { Book } = require('../models')
const db = {
    books: []
}

function getIndex(array, id) {
    return array.findIndex(item => item.id === id)
}

router.get('/', (req, res) => {
    const { books } = db

    if (books.length) {
        res.json(books)
    } else {
        res.send('Пока нет ни одной книги :(')
    }
})

router.get('/err', (req, res) => {
    throw new Error('Something wrong!')
})

router.get('/:id', (req, res) => {
    const { books } = db
    const { id } = req.params
    const bookIndex = getIndex(books, id)

    if (bookIndex === -1) {
        res.status(404).res.json(`Такая книга не найдена`)
    } else {
        res.json(books[bookIndex])
    }
})

router.post('/', (req, res) => {
    const { books } = db
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    const book = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    books.push(book)

    res.status(201)
    res.json(book)
})

router.put('/:id', (req, res) => {
    const { books } = db
    const { id } = req.params
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
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
            fileName,
            fileBook
        }
        res.json(books[bookIndex])
    }
})

router.delete('/:id', (req, res) => {
    const { books } = db
    const { id } = req.params
    const bookIndex = getIndex(books, id)

    if (bookIndex === -1) {
        res.status(404).res.json(`Такая книга не найдена`)
    } else {
        books.splice(bookIndex, 1)
        res.status(204).end()
    }
})

router.post('/upload', upload.single('fileBook'), (req, res) => {
    // debug
    console.log('multer', req.file)
    console.log('multer', req.files)

    if (req.file) {
        const { path } = req.file
        console.log(path)

        res.json(path)
    } else {
        res.json(null)
    }
})

router.post('/:id/download', (req, res) => {
    res.download(__dirname + '../public/uploads/', 'book.txt', err => {
        if (err) res.status(404).json()
    })
})

module.exports = router
