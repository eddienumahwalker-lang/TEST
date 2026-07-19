import React from 'react';

export default function UncontrolledLogin() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get('username');
    const password = formData.get('password');
    const remember = formData.get('remember') === 'on'; 

    console.log('Login Form Submitted:', {
      username,
      password,
      remember,
    });
  };

  return (
    <div style={{ maxWidth: '320px', margin: '20px auto', padding: '15px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h2>Uncontrolled Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            required 
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="checkbox" 
              name="remember" 
            />
            Remember me
          </label>
        </div>

        <button type="submit" style={{ width: '100%', padding: '8px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}