import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Search from "./components/SearchComponents/Search";
import LoginPage from "./components/LoginPage";
import Alert from "./components/Alert";
import RecipePage from "./components/RecipePage";
import UploadRecipe from "./components/dashboardComponents/UploadRecipe";

export default function App() {

    return (
        <Router className="App">
            <Navbar />
            <Alert />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/uploadrecipe" element={<UploadRecipe />} />

                {/* passing the id "recipeId" of the recipe to be displayed as url parameter */}
                <Route path="/recipe/:recipeId" element={<RecipePage />} />
            </Routes>

            <Footer />
        </Router>
    );
}
