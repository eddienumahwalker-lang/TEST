import React from 'react';

export default function MouseClicker() {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => 
    
    console.log("Button name clicked:", event.currentTarget.name);
  };

  return (
    <button name="one" onClick={handleButtonClick}>
      <img 
        src="https://via.placeholder.com/50" 
        alt="Click me" 
      />
      Click Me!
    </button>
  );
}

import React from 'react';

export default function MouseClickerWithStop() {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button name:", event.currentTarget.name);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log("Image src:", event.currentTarget.src);
    
    event.stopPropagation();
  };

  return (
    <button name="one" onClick={handleButtonClick}>
      <img 
        src="https://via.placeholder.com/50" 
        alt="Click me" 
        onClick={handleImageClick}
      />
      Click Me!
    </button>
  );
}

import React from 'react';

export default function MultiButton() {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked button name:", event.currentTarget.name);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <button name="one" onClick={handleButtonClick}>Button One</button>
      <button name="two" onClick={handleButtonClick}>Button Two</button>
      <button name="three" onClick={handleButtonClick}>Button Three</button>
    </div>
  );
}