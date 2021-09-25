// const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = form.querySelector('input');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to WebSocket 😃');
});

socket.addEventListener('message', async (message) => {
  const data = await message.data.text();

  console.log(data);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from WebSocket 😥');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  socket.send(input.value);

  input.value = '';
});
