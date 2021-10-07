const socket = io();

const infomationContainer = document.querySelector('#infomation');
const infomationForm = infomationContainer.querySelector('form');
const roomContainer = document.querySelector('#room');
const roomNameEl = roomContainer.querySelector('h2');

roomContainer.hidden = true;

const appendMessage = (message) => {
  const ul = roomContainer.querySelector('ul');
  const li = document.createElement('li');

  li.innerText = message;
  ul.appendChild(li);
};

infomationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nicknameInput = infomationForm.querySelector('#nickname');
  const roomNameInput = infomationForm.querySelector('#room-name');

  socket.emit(
    'enter',
    nicknameInput.value.trim(),
    roomNameInput.value.trim(),
    (roomName, count) => {
      const roomForm = roomContainer.querySelector('form');

      infomationContainer.hidden = true;
      roomContainer.hidden = false;
      roomNameEl.innerText = `채팅방: ${roomName} (${count})`;

      roomForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const messageInput = roomForm.querySelector('#message');

        socket.emit(
          'message',
          roomName,
          messageInput.value.trim(),
          (message) => {
            appendMessage(message);
          }
        );

        messageInput.value = '';
      });
    }
  );

  nicknameInput.value = '';
  roomNameInput.value = '';
});

socket.on('welcome', (userName, roomName, count) => {
  roomNameEl.innerText = `채팅방: ${roomName} (${count})`;

  appendMessage(`${userName} 님이 들어왔습니다.`);
});

socket.on('message', (message) => {
  appendMessage(message);
});

socket.on('leave', (userName, roomName, count) => {
  roomNameEl.innerText = `채팅방: ${roomName} (${count})`;

  appendMessage(`${userName} 님이 나갔습니다.`);
});

socket.on('rooms', (rooms) => {
  const ul = infomationContainer.querySelector('ul');

  ul.innerHTML = '';

  if (rooms.length > 0) {
    rooms.forEach((room) => {
      const li = document.createElement('li');

      li.innerText = room;
      li.addEventListener('click', () => {
        const roomNameInput = infomationForm.querySelector('#room-name');

        roomNameInput.value = room;
      });

      ul.appendChild(li);
    });
  }
});
