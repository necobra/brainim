// src/Keyboard.js
import React from 'react';
import './Keyboard.css';

const Keyboard = ({ currentKey, nextKey }) => {
    const keys = [
        '`1234567890-=',
        'qwertyuiop[]\\',
        'asdfghjkl;\'',
        'zxcvbnm,./'
    ];

    const renderKey = (key, keyIndex) => (
        <div
            key={keyIndex}
            className={`key ${nextKey === key ? 'highlight' : currentKey === key ? 'active' : ''}`}
        >
            {key}
        </div>
    );

    return (
        <div className="keyboard">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.split('').map(renderKey)}
                </div>
            ))}
            <div className="keyboard-row">
                <div className={`key space ${nextKey === ' ' ? 'highlight' : currentKey === ' ' ? 'active' : ''}`}>
                    Space
                </div>
            </div>
        </div>
    );
};

export default Keyboard;
