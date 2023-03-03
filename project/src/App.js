import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import RecipeItem from "./components/RecipeItem";

export default function App() {
	const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light'){
            setMode('dark');
        }
        else{
            setMode('light');
        }
    }

    return (
        <div className="App">
            <Navbar toggleMode={toggleMode} mode={mode}/>
			<RecipeItem/>
        </div>
    );
}
