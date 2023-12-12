const loginUser = () => {
    const name = 'cypresstest';  
    cy.session(name, () => {

        window.localStorage.setItem('user', JSON.stringify({
            name: name, 
            email: "cypress@test.no", 
            country:"LX", 
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
  

describe('visits the dashboard page', () => {

    beforeEach(() => {
        loginUser()
    })  
    
    it('visits url and renders page', () => {
      cy.visit('http://localhost:3000/dashboard')

      cy.contains('Join a game')
    })
})