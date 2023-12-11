import React from 'react';
import Cookie from '../../src/components/Cookie'; 
import styles from '../../src/style/cookie.module.css'; 

describe('Cookie Component', () => {

    //Tests if the component is rendered
    it('renders the cookie icon', () => {
      cy.mount(<Cookie />);
  
      cy.get(`.${styles.cookieicon}`).should('exist');
      cy.get('.material-symbols-outlined').should('contain', 'cookie');
    });
  
    //Tests if the component has the intended styling
    it('has the intended styling from cookie.module.css', () => {
      cy.mount(<Cookie />);
  
      cy.get(`.${styles.cookie}`).should('have.class', styles.cookie);
      cy.get(`.${styles.cookieicon}`).should('have.class', styles.cookieicon);
    });

  });