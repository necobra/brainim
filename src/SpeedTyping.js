import React, { useState, useEffect, useRef } from 'react';
import './SpeedTesting.css';

const SpeedTesting = () => {
    const [text, setText] = useState("Цей текст використовується для перевірки швидкості друкування. Наберіть його якнайшвидше.");
    const [inputText, setInputText] = useState("");
    const [timeLeft, setTimeLeft] = useState(60); // Тривалість тесту у секундах
    const [isRunning, setIsRunning] = useState(false);
    const [wordsPerMinute, setWordsPerMinute] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            calculateWPM();
        }
    }, [isRunning, timeLeft]);

    const startTest = () => {
        setIsRunning(true);
        setTimeLeft(60);
        setInputText("");
        setWordsPerMinute(0);
        inputRef.current.focus();
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const calculateWPM = () => {
        const wordsTyped = inputText.trim().split(" ").length;
        setWordsPerMinute(wordsTyped);
    };

    const renderText = () => {
        return text.split('').map((char, index) => {
            let color;
            if (index < inputText.length) {
                color = char === inputText[index] ? 'green' : 'red';
            } else {
                color = 'grey';
            }
            return <span key={index} style={{ color: color }}>{char}</span>;
        });
    };

    return (
        <div className="speed-testing-container">
            <h1>Тренажер швидкості друкування</h1>
            <div className="text-typing">
                <p className="test-text">{renderText()}</p>
                <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={handleInputChange}
                    className="input-area"
                />
            </div>
            <div className="controls">
                <button onClick={startTest} className="start-button">Почати тест</button>
                <p className="timer">Час: {timeLeft}s</p>
                <p className="wpm">Швидкість: {wordsPerMinute} слів/хв</p>
            </div>
        </div>
    );
};

export default SpeedTesting;
