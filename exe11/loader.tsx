import { useState } from 'react';

export default function TodoList() {
  const [items, setItems] = useState<string[]>([]);
  
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddItem = () => {
    if (!inputValue.trim()) return;

    setItems((prevItems) => [...prevItems, inputValue]);
    
    setInputValue('');
  };

  const handleResetList = () => {
    setItems([]);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    setItems((prevItems) => 
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>My To-Do List</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAddItem} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Add Task
        </button>
      </div>

      <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
        {items.map((item, index) => (

          <li key={index} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{item}</span>
            <button 
              onClick={() => handleRemoveItem(index)}
              style={{ padding: '2px 6px', color: 'red', border: '1px solid red', backgroundColor: 'transparent', borderRadius: '4px', cursor: 'pointer' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <button 
          onClick={handleResetList}
          style={{ width: '100%', padding: '8px', color: '#fff', backgroundColor: '#dc3545', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reset Whole List
        </button>
      )}
    </div>
  );
}