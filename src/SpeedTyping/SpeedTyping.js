import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';
import TypingArea from './TypingArea';
import './SpeedTyping.css';
import speedTypingSetsData from './speedTypingSets.json';

const SpeedTyping = () => {
    const [userInput, setUserInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [currentKey, setCurrentKey] = useState('');
    const [incorrectIndex, setIncorrectIndex] = useState(-1);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [errors, setErrors] = useState(0);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const targetTexts = speedTypingSetsData.texts;

    const keys = [
        '!qwertyuiop',
        'asdfghjkl',
        'zxcvbnm,.'
    ];

    const targetText = targetTexts[currentTextIndex];

    const handleKeyPress = (e) => {
        if (isEnd) return;

        const key = e.key;

        if (e.keyCode !== 32 && !keys.some((row) => row.includes(key.toLowerCase()))) {
            return;
        }

        if (e.keyCode === 32) {
            e.preventDefault();
        }

        setCurrentKey(key);

        if (!startTime) {
            setStartTime(new Date());
        }

        if (key === targetText[currentIndex]) {
            setUserInput((prev) => prev + key);
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setIncorrectIndex(-1);
        } else {
            setIncorrectIndex(currentIndex);
            setErrors((prevErrors) => prevErrors + 1);
        }

        if (currentIndex + 1 === targetText.length) {
            setEndTime(new Date());
            setIsEnd(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.getModifierState('CapsLock')) {
            setIsCapsLockOn(true);
        } else {
            setIsCapsLockOn(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, [currentIndex, currentTextIndex]);

    useEffect(() => {
        if (endTime) {
            saveResultToLocalStorage();
        }
    }, [endTime]);

    useEffect(() => {
        setCurrentTextIndex(Math.floor(Math.random() * (targetTexts.length - 1)));
    },[]);

    const getWPM = () => {
        if (!endTime || !startTime) return 0;
        const timeDiff = (endTime - startTime) / 1000 / 60;

        const wordCount = targetText.split(' ').length;

        return Math.round(wordCount / timeDiff);
    };

    const saveResultToLocalStorage = () => {
        const date = new Date().toISOString().split('T')[0];
        const wpm = getWPM();
        const newResult = {
            date,
            errors,
            wpm,
        };

        const savedResults = JSON.parse(localStorage.getItem('speedTypingResults')) || [];
        savedResults.push(newResult);
        localStorage.setItem('speedTypingResults', JSON.stringify(savedResults));
    };

    const handleNextText = () => {
        setUserInput('');
        setCurrentIndex(0);
        setCurrentKey('');
        setIncorrectIndex(-1);
        setStartTime(null);
        setEndTime(null);
        setErrors(0);
        setIsEnd(false);
        setCurrentTextIndex(Math.floor(Math.random() * (targetTexts.length - 1)));
    };

    return (
        <div className="speed-typing">
            <h1>Speed Typing Trainer</h1>
            {isCapsLockOn && (
                <div className="caps-lock-warning">
                    <p>Caps Lock is on!</p>
                </div>
            )}
            <TypingArea targetText={targetText} currentIndex={currentIndex} incorrectIndex={incorrectIndex} />
            <Keyboard currentKey={currentKey} nextKey={targetText[currentIndex]} />
            {endTime && (
                <div className="stats">
                    <h2>Typing Stats</h2>
                    <p>Words per minute: {getWPM()}</p>
                    <p>Errors: {errors}</p>
                    <button onClick={handleNextText}>Next Text</button>
                </div>
            )}
            <div className="tips">
                <h2>Typing Tips</h2>
                <ul>
                    <li>Familiarize yourself with the keyboard layout.</li>
                    <li>Start slow, then gradually increase your speed.</li>
                    <li>Practice regularly to build muscle memory.</li>
                    <li>Focus on accuracy before speed.</li>
                    <li>✨ <b>Have fun</b> ✨</li>
                </ul>
            </div>
        </div>
    );
};

export default SpeedTyping;
