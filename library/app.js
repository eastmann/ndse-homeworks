const path = require('path')
const express = require('express')
const cors = require('cors')

const middleWareNotFound = require('./middlware/404')
const middleWareServerError = require('./middlware/500')

const routeBooks = require('./routes/books')
const routeUser = require('./routes/user')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/api/books', routeBooks)
app.use('/api/user', routeUser)

app.use(middleWareNotFound)
app.use(middleWareServerError)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log(`App is listeting on port ${PORT}`)
})
