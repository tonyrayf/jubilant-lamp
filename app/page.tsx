'use client';
import { useState } from 'react';

export default function Home() {
  const [pass, setPass] = useState('');
  const [cmd, setCmd] = useState('');

  const send = async () => {
    const res = await fetch('/api/command', {
      method: 'POST',
      body: JSON.stringify({ command: cmd, password: pass }),
    });
    
    if (res.ok) {
        alert('Успешно отправлено!');
        setCmd('');
    } else {
        alert('Ошибка: Пароль не подошел');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <input type="password" placeholder="Пароль" value={pass} onChange={e => setPass(e.target.value)} 
             style={{ padding: '10px', marginBottom: '10px', color: '#ffffff' }} />
      <br />
      <input placeholder="Команда" value={cmd} onChange={e => setCmd(e.target.value)} 
             style={{ padding: '10px', width: '80%', color: '#ffffff' }} />
      <br /><br />
      <button onClick={send} style={{ padding: '10px 20px', background: 'red', color: 'white' }}>ОТПРАВИТЬ</button>
    </div>
  );
}
