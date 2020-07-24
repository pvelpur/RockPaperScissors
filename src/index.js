const express = require('express')
const socketio = require('socket.io')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const {addUser, removeUser, getUser, getUsersInRoom, resetUserScore} = require('./utils/users')

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('new connection')

    socket.on('join', ({username, roomid}, callback) => {
        const {error, user} = addUser({id:socket.id, username, roomid})

        if(error) {
            return callback(error)
        }

        socket.join(roomid)
        io.to(roomid).emit('roomData', {
            users: getUsersInRoom(user.roomid)
        })

        callback()
    })

    socket.on('resetScore', ({roomid}) => {
        resetUserScore(roomid)
        io.to(roomid).emit('roomData', {users:getUsersInRoom(roomid)})
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.roomid).emit('roomData', {
                users: getUsersInRoom(user.roomid)
            })
        }
    })

})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})