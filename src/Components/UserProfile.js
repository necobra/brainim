import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { format, subDays } from 'date-fns';
import speedTypingResults from '../SpeedTyping/speedTypingResults.json';

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

const UserProfile = () => {
    const [speedTypingData, setSpeedTypingData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Average WPM',
                data: [],
                backgroundColor: 'rgba(97, 218, 251, 0.2)',
                borderColor: '#61dafb',
                borderWidth: 1,
            },
        ],
    });

    const [flashcardSetsData, setFlashcardSetsData] = useState([]);

    const highestWPM = speedTypingResults.accounts[0].logs.reduce((acc, log) => Math.max(acc, log.wpm), 0);
    const gamesPlayed = speedTypingResults.accounts[0].logs.length;

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
              } else if (card.score < 100) {
                  returnedSet.problem_card++;
              }
          }
          return returnedSet;
    };

    useEffect(() => {
        const logs = speedTypingResults.accounts[0].logs;

        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => format(subDays(today, i), 'yyyy-MM-dd')).reverse();

        const averageWPM = last7Days.map(day => {
            const dayLogs = logs.filter(log => log.date === day);
            const totalWPM = dayLogs.reduce((acc, log) => acc + log.wpm, 0);
            return dayLogs.length ? totalWPM / dayLogs.length : 0;
        });

        setSpeedTypingData({
            labels: last7Days,
            datasets: [
                {
                    label: 'Average WPM',
                    data: averageWPM,
                    backgroundColor: 'rgba(97, 218, 251, 0.2)',
                    borderColor: '#61dafb',
                    borderWidth: 1,
                },
            ],
        });


        const flashcardSetLastVisited = localStorage.getItem('lastVisitedSet');
        const flashcardSetPreLastVisited = localStorage.getItem('preLastVisitedSet');
        const flashcardSetPrePreLastVisited = localStorage.getItem('prePreLastVisitedSet');
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
        setFlashcardSetsData(flashcardData);
    }, []);

    return (
        <ProfileContainer>
            <UserInfo>
                <UserName>John Doe</UserName>
                <UserEmail>johndoe@example.com</UserEmail>
            </UserInfo>
            <GameStatsContainer>
                <GameCard>
                    <GameTitle>Flashcards</GameTitle>
                    <GameStats>Highest Score: 1500</GameStats>
                    <GameStats>Games Played: 30</GameStats>
                    <TryAgainButton to="/flashcards">Try Again</TryAgainButton>
                </GameCard>
                <Divider />
                <GameCard>
                    <GameTitle>SpeedTyping</GameTitle>
                    <GameStats>Highest WPM: {highestWPM}</GameStats>
                    <GameStats>Games Played: {gamesPlayed}</GameStats>
                    <GameStats>
                        SpeedTyping is a fast-paced typing game that tests your typing speed and accuracy. Compete against the clock and improve your typing skills. Track your progress and see how you stack up against others.
                    </GameStats>
                    <Line data={speedTypingData} />
                    <TryAgainButton to="/speedtyping">Try Again</TryAgainButton>
                </GameCard>
            </GameStatsContainer>
        </ProfileContainer>
    );
};

export default UserProfile;
