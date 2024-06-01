import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Flashcards from './Layouts/FlashcardsLayout';
import SpeedTyping from './Layouts/SpeedTypingLayout';
import AboutUs from './Layouts/AboutUsLayout';
import HomeLayout from "./Layouts/HomeLayout";
import Footer from "./Components/Footer";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomeLayout />} />
                    <Route path="/flashcards" element={<Flashcards />} />
                    <Route path="/speedtyping" element={<SpeedTyping />} />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
