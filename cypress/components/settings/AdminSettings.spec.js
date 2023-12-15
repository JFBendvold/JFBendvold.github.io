import React from 'react';
import AdminSettings from '../../../src/components/settings/AdminSettings';

describe('AdminSettings Component', () => {
    const url= "localhost:8080";

    /* Careful: this test does only work if it is manually run in the terminal, not in the Gitlab CI pipeline. 
    context('when the user is an admin', () => {
        beforeEach(() => {
            cy.intercept('GET', `http://${url}/authority/get`, {
                statusCode: 200,
                body: 'admin',
            }).as('getAuthority');
        });
    
        it('renders admin panel for admin user', () => {
            const user = { user: { name: 'Admin User', metamask: false } };
            cy.mount(<AdminSettings user={user} />);
    
            cy.wait('@getAuthority');
    
           
            cy.log('After wait for getAuthority');
    
            cy.get('h2').should('contain', 'Admin Panel');
        });
    });
    */

    context('when the user is not an admin', () => {
        const metamaskUser = {
            name: "Test User",
            email: "test@metamask.fo",
            country: "ETH",
            timestamp: 17020121212,
            avatar_url: "/images/MetaMask_fox.svg",
            last_active: 1212121212,
            style: "linear-gradient(60deg, #70FFA6 0%, #70D6FF 100%)",
            metamask: true,
            tokens: 100
        };
        beforeEach(() => {
            cy.intercept('GET', `http://${url}/authority/get`, {
                statusCode: 423,
                body: 'Invalid authority',
            }).as('getAuthority');


            localStorage.setItem('user', JSON.stringify(metamaskUser));

        });

        it('displays not an admin message for non-admin user', () => {
            const user = { user: { name: 'Regular User'} };
            cy.mount(<AdminSettings user={user} />);

            cy.get('h2').contains('Not an admin').should('exist');
            cy.get('p').contains('You are not an admin.').should('exist');
        });

        it('displays Metamask user message', () => {
            
            cy.mount(<AdminSettings user={metamaskUser} />);

            cy.get('h2').contains('Metamask User').should('exist');
            cy.get('p').contains('You are logged in with Metamask.').should('exist');
        });
    });
});
