const socket = io();

const infomationContainer = document.querySelector('#infomation');
const infomationForm = infomationContainer.querySelector('form');
const roomContainer = document.querySelector('#room');

roomContainer.hidden = true;

const appendMessage = (message) => {
  const messagesEl = roomContainer.querySelector('ul');
  const createdMessageEl = document.createElement('li');

  createdMessageEl.innerText = message;
  messagesEl.appendChild(createdMessageEl);
};

infomationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nicknameInput = infomationForm.querySelector('#nickname');
  const roomNameInput = infomationForm.querySelector('#room-name');

  socket.emit('enter', nicknameInput.value, roomNameInput.value, (roomName) => {
    const roomNameEl = roomContainer.querySelector('h2');
    const roomForm = roomContainer.querySelector('form');

    infomationContainer.hidden = true;
    roomContainer.hidden = false;
    roomNameEl.innerText = `채팅방 이름: ${roomName}`;

    roomForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const messageInput = roomForm.querySelector('#message');

      socket.emit('message', roomName, messageInput.value, (message) => {
        appendMessage(message);
      });

      messageInput.value = '';
    });
  });

  nicknameInput.value = '';
  roomNameInput.value = '';
});

socket.on('welcome', (nickname) => {
  appendMessage(`${nickname} 님이 들어왔습니다.`);
});

socket.on('message', (message) => {
  appendMessage(message);
});

socket.on('bye', (nickname) => {
  appendMessage(`${nickname} 님이 나갔습니다.`);
});
