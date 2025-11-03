/// <reference types="cypress" />   
//puxa a tipagem do cypress do node_modules

import {getRandomEmail} from '../support/helpers';

describe('Automation Exercise Test Suite_CADASTRO', () => {
    beforeEach(() => {
        // Executa antes de cada teste
        cy.viewport('macbook-13');
        cy.visit('https://www.automationexercise.com/');
        cy.get('a[href="/login"]').click(); // Navega para a página de login/cadastro antes de cada teste

    });

    it('TC1-Cadastrar um usuário', () => {
        //const timestamp = new Date().getTime();
        // Definindo email e a senha únicos para o cadastro
        const email = getRandomEmail();
        const password = '123456';
       
        //Triplo AAA - Arrange, Act, Assert
        //ARRANGE
        cy.get('[data-qa="signup-name"]').type('Renata Taylor Dois');
        cy.get('[data-qa="signup-email"]').type(email);

        cy.get('[data-qa="signup-button"]').click();

        //Radio ou chekboxes -> check -> se for escolher id: cy.get('#id_gender2').check()
        cy.get('#id_gender2').check();

        // log: false para não mostrar a senha no log do Cypress
        //cy.get('input#password').type('123456', { log: false }); 
        cy.get('input#password').type(password, { log: false });

        //dropdowns -> select
        cy.get('select[data-qa=days]').select('11');
        cy.get('select[data-qa=months]').select('May');
        cy.get('select[data-qa=years]').select('1998');
        
        //radio ou checkboxes -> check
        cy.get('input[type=checkbox][id=newsletter]').check();
        cy.get('input[type=checkbox][id=optin]').check();
        
        cy.get('[data-qa=first_name]').type('Renata');
        cy.get('[data-qa=last_name]').type('Taylor Dois');
        cy.get('[data-qa=company]').type('New Company Inc.');
        cy.get('[data-qa=address]').type('Rua Nova, 1233, Apt 45');
        cy.get('[data-qa=country]').select('Canada');
        cy.get('[data-qa=state]').type('Ontario');
        cy.get('[data-qa=city]').type('Toronto');
        cy.get('[data-qa=zipcode]').type('A1B 2C3');
        cy.get('[data-qa=mobile_number]').type('234 567 890');

        //ACT
        cy.get('[data-qa=create-account]').click();

        //ASSERT
        //verifica se a url atual contém /account_created/
        cy.url().should('include', '/account_created');
        //verifica se o texto 'Account Created!' está visível na página
        //cy.contains('b', 'Account Created!');
        cy.get('h2[data-qa="account-created"]')
          .should('be.visible')
          .and('have.text', 'Account Created!');
        //cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
    });

    it('TC5-Cadastrar usuário com e-mail existente no sistema', () => {
        // 1. Arrange
        const email = 'newjqa@example.com';

        cy.get('[data-qa="signup-name"]').type('Renata Taylor');
        cy.get('[data-qa="signup-email"]').type(email);
        
        // 2. Act
        cy.get('[data-qa="signup-button"]').click();
        
        // 3. Assert
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
        //cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/p').should('contain', 'Email Address already exist!');
        cy.contains('Email Address already exist!').should('be.visible');    
    }); 

});