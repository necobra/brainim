import React from 'react';
import { Link } from 'react-router-dom';
import flashcardSetsData from './flashcardSets.json';
import './MainPage.css'; // Ensure to create this CSS file for styling

const MainPage = () => {
    return (
        <div className="main-page-container">
            <h1>Flashcard Sets</h1>
            <div className="flashcard-sets-list">
                {flashcardSetsData.sets.map((set, index) => (
                    <Link key={index} to={`/set/${set.name}`} className="flashcard-set-item">
                        {set.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
