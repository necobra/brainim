import React, { useState, useEffect } from 'react';
import './LearningMode.css';

const LearningMode = ({ flashcards }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [problemCards, setProblemCards] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showContinuePrompt, setShowContinuePrompt] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [attempts, setAttempts] = useState({});
    const [isEndScreen, setIsEndScreen] = useState(false);
    const [wrongAnswerIndex, setWrongAnswerIndex] = useState(null); // Track wrong answer index

    const flashcardAmount = flashcards.length;

    useEffect(() => {
        if (flashcards.length > 0) {
            loadNextCard();
        }
    }, [flashcards]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (showContinuePrompt) {
                setShowContinuePrompt(false);
                if (problemCards.length > 0) {
                    loadNextCard();
                } else if (correctAnswersCount < flashcards.length) {
                    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
                    loadNextCard();
                } else {
                    updateScores();
                    setIsEndScreen(true);
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [showContinuePrompt, correctAnswersCount, flashcards.length, problemCards.length]);

    const loadNextCard = () => {
        let card;
        card = flashcards[0];

        loadAnswers(card);
    };


    const loadAnswers = (card) => {
        const incorrectAnswers = flashcards.filter(f => f.ukrainian !== card.ukrainian).slice(0, 3);
        const shuffledAnswers = [...incorrectAnswers, card].sort(() => 0.5 - Math.random());
        setAnswers(shuffledAnswers);
        setShowAnswer(false);
        setSelectedAnswer(null);
    }

    const handleAnswerSelection = (answer, index) => {
        setSelectedAnswer(answer);
        setShowAnswer(true);
        if (answer.ukrainian !== flashcards[currentCardIndex].ukrainian) {
            setWrongAnswerIndex(index);
        } else {
            setWrongAnswerIndex(null);
            setCorrectAnswersCount(correctAnswersCount + 1);
        }

        setTimeout(() => {
            const currentCard = flashcards[currentCardIndex];
            if (!attempts[currentCard.english]) {
                attempts[currentCard.english] = 0;
            }
            if (answer.ukrainian !== currentCard.ukrainian) {
                attempts[currentCard.english]++;
                if (!problemCards.includes(currentCard)) {
                    setProblemCards([...problemCards, currentCard]);
                }
                flashcards = [...flashcards, currentCard];
                setShowContinuePrompt(true);
            } else {
                setProblemCards(problemCards.filter(card => card.ukrainian !== currentCard.ukrainian));
                setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
                loadNextCard(correctAnswersCount + 1);
            }
            setAttempts({ ...attempts });
        }, 1000);
    };

    const updateScores = () => {
        flashcards.forEach(card => {
            const mistakes = attempts[card.english] || 0;
            if (mistakes === 0) {
                card.score = card.score === -1 ? 100 : Math.min(card.score + 20, 100);
            } else if (mistakes === 1) {
                card.score = card.score === -1 ? 60 : Math.min(card.score + 10, 90);
            } else if (mistakes === 2) {
                card.score = card.score === -1 ? 20 : Math.min(card.score, 100);
            } else {
                card.score = card.score === -1 ? 0 : Math.max(card.score - 10, 0);
            }
        });
        saveScores(flashcards);
    };

    const saveScores = (updatedFlashcards) => {
        // Simulate saving scores using localStorage
        localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
    };

    const restartSession = () => {
        setCurrentCardIndex(0);
        setProblemCards([]);
        setAnswers([]);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setShowContinuePrompt(false);
        setCorrectAnswersCount(0);
        setIsEndScreen(false);
        setAttempts({});
        loadNextCard();
    };

    const getProgressBarColor = (score) => {
        if (score >= 80) return '#4caf50'; // Green
        if (score >= 50) return '#ffeb3b'; // Yellow
        return '#f44336'; // Red
    };

    if (flashcards.length < 4) {
        return (
            <div className="end-screen">
                <h2>No more cards to learn. Excellent work!</h2>
            </div>
        )
    }

    if (isEndScreen) {
        return (
            <div className="end-screen">
                <h2>Productive session!</h2>
                <button className="button-55" onClick={restartSession}>Restart Session</button>
                <ul>
                    {flashcards.map((card, index) => (
                        <li key={index} className="end-screen-card">
                            <div className="word-pair">
                                <div>
                                    <strong>English:</strong> {card.english} <br />
                                </div>
                                <div>
                                    <strong>Ukrainian:</strong> {card.ukrainian}
                                </div>
                            </div>
                            Progress of learning this card:
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${card.score}%`,
                                        backgroundColor: getProgressBarColor(card.score),
                                    }}
                                ></div>
                            </div>
                        </li>
                    ))}
                    {problemCards.map((card, index) => (
                        <li key={`problem-${index}`} className="end-screen-card problem-card">
                            <div className="word-pair">
                                <div>
                                    <strong>English:</strong> {card.english} <br />
                                </div>
                                <div>
                                    <strong>Ukrainian:</strong> {card.ukrainian}
                                </div>
                            </div>
                            Progress of learning this card:
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${card.score}%`,
                                        backgroundColor: getProgressBarColor(card.score),
                                    }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    const currentCard = problemCards.length > 0 ? problemCards[0] : flashcards[currentCardIndex];

    return (
        <div className="learning-mode-container">
            <div className="answer-count">
                {correctAnswersCount}/{flashcardAmount}
            </div>
            <div className="question">{currentCard.english}</div>
            <div className="answers">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        className={`button-13 answer-button ${showAnswer && answer.ukrainian === currentCard.ukrainian ? 'correct' : ''} ${showAnswer && selectedAnswer && index === wrongAnswerIndex ? 'wrong' : ''}`}
                        onClick={() => handleAnswerSelection(answer, index)}
                        disabled={showAnswer}
                    >
                        {answer.ukrainian}
                    </button>
                ))}
            </div>
            {showContinuePrompt && (
                <div className="continue-prompt">
                    Press any key on the keyboard to continue
                </div>
            )}
        </div>
    );
};

export default LearningMode;
