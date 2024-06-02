import React from 'react';
import './TypingArea.css';

const TypingArea = ({ targetText, currentIndex, incorrectIndex }) => {
    return (
        <div className="typing-area">
            {targetText.split('').map((char, index) => (
                <span
                    key={index}
                    className={
                    index === incorrectIndex
                        ? 'incorrect-char'
                        : index === currentIndex
                            ? 'current-char'
                            : index < currentIndex && incorrectIndex === index
                                ? 'incorrect-char'
                                : ''
                    }
                >
                    {char}
                </span>
            ))}
        </div>
    );
};

export default TypingArea;
