const socket = io();

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = form.querySelector('input');

  socket.emit('enter_room', { payload: input.value }, (response) => {
    console.log(response);
  });

  input.value = '';
});
