import React from 'react';
import Footer from '../../src/components/Footer';
import styles from '../../src/style/footer.module.css';

describe('Footer Component', () => {
    it('renders titles and other text content correctly', () => {
        cy.mount(<Footer/>);

        cy.get(`.${styles.title}`).should('contain', 'TOKENTRIVIA');
        cy.get(`.${styles.title}`).should('contain', 'Links');
        cy.get(`.${styles.title}`).should('contain', 'Socials');

        cy.get(`.${styles.text}`).should('contain', 'WEB3 Trivia Game');
        cy.get(`.${styles.text}`).should('contain', 'Dashboard');
        cy.get(`.${styles.text}`).should('contain', 'Tutorial');
        cy.get(`.${styles.text}`).should('contain', 'Leaderboard');
    });
});


describe('Footer Component', () => {
    it('renders links correctly', () => {
        cy.mount(<Footer/>);

        cy.get(`.${styles.text}`).contains('Dashboard').parent('a').should('have.attr', 'href', '/dashboard');
        cy.get(`.${styles.text}`).contains('Tutorial').parent('a').should('have.attr', 'href', '/tutorial');
        cy.get(`.${styles.text}`).contains('Leaderboard').parent('a').should('have.attr', 'href', '/leaderboard');

        cy.get('img[alt="Instagram"]').parent('a').should('have.attr', 'href', 'https://www.instagram.com/tokent.io/'); //TODO: refer to real links
        cy.get('img[alt="Facebook"]').parent('a').should('have.attr', 'href', 'https://www.facebook.com/tokent.io');
        cy.get('img[alt="Twitter"]').parent('a').should('have.attr', 'href', 'https://twitter.com/tokent_io');
    });
});
