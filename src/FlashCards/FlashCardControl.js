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
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
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
                    <FlashCard card={currentCard} isFlipped={isFlipped} handleFlip={handleFlip} />
                    <div className="flashcard-control-buttons">
                        <button
                            className={"button-55"}
                            onClick={handlePrev} disabled={flashcards.length === 0}
                        >{"<"}</button>
                        <button
                            className={"button-55"}
                            onClick={handleNext} disabled={flashcards.length === 0}
                        >{">"}</button>
                    </div>
                </>
            )}
            {mode === "learning" && (
                <LearningMode flashcards={learningFlashcards} />
            )}
        </div>
    );
};

export default FlashCardControl;
