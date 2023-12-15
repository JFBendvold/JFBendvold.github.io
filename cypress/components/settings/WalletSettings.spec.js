import React from 'react';
import WalletSettings from '../../../src/components/settings/WalletSettings';
import styles from '../../../src/style/settings/settingsContent.module.css';
import Router from 'next/router';
import * as UserService from '@/services/UserService';
import * as LoadingProvider from '@/utils/LoadingProvider';

//Tests the WalletSettings component
describe('WalletSettings Component', () => {
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
            cy.stub(UserService, 'getUserId').resolves({ data: 1 });
            cy.stub(LoadingProvider, 'showLoadingScreen');
            cy.stub(LoadingProvider, 'hideLoadingScreen');
        });

        it('renders the wallet settings with correct styles', () => {
            //Mocks the user prop
            const user = {
                user: {
                    name: 'Test User',
                    tokens: 100,
                },
            };

            //Mounts the component with the mocked user prop
            cy.mount(<WalletSettings user={user} />);
            cy.get(`.${styles.container}`).should('exist');
            cy.get(`.${styles.tokensHeader}`).should('exist');
            cy.get(`.${styles.box}`).should('exist');
        });

    });
});
