describe('visits the home page', () => {
  it('visits url and renders page', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Trivia with a twist of Crypto')
  })
})

describe('tests out the functionality for the home page', () => {

  //Ensures that the home page is visited before each test
  beforeEach(() => {
   cy.visit('http://localhost:3000/')
  })

  it('clicks on the Login button', () => {
    cy.get('button').contains('Login').click()
    cy.get('body').should('not.contain', 'Trivia with a twist of Crypto')
    cy.contains('Forgot Password')

  })

  it('clicks on the Register button', () => {
    cy.get('button').contains('Register').click()
    cy.get('body').should('not.contain', 'Trivia with a twist of Crypto')
    cy.contains('Terms of Service')

  })

  it('clicks on the Cookie icon', () => {
    cy.get('a').contains('cookie').click();
    cy.contains('This is the Cookie Policy for TokenTrivia, accessible from this link.')
  })
})