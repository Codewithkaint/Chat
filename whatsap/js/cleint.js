

const socket = io('http://localhost:8000');
const form = document.getElementById('cont2');
const messageIns = document.getElementById('messagein');
const container = document.querySelector(".cont");
var audio = new Audio('ud.mp3');
const append = (message, position) => {
    const meselement = document.createElement('div');
    meselement.innerText = message;
    meselement.classList.add('mes');
    meselement.classList.add(position);
    container.append(meselement);
    if (position == 'left') {
        audio.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageIns.value;
    append(`${message}`, 'right')
    socket.emit('send', message);
    messageIns.value = '';

})
const names = prompt("ENTER YOUR NAME TO CHAT");

socket.emit('new-user joined', names);
socket.on('user joined', names => {
    append(`${names} joined us`, 'right')
})
socket.on('receive', data => {
    append(`${data.names}:${data.message}`, 'left')
})
socket.on('left', names => {
    append(`${names} left the chat`, 'left')
})