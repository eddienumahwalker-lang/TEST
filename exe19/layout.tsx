import { useState, useEffect } from 'react';

interface GitHubUserData {
  name: string;
  login: string;
  avatar_url: string;
}

interface GithubUserProps {
  username: string;
}

export function GithubUser({ username }: GithubUserProps) {
  const [user, setUser] = useState<GitHubUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found or API limit reached');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setUser(null);
      });
  }, [username]); 

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!user) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '15px', backgroundColor: '#fafafa' }}>
      <img 
        src={user.avatar_url} 
        alt={`${user.login}'s avatar`} 
        style={{ width: '60px', height: '60px', borderRadius: '50%' }} 
      />
      <div>
        <h3 style={{ margin: '0 0 5px 0' }}>{user.name || 'No public name'}</h3>
        <p style={{ margin: 0, color: '#555' }}>@{user.login}</p>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { GithubUser } from './GithubUser';

interface GitHubUserListItem {
  id: number;
  login: string;
}

export default function GithubUsers() {
  const [users, setUsers] = useState<GitHubUserListItem[]>([]);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch users list');
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); 

  if (loading) return <p>Loading users list...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>GitHub Directory Explorer</h2>
      <p>Click a username below to see details:</p>
  
      <ul style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', listStyleType: 'none', borderRadius: '6px' }}>
        {users.map((user) => (
          <li key={user.id} style={{ padding: '6px 0' }}>
            <button 
              onClick={() => setSelectedUsername(user.login)}
              style={{ background: 'none', border: 'none', color: '#0066cc', textDecoration: 'underline', cursor: 'pointer', fontSize: '16px' }}
            >
              {user.login}
            </button>
          </li>
        ))}
      </ul>

      {selectedUsername && (
        <div>
          <h4 style={{ marginBottom: '5px', marginTop: '20px' }}>Selected Profile:</h4>
          <GithubUser username={selectedUsername} />
        </div>
      )}
    </div>
  );
}