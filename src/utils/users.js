const users = []

// addUser, removeUser, getUser, getUsersInRoom, resetUserScore

const addUser = ({id, username, roomid}) => {
    // Clean data
    username = username.trim()
    roomid = roomid.trim()

    // Validate data
    if(!username || !roomid) {
        return {
            error: 'Username and room are required'
        }
    }

    const usersInRoom = getUsersInRoom(roomid).length
    if(usersInRoom === 2) {
        return {
            error: 'Too many users in room already'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.roomid === roomid && user.username.toLowerCase() === username.toLowerCase()
    })

    if(existingUser) {
        return {
            error: 'Username is already in use!'
        }
    }

    // Store user
    const user = {id, username, roomid, score:3}
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index!=-1) {
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id) // extracts the object in the array
}

const getUsersInRoom = (roomid) => {
    return users.filter(user => user.roomid === roomid)
}

const resetUserScore = (roomid) => {
    const usersInRoom = getUsersInRoom(roomid)
    const len = usersInRoom.length
    for (let i=0; i<len; i++) {
        usersInRoom[i].score = 0;
    }
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    resetUserScore
}