//connect to server from client side
const socket = io()

//Elements
const $players = document.querySelector('#players')
const $resetBtn = document.querySelector('.reset')

//Templates
const newPlayerTemplate = document.querySelector('#playerScore-template').innerHTML

// Options
const {username, roomid} = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.emit('join', {username, roomid}, (error) => {
    console.log("new player has joined!")
    if(error) {
        alert(error)
        location.href= '/'
    }
})

$resetBtn.addEventListener('click', () => {
    socket.emit('resetScore', {roomid})
})

socket.on('roomData', ({users}) => {
    const html = Mustache.render(newPlayerTemplate, {users})
    $players.innerHTML = html
})

function shareRoomCode() {
    const $rCode = document.querySelector('#roomCode')
    $rCode.textContent = roomid
}