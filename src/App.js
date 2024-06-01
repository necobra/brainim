import logo from './logo.svg';
import './App.css';
import SpeedTyping from "./SpeedTyping";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './FlashCards/MainPage';
import FlashCardControl from './FlashCards/FlashCardControl';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/set/:setName" element={<FlashCardControl/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
