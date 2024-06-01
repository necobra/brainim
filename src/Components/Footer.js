import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled.a`
  color: #61dafb;
  text-decoration: none;

  &:hover {
    color: #21a1f1;
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <Column>
                <h4>About</h4>
                <FooterLink href="#">Sitemap</FooterLink>
                <FooterLink href="#">Contact Us</FooterLink>
                <FooterLink href="#">Religious Ceremonies</FooterLink>
                <FooterLink href="#">Gazebo Plans</FooterLink>
            </Column>
            <Column>
                <h4>Services</h4>
                <FooterLink href="#">Banana Pre-Order</FooterLink>
                <FooterLink href="#">DNA FAQ</FooterLink>
                <FooterLink href="#">How to Access</FooterLink>
                <FooterLink href="#">Favorite X-Men</FooterLink>
            </Column>
            <Column>
                <h4>Footer Header</h4>
                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
            </Column>
        </FooterContainer>
    );
};

export default Footer;
