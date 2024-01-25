import React from 'react';
import HomeHeader from '../../src/components/HomeHeader';

describe('HomeHeader component', () => {
        // Tests that the HomeHeader component renders with correct styling
        it('renders the HomeHeader component', () => {
            cy.mount(<HomeHeader/>);
            cy.contains('Utselger');
        });
});
