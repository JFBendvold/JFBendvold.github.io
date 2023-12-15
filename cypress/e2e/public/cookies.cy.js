describe('visits the cookie page', () => {
    it('visits url and renders page', () => {
      cy.visit('http://localhost:3000/cookies')
      cy.contains('Cookie Policy for TokenTrivia')
    })
  })
  
  describe('tests out the functionality for the cookie page', () => {
  
    //Ensures that the cookies page is visited before each test
    beforeEach(() => {
     cy.visit('http://localhost:3000/cookies')
    })
  
    it('clicks on the home arrow', () => {
      cy.get('a').contains('arrow_back_ios_new').click()
      cy.get('body').should('not.contain', 'Cookie Policy for TokenTrivia')
      cy.contains('Trivia with a twist of Crypto')
  
    })
  
    it('clicks on the home link in the text', () => {
        cy.get('a').contains('TokenTrivia').click()
        cy.get('body').should('not.contain', 'Cookie Policy for TokenTrivia')
        cy.contains('Trivia with a twist of Crypto')
      })
  })