'use client';
import { useState } from 'react';

export default function Home() {
  const [cmd, setCmd] = useState('');

  const send = async () => {
    await fetch('/api/command', {
      method: 'POST',
      body: JSON.stringify({ command: cmd }),
    });
    alert('Команда отправлена!');
    setCmd('');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Remote Control</h1>
      <input 
        value={cmd} 
        onChange={(e) => setCmd(e.target.value)} 
        placeholder="Введите команду (например: start calc)"
        style={{ padding: '10px', width: '80%', color: 'white' }}
      />
      <br /><br />
      <button onClick={send} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        ОТПРАВИТЬ
      </button>
    </div>
  );
}