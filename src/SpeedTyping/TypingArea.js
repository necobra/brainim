// src/TypingArea.js
import React from 'react';
import './TypingArea.css';

const TypingArea = ({ targetText, currentIndex, incorrectIndex }) => {
    return (
        <div className="typing-area">
            {targetText.split('').map((char, index) => (
                <span key={index} className={incorrectIndex === index ? 'incorrect-char' : index === currentIndex ? 'current-char' : index < currentIndex ? 'typed-char' : ''}>
          {char}
        </span>
            ))}
        </div>
    );
};

export default TypingArea;
