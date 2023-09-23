import './styles/App.css';
import { useState } from 'react';
import { socket } from './socket';

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState(null);

  socket.on('recieve_message', (data) => { setMessages([...messages, data]) });
  const sendMessage = () => {
    socket.emit('send_message', { value: message, roomId })
  }
  const joinRoom = () => {
    if (roomId) socket.emit('join_room', roomId);
  }

  return (
    <div className="App">
      <input 
        onChange={({ target: { value } }) => setRoomId(value)} 
        placeholder="Room Id..." 
      />
      <button onClick={joinRoom}>
        Join Room
      </button>

      <input 
        onChange={({ target: { value } }) => setMessage(value)} 
        placeholder="Message..." 
      />
      <button onClick={sendMessage}>
        Send Message
      </button>

      <h1>Messages</h1>
      {messages?.map(message => (
        <h2>{message.value}</h2>
      ))}
    </div>
  );
}

export default App;
