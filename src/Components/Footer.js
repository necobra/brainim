import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

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
                <FooterLink href="#">Something 1</FooterLink>
                <FooterLink href="/aboutUs">About Us</FooterLink>
                <FooterLink href="https://distedu.ukma.edu.ua/">University site</FooterLink>
                <FooterLink href="https://github.com/necobra/brainim"><Icon fitted link name='github' /> Github</FooterLink>
            </Column>
            <Column>
                <h4>Services</h4>
                <FooterLink href="#">React Semantic Ui</FooterLink>
                <FooterLink href="#">Something 1</FooterLink>
                <FooterLink href="#">Something 2</FooterLink>
                <FooterLink href="#">Something 3</FooterLink>
            </Column>
            <Column>
                <h4>All rights reserved. © 2024</h4>
            </Column>
        </FooterContainer>
    );
};

export default Footer;
