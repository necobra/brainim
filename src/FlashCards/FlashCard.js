import React from 'react';
import './FlashCard.css';

const FlashCard = ({ card, isFlipped, handleFlip }) => {
    if (!card) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flashcard-container">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                <div className="flashcard-front">
                    {card.english}
                </div>
                <div className="flashcard-back">
                    {card.ukrainian}
                </div>
            </div>
        </div>
    );
};

export default FlashCard;
