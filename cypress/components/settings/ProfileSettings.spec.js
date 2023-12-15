import React from 'react';
import ProfileSettings from '../../../src/components/settings/ProfileSettings';
import styles from '../../../src/style/settings/settingsContent.module.css';
import Router from 'next/router';
import * as UserService from '@/services/UserService';
import * as LoadingProvider from '@/utils/LoadingProvider';

//Tests the ProfileSettings component
describe('ProfileSettings Component', () => {
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
            cy.stub(UserService, 'updateProfilePicture').resolves();
            cy.stub(UserService, 'updateStyle').resolves();
            cy.stub(LoadingProvider, 'showLoadingScreen');
            cy.stub(LoadingProvider, 'hideLoadingScreen');
        });

        it('renders the profile settings with correct styles', () => {
            //Mocks the user prop
            const user = {
                user: {
                    name: 'Test User',
                    style: 'FF70A6',
                    level: 5,
                    country: 'US',
                },
            };

            //Mounts the component with the mocked user prop
            cy.mount(<ProfileSettings user={user} />);
            cy.get(`.${styles.container}`).should('exist');
            cy.get(`.${styles.profile}`).should('exist');
            cy.get(`.${styles.box}`).should('exist');
        });
    });
});

