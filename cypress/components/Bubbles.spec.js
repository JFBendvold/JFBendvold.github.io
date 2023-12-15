import React from 'react';
import Bubbles from '../../src/components/Bubbles'; 
import styles from '../../src/style/components/bubbles.module.css'; 

describe('Bubbles Component', () => {
    it('renders the correct number of bubbles with the provided content', () => {
        const testContent = 'Test';
        cy.mount(<Bubbles content={testContent} />);

        cy.get(`.${styles.bubble}`).should('have.length', 14);


        cy.get(`.${styles.bubble}`).each(bubble => {
            cy.wrap(bubble).should('contain', testContent);
        });
    });
});