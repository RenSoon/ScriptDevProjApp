{/* <reference types="cypress" /> */}

describe('Login page', () => {
    it('allows a user to login with valid credentials', () => {
      cy.visit('http://localhost:3000');
  
      cy.fixture('account.json').then((login) => {
        cy.get('#Email').type(login.email);
        cy.get('#Password').type(login.password);
      });
  
      cy.get('#LoginBtn').click();
    });
  });