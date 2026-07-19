export function Welcome({ name }: { name: string }) {
  return <h2>Welcome, {name}!</h2>;

import { useState } from 'react';
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Counter: {count}</button>;
}
import { useState, useEffect } from 'react';
export function GithubUser({ username }: { username: string }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [username]);

  if (!user) return <p>Loading user profile...</p>;
  return (
    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <img src={user.avatar_url} alt={user.login} width={50} style={{ borderRadius: '50%' }} />
      <h3>{user.name || user.login}</h3>
    </div>
  );
}
import { useParams } from 'react-router-dom';
import { GithubUser } from './GithubUser';

export function ShowGithubUser() {
  const { username } = useParams<{ username: string }>();

  return username ? <GithubUser username={username} /> : <p>No user selected</p>;
}

import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

interface UserItem {
  id: number;
  login: string;
}

export function GithubUserList() {
  const [users, setUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(data => setUsers(data.slice(0, 10)))
  }, []);

  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      <div>
        <h3>GitHub Users Directory</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {users.map(user => (
            <li key={user.id} style={{ margin: '8px 0' }}>
              <Link to={`/users/${user.login}`} style={{ textDecoration: 'none', color: '#0066cc' }}>
                @{user.login}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

import { Routes, Route, Link } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { Counter } from './components/Counter';
import { GithubUserList } from './components/GithubUserList';
import { ShowGithubUser } from './components/ShowGithubUser';

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
        <Link to="/">Home</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/users">GitHub Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome name="Developer" />} />
        <Route path="/counter" element={<Counter />} />
      
        <Route path="/users" element={<GithubUserList />}>
          <Route index element={<p>Add a user and select them.</p>} /
          <Route path=":username" element={<ShowGithubUser />} />
        </Route>

        <Route path="*" element={
          <div style={{ padding: '20px', color: 'red' }}>
            <h3>404 - Page Not Found</h3>
            <p>The requested path does not exist.</p>
            <Link to="/">Return Home</Link>
          </div>
        } />
      </Routes>
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);