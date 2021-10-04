const socket = io();

const enter = document.querySelector('#enter');
const enterForm = enter.querySelector('form');
const room = document.querySelector('#room');

room.hidden = true;

const appendMessage = (message) => {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');

  li.innerText = message;
  ul.appendChild(li);
};

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = enterForm.querySelector('input');

  socket.emit('enter', input.value, (name) => {
    const h2 = room.querySelector('h2');

    enter.hidden = true;
    room.hidden = false;
    h2.innerText = `채팅방 이름: ${name}`;
  });

  input.value = '';
});

socket.on('welcome', () => {
  console.log('dsadas');

  appendMessage('방에 입장하셨습니다');
});
