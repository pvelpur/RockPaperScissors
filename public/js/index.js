function handleSubmit() {
    const roomcode = document.querySelector("form").roomid
    const randomVal = Math.random().toString(16).substr(2, 6)
    if(!roomcode.value){
        //generate new roomcode
        roomcode.value = randomVal
    }
}