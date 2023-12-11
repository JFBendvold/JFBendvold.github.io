import React from 'react';
import Header from '../../../src/components/header/Header';
import styles from '../../../src/style/header.module.css'; 
import Router from 'next/router'

describe('Header Component', () => {
    context('stubbing out the useRouter hook', () => {

        beforeEach(() => {

            cy.stub(Router, 'useRouter').returns({
                route: '/',
                pathname: '/',
                query: '',
                asPath: '/',
                push: () => {},
            });
        });

        it('renders the header with correct styles', () => {
            cy.mount(<Header />);
            cy.get('header').should('have.class', styles.header);
            cy.get(`.${styles.logo}`).should('exist');
            cy.get(`.${styles.content}`).should('exist');
            cy.get(`.${styles.wallet}`).should('exist');
            cy.get(`.${styles.profile}`).should('exist');
        });
    }); 

});
