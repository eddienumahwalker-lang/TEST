import React from 'react';

interface AgeProps {
    age?: number;
}

function Age({ age }: AgeProps) {
    return <p>Your age is {age}</p>;
}
interface MessageProps {
    age?: number;
}

function Message({ age }: MessageProps) {
    return (
        <div>
            {age && age > 18 ? (
                <p>Your age is {age}</p>
            ) : (
                <p>You are very young!</p>
            )}
        </div>
    );
}

interface WelcomeProps {
    name: string;
    age?: number;
}

export default function Welcome({ name, age }: WelcomeProps) {
    return (
        <div>
            <p>Welcome, {name}!</p>
            
            <hr />

            <h3>Condizione 1 (Maggiore di 18):</h3>
            {age && age > 18 && <Age age={age} />}

            <h3>Condizione 2 (Se presente):</h3>
            {age !== undefined && <Age age={age} />}

            <h3>Condizione 3 (Compreso tra 18 e 65):</h3>
            {age && age > 18 && age < 65 && <Age age={age} />}

            <h3>Condizione 4 (Maggiore di 18 e nome John):</h3>
            {age && age > 18 && name === "John" && <Age age={age} />}

            <h3>Componente Message (If/Else):</h3>
            <Message age={age} />
        </div>
    );
}