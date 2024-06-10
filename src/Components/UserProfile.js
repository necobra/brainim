import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProfileContainer = styled.div`
  max-width: 900px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #1c1c1c;
  color: #fff;
  border-radius: 8px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const UserName = styled.h1`
  font-size: 2.5rem;
`;

const UserEmail = styled.p`
  font-size: 1.2rem;
  color: #bbb;
`;

const GameStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const GameCard = styled.div`
  background-color: #333;
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const GameTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const GameStats = styled.p`
  font-size: 1.2rem;
`;

const TryAgainButton = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #61dafb;
  color: #000;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    background-color: #21a1f1;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #444;
  margin: 2rem 0;
`;

const FlashcardSetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const FlashcardSetCard = styled.div`
  background-color: #444;
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
  flex: 1 1 30%;
  min-width: 250px;
  max-width: 300px;

  & p {
    margin: 0.5rem 0;
  }
`;

const NoDataMessage = styled.p`
  font-size: 1.2rem;
  color: #bbb;
  text-align: center;
`;

const UserProfile = () => {
    const [gamesPlayed, setGamesPlayed] = useState(0);

    const [speedTypingData, setSpeedTypingData] = useState({
        labels: [],
        datasets: [
            {
                label: 'WPM',
                data: [],
                backgroundColor: 'rgba(97, 218, 251, 0.2)',
                borderColor: '#61dafb',
                borderWidth: 1,
            },
        ],
    });

    const [flashcardSetsData, setFlashcardSetsData] = useState([]);
    const [hasSpeedTypingData, setHasSpeedTypingData] = useState(false);
    const [hasFlashcardData, setHasFlashcardData] = useState(false);

    const formatSet = (set) => {
        const returnedSet = {
            name: set.name,
            amount: set.cards.length,
            completed: 0,
            problem_card: 0,
        }
        for (let card of set.cards) {
            if (card.score === 100) {
                returnedSet.completed++;
            } else if (card.score < 100 && card.score > 0) {
                returnedSet.problem_card++;
            }
        }
        return returnedSet;
    };

    useEffect(() => {
        const speedTypingResults = JSON.parse(localStorage.getItem('speedTypingResults'));

        if (speedTypingResults && speedTypingResults.length > 0) {
            setGamesPlayed(speedTypingResults.length);
            setHasSpeedTypingData(true);
            const last15Results = speedTypingResults.slice(-15).reverse();

            const labels = last15Results.map((log, index) => `Game ${index + 1}`);
            const data = last15Results.map(log => log.wpm);

            setSpeedTypingData({
                labels,
                datasets: [
                    {
                        label: 'WPM',
                        data,
                        backgroundColor: 'rgba(97, 218, 251, 0.2)',
                        borderColor: '#61dafb',
                        borderWidth: 1,
                    },
                ],
            });
        }

        const flashcardSetLastVisited = JSON.parse(localStorage.getItem('lastVisitedSet'));
        const flashcardSetPreLastVisited = JSON.parse(localStorage.getItem('preLastVisitedSet'));
        const flashcardSetPrePreLastVisited = JSON.parse(localStorage.getItem('prePreLastVisitedSet'));

        const flashcardData = [];
        if (flashcardSetLastVisited) {
            flashcardData.push(formatSet(flashcardSetLastVisited));
        }
        if (flashcardSetPreLastVisited) {
            flashcardData.push(formatSet(flashcardSetPreLastVisited));
        }
        if (flashcardSetPrePreLastVisited) {
            flashcardData.push(formatSet(flashcardSetPrePreLastVisited));
        }

        if (flashcardData.length > 0) {
            setHasFlashcardData(true);
        }
        setFlashcardSetsData(flashcardData);
    }, []);

    return (
        <ProfileContainer>
            <UserInfo>
                <UserName>Your results for previous games</UserName>
                {hasFlashcardData && hasSpeedTypingData ? (
                    <UserEmail>✨ You have made a lot of progress lately ✨</UserEmail>
                ) : null}
            </UserInfo>
            <GameStatsContainer>
                <GameCard>
                    <GameTitle>Flashcards</GameTitle>
                    <GameStats>Discover the ultimate flashcard game with two exciting modes! Master new knowledge with our Learning Mode, where you track your learning journey, or dive into Free Play Mode for a fun, flexible experience. Boost your skills and enjoy endless learning today!</GameStats>
                    {hasFlashcardData ? (
                        <FlashcardSetContainer>
                            {flashcardSetsData.map((set, index) => (
                                <FlashcardSetCard key={index}>
                                    <h3>{set.name}</h3>
                                    <p>Total Cards: {set.amount}</p>
                                    <p>Completed Cards: {set.completed}</p>
                                    <p>Problem Cards: {set.problem_card}</p>
                                </FlashcardSetCard>
                            ))}
                        </FlashcardSetContainer>
                    ) : (
                        <NoDataMessage>No flashcard data available.</NoDataMessage>
                    )}
                    <TryAgainButton to="/flashcards">Try Again</TryAgainButton>
                </GameCard>
                <Divider />
                <GameCard>
                    <GameTitle>SpeedTyping</GameTitle>
                    <GameStats>
                        SpeedTyping is a fast-paced typing game that tests your typing speed and accuracy. Compete against the clock and improve your typing skills. Track your progress and see how you stack up against others.
                    </GameStats>
                    {hasSpeedTypingData ? (
                        <>
                            <GameStats>Highest WPM: {Math.max(...speedTypingData.datasets[0].data)}</GameStats>
                            <GameStats>Games Played: {gamesPlayed}</GameStats>
                            <Line data={speedTypingData} />
                        </>
                    ) : (
                        <NoDataMessage>No speed typing data available.</NoDataMessage>
                    )}
                    <TryAgainButton to="/speedtyping">Try Again</TryAgainButton>
                </GameCard>
            </GameStatsContainer>
        </ProfileContainer>
    );
};

export default UserProfile;
