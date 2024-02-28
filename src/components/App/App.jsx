import { useState } from "react";
import "./App.css";
import Picture from "../Picture/Picture";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <Picture />
        </>
    );
}

export default App;
