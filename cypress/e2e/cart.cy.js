/// <reference types="cypress" />   
//puxa a tipagem do cypress do node_modules

import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers';

describe('Automation Exercise Test Suite_CARRINHO', () => {
    beforeEach(() => {
        // Executa antes de cada teste
        cy.viewport('macbook-13');
        cy.visit('https://www.automationexercise.com/');
        cy.get('a[href="/login"]').click(); // Navega para a página de login/cadastro antes de cada teste

    });

    it('TC15-Comprar produtos e cadastrar um usuário', () => {
        //const timestamp = new Date().getTime();
        // Definindo email e a senha únicos para o cadastro
        const email = getRandomEmail();
        const number = getRandomNumber();
        const password = '123456';

        //Triplo AAA - Arrange, Act, Assert
        //ARRANGE
        cy.get('[data-qa="signup-name"]').type('Renata Taylor Tres');
        cy.get('[data-qa="signup-email"]').type(email);

        cy.get('[data-qa="signup-button"]').click();

        //Radio ou chekboxes -> check -> se for escolher id: cy.get('#id_gender2').check()
        cy.get('#id_gender2').check();

        // log: false para não mostrar a senha no log do Cypress
        cy.get('input#password').type(password, { log: false });

        //dropdowns -> select
        cy.get('select[data-qa=days]').select('10');
        cy.get('select[data-qa=months]').select('May');
        cy.get('select[data-qa=years]').select('1997');

        //radio ou checkboxes -> check
        cy.get('input[type=checkbox][id=newsletter]').check();
        cy.get('input[type=checkbox][id=optin]').check();

        cy.get('[data-qa=first_name]').type('Renata');
        cy.get('[data-qa=last_name]').type('Taylor Tres');
        cy.get('[data-qa=company]').type('New Company Inc. Second');
        cy.get('[data-qa=address]').type('Rua Nova Qa, 1253, Apt 46');
        cy.get('[data-qa=country]').select('Canada');
        cy.get('[data-qa=state]').type('Ontario');
        cy.get('[data-qa=city]').type('Toronto');
        cy.get('[data-qa=zipcode]').type('A1B 2C8');
        cy.get('[data-qa=mobile_number]').type('234 567 899');

        //ACT
        cy.get('button[data-qa=create-account]').click();

        //ASSERT
        //verifica se a url atual contém /account_created/
        cy.url().should('include', '/account_created');
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');

        cy.get('a[data-qa="continue-button"]').click(); //retorna para a página logada

        cy.get('a').should('contain.text', 'Logged in as');

        //Comprar produtos
        cy.get('a[data-product-id="3"]').first().click({ force: true }); //produto 1
        cy.get('h4[class="modal-title w-100"]').should('have.text', 'Added!');
        cy.wait(1000); // wait for modal to be fully visible
        cy.get('.modal-content').within(() => {
            cy.get('button.close-modal').click({ force: true }); //botão continue shopping (fechar modal)
        });

        cy.get('a[data-product-id="6"]').first().click({ force: true }); //produto 2
        cy.get('h4[class="modal-title w-100"]').should('have.text', 'Added!');
        cy.get('a[href="/view_cart"]').first().click(); //link para o carrinho

        cy.get('body').then($body => {
            if ($body.find('#cartModal').length) {
                cy.get('#cartModal').within(() => {
                    cy.get('.close, .btn-close, [data-dismiss="modal"]').first().click({ force: true });
                });
                cy.get('#cartModal').should('not.be.visible');
            }
        });
        cy.get('body').then($body => {
            if ($body.find('#cartModal.show').length) {
                // tenta fechar via botão
                cy.get('#cartModal').within(() => {
                    cy.get('.close, .btn-close, [data-dismiss="modal"]').first().click({ force: true });
                });
                cy.get('#cartModal').should('not.be.visible');
            }
        });

        cy.url().should('include', '/view_cart');

        cy.get('a[class="btn btn-default check_out"]').click();

        cy.url().should('include', '/checkout');

        cy.get('li[class="address_firstname address_lastname"]').should('be.visible');
        cy.get('a[href="/product_details/6"]').should('be.visible');
        cy.get('a[href="/product_details/3"]').should('be.visible');
        cy.get('#ordermsg').should('be.visible');
        cy.get('textarea[class="form-control"]').type('Please be carefull with package.');

        cy.get('a[href="/payment"]').click();

        cy.url().should('contain', '/payment');

        cy.get('input[data-qa="name-on-card"]').type('Renata Taylor Tres');
        cy.get('input[data-qa="card-number"]').type(number);
        cy.get('input[data-qa="cvc"]').type('123');
        cy.get('input[data-qa="expiry-month"]').type('12');
        cy.get('input[data-qa="expiry-year"]').type('2027');

        cy.get('button[data-qa="pay-button"]').click();

        cy.get('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!');
        cy.get('p:contains("Congratulations!")').should('exist');
        cy.get('p:contains("Your order has been confirmed!")').should('exist');

        cy.get('a[href="/delete_account"]').click();

        cy.get('h2[data-qa="account-deleted"]').should('have.text', 'Account Deleted!');

        cy.get('a[data-qa="continue-button"]').should('be.visible');

    });
});