import { useState } from 'react';

function Welcome({ name }: { name: string }) {
  return <p>Welcome, {name || 'Guest'}!</p>;
}

export default function InteractiveWelcome() {
  const [name, setName] = useState<string>('');

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '20px' }}>
      <h3>Interactive Welcome</h3>
      <label htmlFor="name-input" style={{ display: 'block', marginBottom: '5px' }}>Enter Name:</label>
      <input
        id="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} // Controlled input pattern
        placeholder="Type a name..."
        style={{ padding: '6px', width: '200px', marginBottom: '10px' }}
      />
      <Welcome name={name} />
    </div>
  );
}

import React, { useState } from 'react';

interface LoginState {
  username: string;
  password:  string;
  remember:  boolean;
}

interface LoginProps {
  onLogin: (data: LoginState) => void;
}

const initialFormState: LoginState = {
  username: '',
  password: '',
  remember: false,
};

export default function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState<LoginState>(initialFormState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleLoginClick = () => {
    onLogin(formData);
  };

  const handleResetClick = () => {
    setFormData(initialFormState);
  };

  const isLoginDisabled = !formData.username.trim() || !formData.password.trim();

  return (
    <div style={{ maxWidth: '300px', padding: '15px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h3>Login</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '3px' }}>Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '3px' }}>Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleCheckboxChange}
          />
          Remember me
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={handleLoginClick} 
          disabled={isLoginDisabled}
          style={{ flex: 1, padding: '8px', cursor: isLoginDisabled ? 'not-allowed' : 'pointer' }}
        >
          Login
        </button>
        <button 
          onClick={handleResetClick}
          style={{ flex: 1, padding: '8px', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}