describe('visits the register page', () => {
    it('visits url and renders page', () => {
        cy.visit('http://localhost:3000/register')
        cy.contains('Register')
    })
})


describe('tests out the functionality for the register page', () => {

    //Ensures that the register page is visited before each test
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it('clicks on the Register button without any input', () => {
        cy.get('button').contains('Register').click()
        cy.contains('Username must be at least 6 characters')
    })

    it('clicks on the Register button with only inputted username', () => {
        cy.get('input[placeholder="Username (min 6 characters)"]').type('testtest');
        cy.get('button').contains('Register').click()
        cy.contains('Password must be at least 8 characters')
    })

    it('clicks on the Register button with inputted password and username', () => {
        cy.get('input[placeholder="Username (min 6 characters)"]').type('testtest');
        cy.get('input[placeholder="Password"]').type('testtest1');
        cy.get('button').contains('Register').click()
        cy.contains('Invalid email')
    })

    it('clicks on the Register button with inputted password and username, and also email', () => {
        cy.get('input[placeholder="Username (min 6 characters)"]').type('testtest');
        cy.get('input[placeholder="Password"]').type('testtest1');
        cy.get('input[placeholder="Email"]').type('testtest1@test.no');
        cy.get('button').contains('Register').click()
        cy.contains('Emails do not match')
    })

    it('clicks on the Register button with inputted password and username, and also email confirmed email', () => {
        cy.get('input[placeholder="Username (min 6 characters)"]').type('testtest');
        cy.get('input[placeholder="Password"]').type('testtest1');
        cy.get('input[placeholder="Email"]').type('testtest1@test.no');
        cy.get('input[placeholder="Confirm Email"]').type('testtest1@test.no');
        cy.get('button').contains('Register').click()
        cy.contains('Passwords do not match')
    })


    /* 
    
    //Commented out to ensure that the cypress run does not create a new user every time - this would in practice not work, since the email and username would already be in use

    it.only('clicks on the Register button correct parameters, registers user', () => {
        cy.get('input[placeholder="Username (min 6 characters)"]').type('testtest');
        cy.get('input[placeholder="Password"]').type('testtest1');
        cy.get('input[placeholder="Confirm Password"]').type('testtest1');
        cy.get('input[placeholder="Email"]').type('testtest1@test.no');
        cy.get('input[placeholder="Confirm Email"]').type('testtest1@test.no');
        cy.get('button').contains('Register').click()
        cy.wait(3000)
        cy.contains('Registration successful')
    })
    */
})