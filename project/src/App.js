import React from "react";
import { useState } from "react";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RecipeItem from "./components/RecipeItem";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
	
    // using hook method to create a variable to store current theme (Light / Dark)
    const [mode, setMode] = useState('light');

    // handler to toggle between the themes
    const toggleMode = () => {
        if (mode === 'dark'){
            setMode('light');
        }
        else{
            setMode('dark');
        }
    }

    return (
        <Router className="App">
            {/* Each component which will be modified with the current theme will have an attribute named mode to which the current theme will be provided */}
            <Navbar toggleMode={toggleMode} mode={mode}/>
            {/* toggleMode is passed to the navbar because the switch to toggle between modes is created inside navbar */}
			
            <Routes>
                <Route path="/" element={<RecipeItem/>} />
                <Route path="/about-us" element={<AboutUs/>} />
            </Routes>
            
            <Footer/>
        </Router>
    );
}
