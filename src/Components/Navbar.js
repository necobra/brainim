import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {motion} from "framer-motion";
import {Image} from "semantic-ui-react";

const NavbarContainer = styled.nav`
  width: 100vw;
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

const ProfileLink = styled(Link)`
  display: flex;
  margin-right: 50px;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #61dafb;
  }
`;

const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-size: 1rem;
  color: ${({ isScrolled }) => (isScrolled ? '#000' : '#fff')};
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
                <Image src="/logo.png" width={50} />
            </Link>
            <NavLinks>
                <Link to="/">Home</Link>
                <Link to="/flashcards">Flashcards</Link>
                <Link to="/speedtyping">SpeedTyping</Link>
                <Link to="/about">About Us</Link>
            </NavLinks>
            <ProfileLink to="/user" isScrolled={isScrolled}>
                <ProfileImage src="/profile.png" />
                <UserName isScrolled={isScrolled}>Your profile</UserName>
            </ProfileLink>
        </NavbarContainer>
    );
};

export default Navbar;
