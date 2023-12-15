import React from 'react';
import Search from '../../src/components/Search';
import styles from '../../src/style/search.module.css';
import Router from 'next/router';

describe('Search Component', () => {
    context('stubbing out the useRouter hook and other dependencies', () => {
        let websocketMock; 

        beforeEach(() => {
            // Stubs the router
            cy.stub(Router, 'useRouter').returns({
                route: '/',
                pathname: '/',
                query: '',
                asPath: '/',
                push: () => {},
            });

            // Mock the websocket object
            websocketMock = {
                websocket: {
                    emit: cy.stub(),
                },
            };
        });

        it('renders the search component with correct styles', () => {
            cy.mount(<Search websocket={websocketMock} />);
            cy.get(`.${styles.main}`).should('exist');
            cy.get(`.${styles.content}`).should('exist');
            cy.get(`.${styles.searchFilter}`).should('exist');
            cy.get(`.${styles.buttonContainer}`).should('exist');
            cy.get(`.${styles.searchingContainer}`).should('exist');
        });

    });
});
