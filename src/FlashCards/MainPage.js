import React from 'react';
import { Link } from 'react-router-dom';
import flashcardSetsDataJson from './flashcardSets.json';
import './MainPage.css';
import Card from "./Components/Card"; // Ensure to create this CSS file for styling

const MainPage = () => {
    let flashcardSetsData = JSON.parse(localStorage.getItem('flashcardSets'));
    if (flashcardSetsData === null) {
        localStorage.setItem('flashcardSets', JSON.stringify(flashcardSetsDataJson));
        flashcardSetsData = flashcardSetsDataJson;
    }
    return (
        <div className="main-page-container">
            <h1>Flashcard Sets</h1>
            <div className="flashcard-sets-list">
                {flashcardSetsData.sets.map((set, index) => (
                    <Link key={index} to={`/flashcards/set/${set.name}`} className="flashcard-set-item">
                        <Card title={set.name} length={set.cards.length} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
