const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('../Notification.mp3.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}
// function formatAMPM(date) {
//     var hours = date.getHours();
//     hours = hours % 12;
//     var ampm = hours >= 12 ? 'pm' : 'am';

// }
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const Name = prompt("Enter your name to join");
socket.emit('new-user-joined', Name);
socket.on('user-joined', Name => {
    append(`${Name} joined the chat`, 'left')
}
);
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left')
}
);
socket.on('left', Name => {
    append(`${Name} disconnect the chat`, 'left')
}
);

//${new Date().getHours()}:${new Date().getMinutes()} ${formatAMPM(new Date())}