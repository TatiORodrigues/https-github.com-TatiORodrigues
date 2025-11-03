/// <reference types="cypress" />   
//puxa a tipagem do cypress do node_modules

describe('TC8 - TC9 - TC10 - Testes que não precisam de login', () => {
    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.visit('https://www.automationexercise.com/'); // FICA NA HOME PAGE
    });

    it('TC8-Verificar a lista de produtos e os detalhes de produto', () => {
        
        // A PARTIR DAQUI, O TESTE COMEÇA NA HOME PAGE
        // 1. Clica no link de produtos
        //cy.get('a[href="/products"]').should('have.text', 'Products').click();
        cy.contains('a[href="/products"]', 'Products').click();
        
        // 2. Asserção que falhou anteriormente (agora deve passar)
        cy.url().should('include', '/products');
        
        // 3. Continuação das suas asserções na página de produtos
        cy.get('#search_product').should('be.visible');
        cy.get('.features_items').should('be.visible');
        cy.get('a[href="/product_details/1"]').should('be.visible').click();
        
        // 4. Asserções na página de detalhes do produto
        cy.get('.product-information').should('be.visible');
        cy.get('img[src="/get_product_picture/1"]').should('be.visible');
        cy.get('h2').contains('Blue Top').should('be.visible');
        cy.get('p').contains('Category: Women > Tops').should('be.visible');
        cy.get('img[src="/static/images/product-details/rating.png"]').should('be.visible');
        cy.get('span').contains('Rs. 500').should('be.visible');
        cy.get('label').contains('Quantity:').should('be.visible');
        cy.get('input[type="number"]#quantity').should('be.visible');
        cy.get('button.btn.btn-default.cart').should('be.visible');
        cy.get('b').contains('Availability:').should('be.visible');
        cy.get('b').contains('Condition:').should('be.visible');
        cy.get('b').contains('Brand:').should('be.visible');
        cy.get('a[href="#reviews"]').should('be.visible');
    });
});
