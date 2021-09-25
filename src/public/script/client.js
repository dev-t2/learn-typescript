const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to WebSocket 😃');
});

socket.addEventListener('message', (message) => {
  console.log(`Server Message: ${message.data}`);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from WebSocket 😅');
});

setTimeout(() => {
  socket.send('hello');
}, 10000);
