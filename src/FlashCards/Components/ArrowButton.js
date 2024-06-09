import React from 'react';
import './ArrowButton.css';

const ArrowButton = ({ direction, onClick }) => {
    return (
        <button className={`arrow-button ${direction}`} onClick={onClick}>
            {direction === 'left' ? '←' : '→'}
        </button>
    );
};

export default ArrowButton;
