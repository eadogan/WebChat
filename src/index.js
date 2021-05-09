'use strict'

// Loading dependency & initizlizing express
const os = require('os')
const express = require('express')
const http = require('http')
const path = require('path')

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()

// Signaling WebRTC
const socketIO = require('socket.io')

// Define the folder which cointans the CSS and JS for the frontend
app.use(express.static(publicDirectoryPath))

app.use('/', (req, res) => {
    res.render('index.ejs')
})

const server = http.createServer(app)


const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Server is on port ${port}`)
})