import { useState } from 'react';
interface CounterDisplayProps {
    count: number;
}

function CounterDisplay({ count }: CounterDisplayProps) {
    return <h2>Contatore: {count}</h2>;
}

interface CounterProps {
    initialValue: number;
    step: number;
}

export default function Counter({ initialValue, step }: CounterProps) {
    const [counter, setCounter] = useState<number>(initialValue);

    const handleIncrement = () => {
      
        setCounter((prevCounter) => prevCounter + step);
    };

    const handleDecrement = () => {
        setCounter((prevCounter) => prevCounter - step);
    };

    const handleReset = () => {
        setCounter(initialValue);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <CounterDisplay count={counter} />
            
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleIncrement}>Incrementa (+{step})</button>
                <button onClick={handleDecrement}>Decrementa (-{step})</button>
                <button onClick={handleReset}>Resetta</button>
            </div>
        </div>
    );
}