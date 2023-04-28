import React, { useState } from "react";
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
import ForgotPass from "./components/loginComponents/ForgotPass";
import ResetPass from "./components/loginComponents/ResetPass";
import Payment from "./components/dashboardComponents/Payment";
import MultiSearch from "./components/SearchComponents/MultipleSearch";
import Spinner from "./components/Spinner";

import spinnerContext from "./context/spinner/spinnerContext";

export default function App() {

    const { loading } = useState(spinnerContext);

    return (
        <Router className="App">
            <Navbar />
            <Alert />
            {loading && <Spinner />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/uploadrecipe" element={<UploadRecipe />} />
                <Route path="/forgotpass" element={<ForgotPass />} />
                <Route path="/resetpass" element={<ResetPass />} />
                <Route path="payment" element={<Payment />} />
                {/* passing the id "recipeId" of the recipe to be displayed as url parameter */}
                <Route path="/recipe/:recipeId" element={<RecipePage />} />
                <Route path="/multisearch" element={<MultiSearch />} />
            </Routes>

            <Footer />
        </Router>
    );
}