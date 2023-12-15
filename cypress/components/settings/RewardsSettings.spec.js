import React from 'react';
import RewardsSettings from '../../../src/components/settings/RewardsSettings';
import * as RewardService from '@/services/RewardService';

describe('RewardsSettings Component', () => {

    context('when the component is mounted', () => {
        beforeEach(() => {
            cy.stub(RewardService, 'getReferralCode').resolves({
                status: 200,
                data: '123t55'
            });
        });

        it('renders page correctly', () => {
            const user = {
                user: {
                    name: 'Test User',
                    style: 'FF70A6',
                    level: 5,
                    country: 'US',
                },
            };
            cy.mount(<RewardsSettings user={user} />);

            cy.get('h2').should('contain', 'Referral Code');
        });
    });
});
