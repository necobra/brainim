import React, {useRef} from 'react';
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

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f0f0f0;
  color: #000;
  padding: 2rem 0;
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
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  margin: 0 auto;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  margin-top: 3rem;
`;

const Card = styled(motion.div)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 400px;
  height: 450px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
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

const BenefitsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const Benefit = styled.div`
  text-align: center;
  max-width: 300px;
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #61dafb;
`;

const BenefitTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const BenefitDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Home = () => {
    const mainContentRef = useRef(null);

    const scrollToMainContent = () => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <HomeContainer>
                <img src="/logo.png" alt="som" width="200" height="200"/>
                <Title initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    Brainim
                </Title>
                <Subtitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                    Developing useful skills as for work for
                    computer and general development
                </Subtitle>
                <Button onClick={scrollToMainContent} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    Get Started
                </Button>
            </HomeContainer>
            <MainContent ref={mainContentRef}>
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
                    <BenefitsContainer>
                        <Benefit>
                            <BenefitIcon>🌟</BenefitIcon>
                            <BenefitTitle>High Quality</BenefitTitle>
                            <BenefitDescription>We offer top-notch services to ensure your success.</BenefitDescription>
                        </Benefit>
                        <Benefit>
                            <BenefitIcon>⚡</BenefitIcon>
                            <BenefitTitle>Fast Performance</BenefitTitle>
                            <BenefitDescription>Experience blazing fast performance with our solutions.</BenefitDescription>
                        </Benefit>
                        <Benefit>
                            <BenefitIcon>🔒</BenefitIcon>
                            <BenefitTitle>Secure</BenefitTitle>
                            <BenefitDescription>Your data is safe with our advanced security measures.</BenefitDescription>
                        </Benefit>
                    </BenefitsContainer>
                </ContentContainer>
            </MainContent>
        </>
    );
};

export default Home;
