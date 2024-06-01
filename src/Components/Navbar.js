import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: #21a1f1;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const AuthButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: transparent;
  border: 1px solid #61dafb;
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
                <NavLink to="/work">Work</NavLink>
                <NavLink to="/company">Company</NavLink>
                <NavLink to="/careers">Careers</NavLink>
            </NavLinks>
            <AuthButtons>
                <AuthButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    Log In
                </AuthButton>
                <AuthButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    Sign Up
                </AuthButton>
            </AuthButtons>
        </NavbarContainer>
    );
};

export default Navbar;
