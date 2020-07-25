//connect to server from client side
const socket = io()

//Elements
const $players = document.querySelector('#players')
const $hands = document.querySelector('.hands')
const $resetBtn = document.querySelector('.reset')
const $options = document.querySelectorAll('.options button')
const $winner = document.querySelector('.winner')


//Templates
const newPlayerTemplate = document.querySelector('#playerScore-template').innerHTML
const newPlayerHand = document.querySelector('#playerHand-template').innerHTML

// Options
const {username, roomid} = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.emit('join', {username, roomid}, (error) => {
    console.log("new player has joined!")
    if(error) {
        alert(error)
        location.href= '/'
    }
})

$options.forEach(option => {
    option.addEventListener('click', function() {
        console.log(this)
        socket.emit('optionSelected', {choice: this.className, roomid})

        //update images (should happen later and go to all players)
        document.querySelector(`.${socket.id}`).src = `./img/${this.textContent}.png`
    })
})

$resetBtn.addEventListener('click', () => {
    socket.emit('resetScore', {roomid})
})

socket.on('waiting', () => {
    $winner.textContent = 'Waiting for opponent to select an option...'
})

socket.on('gameplay', ({users, result}) => {
    const htmlScore = Mustache.render(newPlayerTemplate, {users})
    const htmlHand = Mustache.render(newPlayerHand, {users})
    $players.innerHTML = htmlScore
    $hands.innerHTML = htmlHand

    $winner.textContent = result
    
})

socket.on('roomData', ({users}) => {
    const htmlScore = Mustache.render(newPlayerTemplate, {users})
    const htmlHand = Mustache.render(newPlayerHand, {users})
    $players.innerHTML = htmlScore
    $hands.innerHTML = htmlHand

    if(users.length > 1) {
        $options.forEach((option) => {
            option.removeAttribute('disabled')
        })
        $winner.textContent = 'Choose an option'
    }
    else {
        $options.forEach((option) => {
            option.disabled = true;
        })
        $winner.textContent = 'Waiting for opponent.....'
    }
    
})

function shareRoomCode() {
    const $rCode = document.querySelector('#roomCode')
    $rCode.textContent = roomid
}

// maybe have a playMatch function (in server) so clicking a button will simply just emit something