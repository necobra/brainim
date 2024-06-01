import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import flashcardsData from './flashcards.json';
import './FlashCardControl.css'; // Ensure to create this CSS file for styling

const FlashCardControl = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setFlashcards(flashcardsData);
    }, []);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const currentCard = flashcards[currentCardIndex];

    return (
        <div className="flashcard-control-container">
            <FlashCard card={currentCard} isFlipped={isFlipped} handleFlip={handleFlip} />
            <div className="flashcard-control-buttons">
                <button onClick={handlePrev} disabled={flashcards.length === 0}>Previous</button>
                <button onClick={handleNext} disabled={flashcards.length === 0}>Next</button>
            </div>
        </div>
    );
};

export default FlashCardControl;