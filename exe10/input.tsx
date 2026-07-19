import React from 'react';
interface ColorProps {
  color: {
    id: number | string;
    name: string;
  };
}

function Color({ color }: ColorProps) {
  return <li>{color.name}</li>;
}

interface ColorsProps 
  items: {
    id: number | string;
    name: string;
  }[];
}

export default function Colors({ items }: ColorsProps) {
  return (
    <ul>
      {items.map((item) => (
        
        <Color key={item.id} color={item} />
      ))}
    </ul>
  );
}

import Colors from './Colors';

export default function App() {
  const colorData = [
    { id: 'c1', name: 'Crimson Red' },
    { id: 'c2', name: 'Ocean Blue' },
    { id: 'c3', name: 'Forest Green' },
    { id: 'c4', name: 'Amber Gold' }
  ];

  return (
    <div style={{ padding: '25px' }}>
      <h3>My Favorite Colors</h3>
      <Colors items={colorData} />
    </div>
  );
}