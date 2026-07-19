.welcome {
  background-color: #f0f4f8;
  border: 2px solid #0066cc;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  max-width: 400px;
  font-family: sans-serif;
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function Welcome({ name }: { name: string }) {
  return (
    <div className="welcome"> 
      <p>Welcome, <strong>{name}</strong>!</p>
    </div>
  );
}

import { useState } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const displayStyle = {
    fontSize: '2.5rem',
    color: counter >= 0 ? '#2e7d32' : '#d32f2f',
    backgroundColor: '#f5f5f5',
    padding: '10px 20px',
    borderRadius: '6px',
    display: 'inline-block',
    margin: '10px 0'
  };

  return (
    <div>
      <h2 style={displayStyle}>{counter}</h2>
      <button onClick={() => setCounter(prev => prev + 1)}>Increment</button>
    </div>
  );
}

import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isPasswordShort = password.length < 8;
  
  const buttonStyle = {
    backgroundColor: isPasswordShort ? 'red' : 'green',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button type="submit" style={buttonStyle}>Login</button>
    </form>
  );
}

npm install sass

.clock-container {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: inline-block;

  h2 {
    color: #ffffff;
    font-family: 'Courier New', monospace;
    font-size: 2rem;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
}

import { useState, useEffect } from 'react';
import './Clock.scss'; 

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock-container">
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
}

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

import React from 'react';

export default function UncontrolledLogin() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data.entries()));
  };

  return (
    
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Secure Access</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input 
            type="text" 
            name="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            name="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

npm install react-bootstrap bootstrap

import { useEffect, useRef } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap'; 

export default function FocusableInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Form.Group controlId="focusableInputForm" className="mb-3">
            <Form.Label className="fw-bold text-secondary">Auto-Focused Input Fields</Form.Label>
            <Form.Control 
              ref={inputRef}
              type="text" 
              placeholder="Typing focus locked automatically..." 
              size="lg"
            />
            <Form.Text className="text-muted">
              Built natively using styled React-Bootstrap design nodes.
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}


