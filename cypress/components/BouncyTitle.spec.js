import React from 'react';
import BouncyTitle from '../../src/components/BouncyTitle'; 
import styles from '../../src/style/bouncyTitle.module.css'; 

describe('BouncyTitle Component', () => {
    // Tests if the component is rendered
    it('renders the bouncy title', () => {
      const title = 'Test';
      cy.mount(<BouncyTitle title={title} />);
      cy.get(`.${styles.title}`).should('exist');
    });

    // Tests if the component has the intended styling from
    it('has the intended styling', () => {
      const title = 'Test';
      cy.mount(<BouncyTitle title={title} />);
      cy.get(`.${styles.title}`).should('have.class', styles.title);
    });
});
