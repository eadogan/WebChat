const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidv4 } = require('uuid')

// Create dynamic id connection between diffirent user
const { ExpressPeerServer } = require('peer') 
const peerServer = ExpressPeerServer(server, {
    debug:true
})

app.set('view engine', 'ejs')
app.use('/peer', peerServer)
const path = require('path')
const publicDirectoryPath = path.join(__dirname, '../public')
// Define the folder which cointans the CSS and JS for the frontend
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId)
        })
        // socket.on('message', (message) => {
        //     io.to(roomId).emit('createMessage', message, userName)
        // })
    })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server is on port ${port}`)
})