import React from 'react';
import SecuritySettings from '../../../src/components/settings/SecuritySettings';
import styles from '../../../src/style/settings/settingsContent.module.css';
import Router from 'next/router';
import * as UserService from '@/services/UserService';

//Tests the SecuritySettings component
describe('SecuritySettings Component', () => {
    context('stubbing out the useRouter hook and other dependencies', () => {
        beforeEach(() => {
            //Stubs the router
            cy.stub(Router, 'useRouter').returns({
                route: '/',
                pathname: '/',
                query: '',
                asPath: '/',
                push: () => {},
            });

            //Stubs other dependencies
            cy.stub(UserService, 'updatePassword').resolves({ status: 200 });
        });

        it('renders the security settings with correct styles', () => {
            //Mocks the user prop
            const user = {
                user: {
                    name: 'Test User',
                },
            };

            cy.mount(<SecuritySettings user={user} />);
            cy.get(`.${styles.container}`).should('exist');
            cy.get(`.${styles.box}`).should('exist');
            cy.get(`.${styles.passwordInput}`).should('have.length', 3);
            cy.get(`.${styles.passwordButton}`).should('exist');
        });

    });
});
