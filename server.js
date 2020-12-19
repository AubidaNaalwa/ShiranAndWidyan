const express = require('express')
const path = require('path')
const app = express()
const port = 3030 // A NICE PORT TO MY SERVER
const api = require('./api/api')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://AubidaNaalwa:Admin1234@cluster0.cvbqr.mongodb.net/ShiranAndWidyan?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.urlencoded({ extened: false }))
app.use(express.json())



app.use('/', api)

app.listen(port, function () {
    console.log(`server runs on port : ${port}`)

})

