import { useState, useEffect } from 'react';

function CounterDisplay({ count }: { count: number }) {
    return <h2>Counter: {count}</h2>;
}

interface CounterProps {
    initialValue: number;
    step: number;
}

export default function Counter({ initialValue, step }: CounterProps) {
    const [counter, setCounter] = useState<number>(initialValue);

    useEffect(() => {
        console.log(`The current counter value is: ${counter}`);
    }, [counter]); 

    return (
        <div>
            <CounterDisplay count={counter} />
            <button onClick={() => setCounter(prev => prev + step)}>Increment (+{step})</button>
            <button onClick={() => setCounter(prev => prev - step)}>Decrement (-{step})</button>
            <button onClick={() => setCounter(initialValue)}>Reset</button>
        </div>
    );
}

import { useState, useEffect } from 'react';

export default function Clock() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []); 

    return (
        <div style={{ padding: '10px', marginTop: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
            <h2>Current Time: {time.toLocaleTimeString()}</h2>
        </div>
    );
}

import Counter from './Counter';
import Clock from './Clock';

export default function App() {
    return (
        <div style={{ padding: '20px' }}>
            <Counter initialValue={0} step={1} />
            <hr />
            <Clock />
        </div>
    );
}