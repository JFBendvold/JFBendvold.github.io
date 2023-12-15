import React from 'react';
import ArrowLink from '../../src/components/ArrowLink'; 
import styles from '../../src/style/arrowLink.module.css'; 

describe('ArrowLink Component', () => {
    // Tests if the component is rendered
    it('renders the arrow link', () => {
      const href = '/anotherTestPage';
      cy.mount(<ArrowLink href={href} />);
      cy.get(`.${styles.arrowLink}`).should('exist');
      cy.get(`.${styles.arrowicon}`).should('exist');
    });

    // Tests if the component has the intended styling
    it('has the intended styling', () => {
      const href = '/anotherTestPage';
      cy.mount(<ArrowLink href={href} />);
      cy.get(`.${styles.arrowLink}`).should('have.class', styles.arrowLink);
      cy.get(`.${styles.arrowicon}`).should('have.class', styles.arrowicon);
    });

    // Tests if the link is working correctly
    it('has the correct link attribute', () => {
      const href = '/anotherTestPage';
      cy.mount(<ArrowLink href={href} />);
      cy.get('a').should('have.attr', 'href', href);
    });
});
