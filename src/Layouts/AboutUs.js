import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {Link} from "react-router-dom";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #f0f0f0;
  color: #000;
  min-height: 100vh;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Description = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
`;

const DevelopersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const DeveloperCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 2rem;
  text-align: center;
`;

const DeveloperImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const DeveloperName = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.25rem;
`;

const DeveloperRole = styled.p`
  font-size: 1rem;
  color: #555;
`;

const DeveloperLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const DeveloperLink = styled.a`
  font-size: 1.5rem;
  color: #61dafb;

  &:hover {
    color: #21a1f1;
  }
`;

const AboutUs = () => {
    return (
        <AboutContainer>
            <Title
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                About Us
            </Title>
            <Description
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                We are dedicated to providing exceptional services and products. Meet our amazing team of developers who make everything possible.
            </Description>
            <DevelopersContainer>
                <Link style={{textDecoration: "none", color: "black"}} to="https://github.com/den4hic">
                    <DeveloperCard
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <DeveloperImage src="/developer1.jpg" alt="Developer 1" />
                        <DeveloperName>Davydov Denys</DeveloperName>
                        <DeveloperRole>God's dandelion</DeveloperRole>
                    </DeveloperCard>
                </Link>
                <Link style={{textDecoration: "none", color: "black"}} to="https://github.com/necobra">
                <DeveloperCard
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <DeveloperImage src="developer2.jpg" alt="Developer 2" />
                    <DeveloperName>Baiush Oleksandr</DeveloperName>
                    <DeveloperRole>Genius, billionaire, playboy, philanthropist.</DeveloperRole>
                    <DeveloperLinks>
                        <DeveloperLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </DeveloperLink>
                        <DeveloperLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </DeveloperLink>
                    </DeveloperLinks>
                </DeveloperCard>
                </Link>
            </DevelopersContainer>
        </AboutContainer>
    );
};

export default AboutUs;
