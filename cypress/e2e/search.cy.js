describe('TC8 - TC9 - TC10 - Testes que não precisam de login', () => {
    // NOVO beforeEach: Sobrescreve o comportamento inicial, apenas visitando a Home
    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.visit('https://www.automationexercise.com/'); // FICA NA HOME PAGE
    });

it('TC9-Procurar produtos', () => {
        cy.get('a[href="/products"]').should('include.text', 'Products');
        cy.get('a[href="/products"]').click();

        cy.url().should('include', '/products');

        //cy.contains('a[href="/products"]').should('have.text', 'Products');
        //cy.contains('a[href="/products"]', 'Products').click();
        
        //cy.get('a[href="/products"]').click();

        cy.get('.features_items').should('be.visible');
        cy.get('#search_product').should('be.visible');

        cy.get('#search_product').type('Men Tshirt').click();

        cy.get('.title.text-center').should('be.visible');
        cy.get('p').contains('Men Tshirt').should('be.visible');
    }); 
});