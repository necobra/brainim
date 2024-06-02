import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {motion} from "framer-motion";
import {Image} from "semantic-ui-react";

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background: ${({ isScrolled }) => (isScrolled ? '#fff' : 'black')};
  color: ${({ isScrolled }) => (isScrolled ? '#000' : '#fff')};
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none')};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: inherit;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: color 0.3s;

    &:hover {
      color: #61dafb;
    }
  }
`;
const AuthButtons = styled.div`
  margin-right: 50px;
  display: flex;
  gap: 1rem;
`;

const AuthButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  
  color: ${({isScrolled}) => (isScrolled ? '#5a5a5a' : '#fff')};
  background-color: ${({isScrolled}) => (isScrolled ? '#e0e1e2' : 'transparent')};
  border: 1px solid ${({isScrolled}) => (isScrolled ? '#e0e1e2' : '#e0e1e2')} ;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #21a1f1;
    color: #fff;
  }
`;

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        setIsScrolled(offset > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <NavbarContainer isScrolled={isScrolled}>
            <Link to="/">
                <Image src="/logo.png" width={50}></Image>
            </Link>
            <NavLinks>
                <Link to="/">Home</Link>
                <Link to="/flashcards">Flashcards</Link>
                <Link to="/speedtyping">SpeedTyping</Link>
                <Link to="/about">About Us</Link>
            </NavLinks>
            <AuthButtons>
                <AuthButton isScrolled={isScrolled} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    Log In
                </AuthButton>
                <AuthButton isScrolled={isScrolled} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    Sign Up
                </AuthButton>
            </AuthButtons>
        </NavbarContainer>
    );
};

export default Navbar;
