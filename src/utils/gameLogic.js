const compareHands = (players) => {
    // players is an array of players in the room!
    if(players[0].option === players[1].option){
        return 'Its a tie!'
    }
    if(players[0].option === 'rock') {
        if(players[1].option === 'scissors') {
            players[0].score++
            return `${players[0].username} Wins`
        }
        else {
            players[1].score++
            return `${players[1].username} Wins`
        }
    }
    if(players[0].option === 'paper') {
        if(players[1].option === 'rock') {
            players[0].score++
            return `${players[0].username} Wins`
        }
        else {
            players[1].score++
            return `${players[1].username} Wins`
        }
    }
    if(players[0].option === 'scissors') {
        if(players[1].option === 'paper') {
            players[0].score++
            return `${players[0].username} Wins`
        }
        else {
            players[1].score++
            return `${players[1].username} Wins`
        }
    }

}

module.exports = {
    compareHands
}