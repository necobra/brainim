import React, {useState, useEffect, useRef} from 'react';
import './LearningMode.css';
import flashCard from "./FlashCard";
import './Components/QuestionCard.css';

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
    const audioRef = useRef(null);

    const flashcardAmount = flashcards.length;
    const currentCard = currentCardIndex < flashcards.length ? flashcards[currentCardIndex] : problemCards[0];
    const hasLoaded = useRef(false);


    useEffect(() => {
        if (flashcards.length > 0 && !hasLoaded.current) {
            loadNextCard();
            hasLoaded.current = true;
        }
    }, [flashcards]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (showContinuePrompt) {
                setShowContinuePrompt(false);
                if (correctAnswersCount < flashcards.length) {
                    loadNextCard(correctAnswersCount);
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

    const loadNextCard = (correctAnswers) => {
        if (hasLoaded.current)
            setCurrentCardIndex((number) => number + 1);
        if (correctAnswers === flashcards.length) {
            updateScores();
            setIsEndScreen(true);
        }
        else
            loadAnswers(currentCard);
    };

    function sumValues(obj) {
        return Object.values(obj).reduce((acc, value) => acc + value, 0);
    }
    const loadAnswers = () => {
        let card;
        if (hasLoaded.current){
            card = currentCardIndex + 1 < flashcards.length ? flashcards[currentCardIndex + 1] : problemCards[0];
            if (sumValues(attempts) >= flashcards.length - correctAnswersCount) {
                if (problemCards.length > 1)
                    card = problemCards[1];
                else
                    card = problemCards[0]
            }
            console.log(card);
            console.log(sumValues(attempts));
            console.log(flashcards.length - correctAnswersCount);
            console.log(problemCards);
        }
        else
            card = flashcards[0];


        const incorrectAnswers = flashcards.filter(f => f.ukrainian !== card.ukrainian).sort(() => 0.5 - Math.random()).slice(0, 3);
        const shuffledAnswers = [...incorrectAnswers, card].sort(() => 0.5 - Math.random());
        setAnswers(shuffledAnswers);
        setShowAnswer(false);
        setSelectedAnswer(null);
    }

    const handleAnswerSelection = (answer, index) => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setSelectedAnswer(answer);
        setShowAnswer(true);
        if (answer.ukrainian !== currentCard.ukrainian) {
            setWrongAnswerIndex(index);
        } else {
            setWrongAnswerIndex(null);
            setCorrectAnswersCount(correctAnswersCount + 1);
            audioRef.current.play();
            if (correctAnswersCount + 1 === flashcards.length) {
                updateScores();
                setIsEndScreen(true);
                return;
            }
        }

        setTimeout(() => {
            if (!attempts[currentCard.english]) {
                attempts[currentCard.english] = 0;
            }
            if (answer.ukrainian !== currentCard.ukrainian) {
                attempts[currentCard.english]++;
                if (!problemCards.includes(currentCard)) {
                    setProblemCards([...problemCards, currentCard]);
                }
                setShowContinuePrompt(true);
            } else {
                setProblemCards(problemCards.filter(card => card.ukrainian !== currentCard.ukrainian));
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
        localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
    };

    const restartSession = () => {
        hasLoaded.current = false;
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
        flashcards = [];
        hasLoaded.current = true;
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
                <audio ref={audioRef} src="/success.mp3" />
                <h2>Productive session!</h2>
                <button className=""    >Restart Session</button>
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
                </ul>
            </div>
        );
    }



    return (
        <div className="learning-mode-container">
            <audio ref={audioRef} src="/success.mp3" />
            <div className="answer-count">
                {correctAnswersCount}/{flashcardAmount}
            </div>

            <div className="question-card">
                <div className="question-header">
                    <span className="question-title">Definition</span>
                    <button className="sound-button">🔊</button>
                </div>
                <div className="question-text">{currentCard.english}</div>
                <div className="answers">
                    {
                        answers.map((answer, index) => (
                        <button key={index}
                                className={`answer-button ${showAnswer && answer.ukrainian === currentCard.ukrainian ? 'correct' : ''} ${showAnswer && selectedAnswer && index === wrongAnswerIndex ? 'wrong' : ''}`}
                                onClick={() => handleAnswerSelection(answer, index)}
                                disabled={showAnswer}
                        >

                            {answer.ukrainian}
                        </button>
                    ))}
                </div>
                <div className="footer">
                    <span className="hint-text">Dont know?</span>
                </div>
            </div>

            {/*<div className="question">{currentCard.english}</div>*/}
            {/*<div className="answers">*/}
            {/*    {answers.map((answer, index) => (*/}
            {/*        <button*/}
            {/*            key={index}*/}
            {/*            className={`button-13 answer-button ${showAnswer && answer.ukrainian === currentCard.ukrainian ? 'correct' : ''} ${showAnswer && selectedAnswer && index === wrongAnswerIndex ? 'wrong' : ''}`}*/}
            {/*            onClick={() => handleAnswerSelection(answer, index)}*/}
            {/*            disabled={showAnswer}*/}
            {/*        >*/}
            {/*            {answer.ukrainian}*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {showContinuePrompt && (
                <div className="continue-prompt">
                    Press any key on the keyboard to continue
                </div>
            )}
        </div>
    );
};

export default LearningMode;
