import React from 'react';
import LoadingScreen from '../../src/components/LoadingScreen'; 
import styles from '../../src/style/loadingScreen.module.css'; 

describe('LoadingScreen Component', () => {
    //Tests if the component is rendered
    it('renders the loading screen', () => {
      cy.mount(<LoadingScreen />);
      cy.get(`.${styles.loaderContainer}`).should('exist');
      cy.get(`.${styles.loader}`).should('exist');
    });
  
    //Tests if the component has the intended styling
    it('has the intended styling from loadingScreen.module.css', () => {
      cy.mount(<LoadingScreen />);
      cy.get(`.${styles.loaderContainer}`).should('have.class', styles.loaderContainer);
      cy.get(`.${styles.loader}`).should('have.class', styles.loader);
    });
  
    //Tests if the component has the correct initial display style
    it('has the correct initial display style', () => {
      cy.mount(<LoadingScreen />);
      cy.get(`.${styles.loaderContainer}`).should('have.attr', 'style', 'display: none;');
    });
  });
  