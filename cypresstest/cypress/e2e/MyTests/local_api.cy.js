describe('Sidebar links', () => {
    //Check Login Page Link
    it('Check Sidebar Links', () => {
        cy.fixture("sidebar_link.json").then((data) => {
            data.forEach(link => {
                cy.visit('http://localhost:3000/dashboard');
                cy.get('#MySidebar > ul > li').eq(link.elem).click({force: true});
                cy.url().should('include', link.link);
            });
        });
      });
  });