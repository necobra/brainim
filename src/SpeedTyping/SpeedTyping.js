// SpeedTyping.js

import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';
import TypingArea from './TypingArea';
import './SpeedTyping.css';

const targetText = "Type this text as quickly as you can!";

const SpeedTyping = () => {
    const [userInput, setUserInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentKey, setCurrentKey] = useState('');
    const [incorrectIndex, setIncorrectIndex] = useState(-1);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [errors, setErrors] = useState(0);

    const handleKeyPress = (e) => {
        const key = e.key;
        setCurrentKey(key);

        if (!startTime) {
            setStartTime(new Date());
        }

        if (key === targetText[currentIndex]) {
            setUserInput((prev) => prev + key);
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setIncorrectIndex(-1); // Reset incorrect index
        } else {
            setIncorrectIndex(currentIndex); // Mark incorrect index
            setErrors((prevErrors) => prevErrors + 1);
        }

        if (currentIndex + 1 === targetText.length) {
            setEndTime(new Date());
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [currentIndex]);

    const getWPM = () => {
        if (!endTime || !startTime) return 0;
        const timeDiff = (endTime - startTime) / 1000 / 60; // in minutes
        const wordCount = targetText.split(' ').length;
        return Math.round(wordCount / timeDiff);
    };

    return (
        <div className="speed-typing">
            <TypingArea targetText={targetText} currentIndex={currentIndex} incorrectIndex={incorrectIndex} />
            <Keyboard currentKey={currentKey} nextKey={targetText[currentIndex]} />
            {endTime && (
                <div className="stats">
                    <h2>Typing Stats</h2>
                    <p>Words per minute: {getWPM()}</p>
                    <p>Errors: {errors}</p>
                </div>
            )}
        </div>
    );
};

export default SpeedTyping;
