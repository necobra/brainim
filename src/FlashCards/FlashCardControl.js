import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FlashCard from './FlashCard';
import LearningMode from './LearningMode';
import './FlashCardControl.css';
import flashcardSetsDataJson from "./flashcardSets.json";

const FlashCardControl = () => {
    const { setName } = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [learningFlashcards, setLearningFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [mode, setMode] = useState('cards'); // Default mode
    const [swipeDirection, setSwipeDirection] = useState(''); // Add swipe direction state

    const [visualCurrentCardIndex, setVisualCurrentCardIndex] = useState(0);

    let flashcardSetsData = JSON.parse(localStorage.getItem('flashcardSets'));
    if (flashcardSetsData === null) {
        localStorage.setItem('flashcardSets', JSON.stringify(flashcardSetsDataJson));
        flashcardSetsData = flashcardSetsDataJson;
    }

    useEffect(() => {
        const set = flashcardSetsData.sets.find(set => set.name === setName);
        if (set) {
            setFlashcards(set.cards);
        }
        const lastVisitedSet = localStorage.getItem('lastVisitedSet');
        const preLastVisitedSet = localStorage.getItem('preLastVisitedSet');
        localStorage.setItem('lastVisitedSet', JSON.stringify(set));
        localStorage.setItem('preLastVisitedSet', lastVisitedSet);
        localStorage.setItem('prePreLastVisitedSet', preLastVisitedSet);
        console.log(set);
        console.log(localStorage);
        console.log(localStorage.getItem('lastVisitedSet'));
    }, [setName]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setSwipeDirection('left');
        setIsFlipped(false);
        setVisualCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setTimeout(() => {
            setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
            setSwipeDirection('');
        }, 300); // Duration of the swipe animation
    };

    const handlePrev = () => {
        setSwipeDirection('right');
        setVisualCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setTimeout(() => {
            setIsFlipped(false);
            setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
            setSwipeDirection('');
        }, 300); // Duration of the swipe animation
    };

    const handleModeChange = (newMode) => {

        if (newMode === 'learning') {
            const shuffleArray = array => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            const filteredCards = flashcards.filter(card => card.score < 100);
            const shuffledFilteredCards = shuffleArray(filteredCards).slice(0, 7);
            setLearningFlashcards(shuffledFilteredCards);
        }
        setMode(newMode);
    };

    const currentCard = flashcards[currentCardIndex];

    return (
        <div className="flashcard-control-container">
            <div className="mode-buttons">
                <button onClick={() => handleModeChange('cards')}>Cards</button>
                <button onClick={() => handleModeChange('learning')}>Learning</button>
            </div>
            {mode === 'cards' && (
                <>
                    <div className={`flashcard-wrapper ${swipeDirection}`}>
                        <FlashCard card={currentCard} isFlipped={isFlipped} handleFlip={handleFlip} />
                    </div>
                    <div className="flashcard-control-buttons">
                        <button onClick={handlePrev} disabled={flashcards.length === 0} className="button-55"><span>Prev</span></button>
                        <div className="current-index-card">
                            {visualCurrentCardIndex + 1}/{flashcards.length}
                        </div>
                        <button onClick={handleNext} disabled={flashcards.length === 0} className="button-55"><span>Next</span></button>
                    </div>
                </>
            )}
            {mode === 'learning' && (
                <LearningMode flashcards={learningFlashcards} onRestart={handleModeChange}/>
            )}
        </div>
    );
};

export default FlashCardControl;
