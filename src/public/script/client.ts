// const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = form.querySelector('input');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to WebSocket 😃');
});

socket.addEventListener('message', (message) => {
  console.log(message.data);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from WebSocket 😥');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  socket.send(input.value);
});
