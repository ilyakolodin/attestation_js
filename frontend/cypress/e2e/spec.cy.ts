describe('template spec', () => {
  it('should login and exit', () => {
    cy.visit('http://localhost:9000/')

    cy.get('input[name="login"]:first').type("asd")
    cy.get('input[name="password"]:first').type("asd")
    cy.get('button:first').click()
    cy.contains('Выйти').click()
  })
})