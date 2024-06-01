import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #21a1f1;
  }
`;

const ContentContainer = styled.div`
  background-color: #f0f0f0;
  color: #000;
  padding: 2rem;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;  /* Збільшена відстань між картками */
`;

const Card = styled(motion.div)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 400px;  /* Збільшена ширина картки */
  height: 450px; /* Збільшена висота картки */
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px; /* Збільшена висота зображення */
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #000;
`;

const CardDescription = styled.p`
  color: #555;
`;

const CardLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    background-color: #21a1f1;
  }
`;

const Home = () => {
    return (
        <>
            <HomeContainer>
                <Title initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    Imagine-a-Company
                </Title>
                <Subtitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                    Do whatever you want when you want to.
                </Subtitle>
                <Button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    Get Started
                </Button>
            </HomeContainer>
            <ContentContainer>
                <CardsContainer>
                    <Card whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <CardImage src="https://via.placeholder.com/400x250" alt="Flashcards" />
                        <CardContent>
                            <CardTitle>Flashcards</CardTitle>
                            <CardDescription>Practice and memorize with our flashcards game.</CardDescription>
                            <CardLink to="/flashcards">Play Flashcards</CardLink>
                        </CardContent>
                    </Card>
                    <Card whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <CardImage src="https://via.placeholder.com/400x250" alt="SpeedTyping" />
                        <CardContent>
                            <CardTitle>SpeedTyping</CardTitle>
                            <CardDescription>Improve your typing speed with our speed typing game.</CardDescription>
                            <CardLink to="/speedtyping">Play SpeedTyping</CardLink>
                        </CardContent>
                    </Card>
                </CardsContainer>
            </ContentContainer>
        </>
    );
};

export default Home;
