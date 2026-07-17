function Message() {
    return <p>What a beautiful day!</p>;
}

function Hello() {
    return (
        <div>
            <h2>Hello, World!</h2>
            {/* Render the Message component inside Hello */}
            <Message />
        </div>
    );
}

export default function App() {
    return (
        <div>
            <Hello />
        </div>
    );
}