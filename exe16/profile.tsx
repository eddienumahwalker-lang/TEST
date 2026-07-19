import { 
  configureStore, 
  createSlice, 
  createAsyncThunk, 
  PayloadAction, 
  Middleware,
  combineReducers
} from '@reduxjs/toolkit';

export interface GitHubUser {
  id: number;
  name: string;
  login: string;
  avatar_url?: string;
}

export const fetchUser = createAsyncThunk<
  GitHubUser, 
  string, 
  { rejectValue: string }
>(
  'users/fetchUser',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User profile not found or API limits exceeded');
      }
      const data = await response.json();
      return {
        id: data.id,
        name: data.name || 'No public name',
        login: data.login
      };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network Fetch Failed');
    }
  }
);

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    reset: (state) => { state.value = 0; }
  }
});

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: crypto.randomUUID(), title: action.payload, completed: false });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    }
  }
});
interface UsersState {
  list: GitHubUser[];
  loading: boolean;
  error: string | null;
}

const initialUsersState: UsersState = {
  list: [],
  loading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {
    removeUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<GitHubUser>) => {
        state.loading = false;
        if (!state.list.some(u => u.id === action.payload.id)) {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to capture user profile info';
      });
  }
});

export const { increment, decrement, reset } = counterSlice.actions;
export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export const { removeUser } = usersSlice.actions;

const loggingMiddleware: Middleware = (storeApi) => (next) => (action) => {
  console.group(`[Redux Action Action]: ${(action as any).type}`);
  console.log('%c Previous State:', 'color: #9E9E9E; font-weight: bold;', storeApi.getState());
  console.log('%c Payload/Action Config:', 'color: #03A9F4; font-weight: bold;', action);
  const result = next(action);
  console.log('%c Next Dynamic State:', 'color: #4CAF50; font-weight: bold;', storeApi.getState());
  console.groupEnd();
  return result;
};

const delayMiddleware: Middleware = () => (next) => (action: any) => {
  if (action.meta?.delay) {
    const timeoutId = setTimeout(() => next(action), action.meta.delay);
    return () => clearTimeout(timeoutId);
  }
  return 
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  todos: todosSlice.rcer,
  users: usersSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggingMiddleware, delayMiddleware)
});
store.subscribe(() => {
  console.log('[Global Broadcast Change Check System Notify Loop]: State changed.');
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useSelector, useDispatch } from 'react-redux';
import { RootState, increment, decrement, reset } from './store';

export default function ReduxCounter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Redux Counter Value: <span style={{ color: '#0066cc' }}>{count}</span></h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, fetchUser, removeUser } from './store';

export default function ReduxGithubUsers() {
  const [usernameInput, setUsernameInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  
  const { list: usersList, loading, error } = useSelector((state: RootState) => state.users);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      dispatch(fetchUser(usernameInput.trim()));
      setUsernameInput('');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '450px' }}>
      <h3>GitHub User Directory via Thunk Actions</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          type="text" 
          placeholder="Enter GitHub handle (e.g., gaearon)" 
          value={usernameInput} 
          onChange={(e) => setUsernameInput(e.target.value)}
          style={{ flex: 1, padding: '6px' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p style={{ color: '#666' }}>Fetching Profile Metadata...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error Encountered: {error}</p>}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {usersList.map((user) => (
          <li 
            key={user.id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '8px', 
              backgroundColor: '#f9f9f9', 
              border: '1px solid #eee', 
              marginBottom: '6px',
              borderRadius: '4px'
            }}
          >
            <div>
              <strong>{user.name}</strong> <span style={{ color: '#555' }}>(@{user.login})</span>
            </div>
            <button 
              onClick={() => dispatch(removeUser(user.id))}
              style={{ padding: '2px 6px', color: 'red', border: '1px solid red', background: 'none', cursor: 'pointer' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import ReduxCounter from './ReduxCounter';
import ReduxGithubUsers from './ReduxGithubUsers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
        <h1>Redux State Integration Dashboard</h1>
        <ReduxCounter />
        <ReduxGithubUsers />
      </div>
    </Provider>
  </React.StrictMode>
);

