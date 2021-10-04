const socket = io();

const enter = document.querySelector('#enter');
const enterForm = enter.querySelector('form');
const room = document.querySelector('#room');

room.hidden = true;

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = enterForm.querySelector('input');

  socket.emit('enter', input.value, (data) => {
    const name = room.querySelector('h2');

    enter.hidden = true;
    room.hidden = false;
    name.innerText = `채팅방 이름: ${data}`;
  });

  input.value = '';
});
