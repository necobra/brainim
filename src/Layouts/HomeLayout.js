import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: #282c34;
`;

const Home = () => {
    return (
        <HomeContainer>
            <Title
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Welcome to our Website
            </Title>
        </HomeContainer>
    );
};

export default Home;
