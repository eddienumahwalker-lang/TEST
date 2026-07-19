import React from 'react';
interface AgeProps {
    age?: number;
}

function Age({ age }: AgeProps) {
    return <p>Your age is {age}</p>;
}
interface WelcomeProps {
    name?: React.ReactNode; 
    age?: number;
}

function Welcome({ name = "Guest", age }: WelcomeProps) {
    return (
        <div>
            <p>Welcome, {name}!</p>
            
            <Age age={age} />
        </div>
    );
}

export default function App() {
    return (
        <div>
            <Welcome 
                name={<strong>Mario</strong>} 
                age={30} 
            />
        </div>
    );
}