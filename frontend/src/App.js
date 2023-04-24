import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Search from "./components/SearchComponents/Search";
import LoginPage from "./components/LoginPage";
import Alert from "./components/Alert";

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
            </Routes>

            <Footer />
        </Router>
    );
}
