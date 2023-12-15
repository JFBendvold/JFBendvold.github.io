const loginUser = () => {
    const name = 'cypresstest';  
    cy.session(name, () => {

        window.localStorage.setItem('user', JSON.stringify({
            name: name, 
            email: "cypress@test.com", 
            country:"NO", 
            timestamp: "2023-10-26T09:36:11.220Z", 
            avatar_url: "images/1698312971220-48a79014.png", 
            tokens: 0 

        }))

     })
     cy.request('POST', 'http://localhost:8080/auth/authenticate', {
        name: 'cypresstest',
        password: 'cypress123',
        fingerprint: 123
      })
      .then((response) => {
        console.log("response")
        console.log(response)
        cy.request('POST', 'http://localhost:8080/auth/set-cookie', {
            token: response.body.jwt_token
            })
        cy.wait(200)
      })
  }
  
  
  //Mocks logout for the tests by manually clearing the local storage
  const logout = () => {
    window.localStorage.clear()
  }
  

describe('visits the settings page', () => {

    beforeEach(() => {
        loginUser()
    })  
    
    it('visits url and renders page', () => {
      cy.visit('http://localhost:3000/settings')
      cy.contains('Settings')
    })
})

describe('functionality for the settings page', () => {

    beforeEach(() => {
      loginUser()
      cy.visit('http://localhost:3000/settings')
    })  

    it('changes the user profile avatar when the button is pressed', () => {
        cy.intercept({
            method: 'PUT',
            url: '**/changeAvatar',
        }).as('changeAvatarRequest');

        cy.get('button').contains('Generate new avatar').click()

        cy.wait('@changeAvatarRequest').then((interception) => {
            assert.isNotNull(interception.request, 'PUT request to /users/changeAvatar was made');
        });
      })

      it('changes the user style when the button is pressed', () => {
        cy.intercept({
            method: 'PUT',
            url: '**/style',
        }).as('styleChangeRequest');

        cy.get('div.settingsContent_style__dUJMZ').last().click();

        cy.wait('@styleChangeRequest').then((interception) => {
            assert.isNotNull(interception.request, 'PUT request to /users/style/{style} was made');
        });
      })

      it('views the Security overview page', () => {
        cy.get('button').contains('Security').click();

        cy.contains('Change Password')
      })

      it('views the Wallet overview page', () => {
        cy.get('button').contains('Wallet').click();

        cy.contains('Connect Wallet')
      })

      it('views the Rewards overview page', () => {
        cy.get('button').contains('Rewards').click();

        cy.contains('Rewards')
      })

      it('views the History overview page', () => {
        cy.get('button').contains('History').click();

        cy.contains('History')
      })
    
})