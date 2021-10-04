const socket = io();

const enterEl = document.querySelector('#enter');
const enterFormEl = enter.querySelector('form');
const roomEl = document.querySelector('#room');

roomEl.hidden = true;

const appendMessage = (message) => {
  const ul = roomEl.querySelector('ul');
  const li = document.createElement('li');

  li.innerText = message;
  ul.appendChild(li);
};

enterFormEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = enterFormEl.querySelector('input');

  socket.emit('enter', input.value, (room) => {
    const h2 = roomEl.querySelector('h2');
    const roomFormEl = roomEl.querySelector('form');

    enterEl.hidden = true;
    roomEl.hidden = false;
    h2.innerText = `채팅방 이름: ${room}`;

    roomFormEl.addEventListener('submit', (event) => {
      event.preventDefault();

      const input = roomFormEl.querySelector('input');

      socket.emit('message', room, input.value, (message) => {
        appendMessage(message);
      });

      input.value = '';
    });
  });

  input.value = '';
});

socket.on('welcome', () => {
  appendMessage('님이 들어왔습니다.');
});

socket.on('message', (message) => {
  appendMessage(message);
});

socket.on('bye', () => {
  appendMessage('님이 나갔습니다.');
});
