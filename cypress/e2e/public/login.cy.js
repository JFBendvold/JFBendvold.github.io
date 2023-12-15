describe('visits the home page', () => {
    it('visits url and renders page', () => {
      cy.visit('http://localhost:3000/login')
      cy.contains('Forgot Password')
    })
  })
  
  describe('tests out the functionality for the login page', () => {
  
    //Ensures that the login page is visited before each test
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })
  
    it('clicks on the Login button without any input', () => {
        cy.get('button').contains('Login').click()
        cy.contains('Please enter a username or email')
        cy.contains('No username')
    })

    it('clicks on the Login button with only inputted username', () => {
        cy.get('input[placeholder="Username/Email"]').type('testtesttest');
        cy.get('button').contains('Login').click()
        cy.contains('Please enter a password')
        cy.contains('No password')
    })

    it('clicks on the Login button with only inputted password', () => {
        cy.get('input[placeholder="Password"]').type('testtesttest');
        cy.get('button').contains('Login').click()
        cy.contains('Please enter a username or email')
        cy.contains('No username')
    })

    it('clicks on the Login button with incorrect inputs', () => {
        cy.get('input[placeholder="Username/Email"]').type('testtesttest');
        cy.get('input[placeholder="Password"]').type('testtesttest');
        cy.get('button').contains('Login').click()
        cy.contains('Username or password is incorrect')
        cy.contains('Invalid credentials')
    })

    // it('clicks on the Login button with correct inputs', () => {
    //     cy.get('input[placeholder="Username/Email"]').type('cypresstester');
    //     cy.get('input[placeholder="Password"]').type('password12345');
    //     cy.get('button').contains('Login').click()
    //     cy.get('body').should('not.contain', 'Forgot Password')
    //     cy.contains('Join a game')
    //     cy.contains('Find a game')
    // })

    it('clicks on the Register button', () => {
        cy.get('a').contains('Register').click()
        cy.get('body').should('not.contain', 'Forgot Password')
        cy.contains('Terms of Service')
    })


  })