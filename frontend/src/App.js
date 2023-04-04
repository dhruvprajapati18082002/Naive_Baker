import React from "react";
import { useState } from "react";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RecipeItem from "./components/RecipeItem";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

import Search from "./components/Search";
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
                <Route path="/" element={
                    <RecipeItem 
                        header="Daily Specials"
                        title="Recipe Title"
                        text="This is how you make the item step by step for an awesome experience."
                        btnText="see recipe in detail"
                        footer="Note the recipe shown here is selected at random"
                    />
                } />
                <Route path="/about-us" element={<AboutUs/>} />
                <Route path="/login" element={<Login page={true}/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/Search" element={<Search/>}/>
                </Routes>
            
            <Footer/>
        </Router>
    );
}
