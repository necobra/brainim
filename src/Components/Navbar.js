import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: #21a1f1;
  }
`;

const RegisterButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #21a1f1;
  }
`;

const Navbar = () => {
    return (
        <NavbarContainer
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
        >
            <NavLinks>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/flashcards">Flashcards</NavLink>
                <NavLink to="/speedtyping">SpeedTyping</NavLink>
                <NavLink to="/about">About us</NavLink>
            </NavLinks>
            <RegisterButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                Register
            </RegisterButton>
        </NavbarContainer>
    );
};

export default Navbar;
