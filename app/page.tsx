'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [pass, setPass] = useState('');
  const [cmd, setCmd] = useState('');

  const SECRET_KEY = process.env.MASTER_KEY;


  const handleLogin = () => {
    if (pass === SECRET_KEY) {
      setIsLogged(true);
      localStorage.setItem('remote_pass', pass);
    } else {
      alert('Неверный пароль!');
    }
  };


  useEffect(() => {
    const savedPass = localStorage.getItem('remote_pass');
    if (savedPass === SECRET_KEY) setIsLogged(true);
  }, []);

  const send = async () => {
    const res = await fetch('/api/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: cmd, password: pass || localStorage.getItem('remote_pass') }),
    });
    
    if (res.ok) {
        alert('Команда отправлена!');
        setCmd('');
    }
  };

  if (!isLogged) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#000', color: '#fff', height: '100vh' }}>
        <h2>Доступ ограничен</h2>
        <input 
          type="password" 
          placeholder="Введите мастер-пароль" 
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ padding: '10px', width: '250px', color: '#000', borderRadius: '5px' }}
        />
        <br /><br />
        <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer', background: '#333', color: '#fff', border: '1px solid #555' }}>
          ВОЙТИ
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
      <h1>Remote Control Active</h1>
      <p style={{ color: 'green' }}>● Система на связи</p>
      <input 
        value={cmd} 
        onChange={(e) => setCmd(e.target.value)} 
        placeholder="Введите команду..."
        style={{ padding: '12px', width: '85%', borderRadius: '5px', border: 'none', color: '#000' }}
      />
      <br /><br />
      <button onClick={send} style={{ padding: '15px 30px', background: '#e63946', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        ВЫПОЛНИТЬ
      </button>
      <br /><br />
      <button onClick={() => { localStorage.removeItem('remote_pass'); setIsLogged(false); }} style={{ color: '#555', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
        Выйти (очистить сессию)
      </button>
    </div>
  );
}