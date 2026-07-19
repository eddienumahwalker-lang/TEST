import { useEffect, useRef } from 'react';

export default function FocusableInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <label htmlFor="auto-focus-input">Auto-focused Input: </label>
      <input 
        ref={inputRef} 
        id="auto-focus-input" 
        type="text" 
        placeholder="I am focused automatically!" 
      />
    </div>
  );
}

import { useEffect, useRef } from 'react';

export default function StrictModeSafeLog() {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      console.log("Component mounted for the absolute first time!");
      isFirstMount.current = false; 
    }
  }, []);

  return <p>Check the console logs to see the strict mode mount shield.</p>;
}

import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  initialValue: number;
}

export default function Counter({ initialValue }: CounterProps) {
  const [counter, setCounter] = useState(initialValue);
  
  const prevValueRef = useRef<number>(initialValue);
  const directionRef = useRef<"up" | "down" | "stable">("stable");

  useEffect(() => {
    if (counter === initialValue) return;

    let currentDirection: "up" | "down" = "up";
    if (counter < prevValueRef.current) {
      currentDirection = "down";
    }

    if (directionRef.current !== currentDirection) {
      directionRef.current = currentDirection;
      console.log(`Direction changed to: ${directionRef.current}`);
    }

    prevValueRef.current = counter;
  }, [counter, initialValue]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Counter value: {counter}</h2>
      <button onClick={() => setCounter(prev => prev + 1)}>Increment</button>
      <button onClick={() => setCounter(prev => prev - 1)}>Decrement</button>
    </div>
  );
}