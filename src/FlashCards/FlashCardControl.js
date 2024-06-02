import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FlashCard from './FlashCard';
import LearningMode from './LearningMode';
import flashcardSetsData from './flashcardSets.json';
import './FlashCardControl.css';

const FlashCardControl = () => {
    const { setName } = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [learningFlashcards, setLearningFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [mode, setMode] = useState('cards'); // Default mode
    const [swipeDirection, setSwipeDirection] = useState(''); // Add swipe direction state

    useEffect(() => {
        const set = flashcardSetsData.sets.find(set => set.name === setName);
        if (set) {
            setFlashcards(set.cards);
        }
    }, [setName]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setSwipeDirection('left');
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
            setSwipeDirection('');
        }, 300); // Duration of the swipe animation
    };

    const handlePrev = () => {
        setSwipeDirection('right');
        setTimeout(() => {
            setIsFlipped(false);
            setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
            setSwipeDirection('');
        }, 300); // Duration of the swipe animation
    };

    const handleModeChange = (newMode) => {
        if (newMode === 'learning') {
            const filteredCards = flashcards.filter(card => card.score < 100).slice(0, 7);
            setLearningFlashcards(filteredCards);
        }
        setMode(newMode);
    };

    const currentCard = flashcards[currentCardIndex];

    return (
        <div className="flashcard-control-container">
            <div className="mode-buttons">
                <button onClick={() => handleModeChange('cards')}>Cards</button>
                <button onClick={() => handleModeChange('learning')}>Learning</button>
                <button onClick={() => handleModeChange('selection')}>Selection</button>
            </div>
            {mode === 'cards' && (
                <>
                    <div className={`flashcard-wrapper ${swipeDirection}`}>
                        <FlashCard card={currentCard} isFlipped={isFlipped} handleFlip={handleFlip} />
                    </div>
                    <div className="flashcard-control-buttons">
                        <button onClick={handlePrev} disabled={flashcards.length === 0} className="button-55">Prev</button>
                        <button onClick={handleNext} disabled={flashcards.length === 0} className="button-55">Next</button>
                    </div>
                </>
            )}
            {mode === 'learning' && (
                <LearningMode flashcards={learningFlashcards} />
            )}
        </div>
    );
};

export default FlashCardControl;
