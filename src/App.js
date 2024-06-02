import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Flashcards from './Layouts/FlashcardsLayout';
import SpeedTyping from './Layouts/SpeedTypingLayout';
import AboutUs from './Layouts/AboutUs';
import HomeLayout from "./Layouts/HomeLayout";
import Footer from "./Components/Footer";
import FlashCardControl from "./FlashCards/FlashCardControl";
import UserProfile from "./Components/UserProfile";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomeLayout />} />
                    <Route path="/flashcards" element={<Flashcards />} />
                    <Route path="/flashcards/set/:setName" element={<FlashCardControl/>} />
                    <Route path="/speedtyping" element={<SpeedTyping />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/user" element={<UserProfile/>} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
