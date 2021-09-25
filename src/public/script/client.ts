const nicknameForm = document.querySelector('#nickname');
const messageForm = document.querySelector('#message');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to WebSocket 😃');
});

socket.addEventListener('message', ({ data }) => {
  const messageList = document.querySelector('ul');
  const message = document.createElement('li');

  message.innerText = data;

  messageList.append(message);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from WebSocket 😥');
});

const makeData = (type: 'nickname' | 'message', payload: string) => {
  return JSON.stringify({ type, payload });
};

nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nickname = nicknameForm.querySelector('input');

  socket.send(makeData('nickname', nickname.value.trim()));
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = messageForm.querySelector('input');

  socket.send(makeData('message', message.value.trim()));

  message.value = '';
});
