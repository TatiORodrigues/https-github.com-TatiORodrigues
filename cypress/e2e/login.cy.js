/// <reference types="cypress" />   
//puxa a tipagem do cypress do node_modules

//import { 
    //getRandomNumber,
    //getRandomEmail
//} from '../support/helpers';

describe('Automation Exercise Test Suite_LOGIN', () => {
    beforeEach(() => {
        // Executa antes de cada teste
        cy.viewport('macbook-13');
        cy.visit('https://www.automationexercise.com/');
        cy.get('a[href="/login"]').click(); // Navega para a página de login/cadastro antes de cada teste

    });

it('TC2-Login de usuário com e-mail e senha corretos', () => {
        // 1. Arrange
        const email = 'newjqa@example.com';
        const password = '123456';
        // 2. Act
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(password, { log: false });

        cy.get('[data-qa="login-button"]').click();

        // 3. Assert
        cy.get('a[href="/logout"]').should('be.visible');
        //cy.contains('a[href="/logout"]', { timeout: 10000 });
    });


    it('TC3-Login de usuário com e-mail correto e senha incorreta', () => {
        const email = 'newjqa@example.com';
        const password = '12345';

        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(password, { log: false });
        //cy.get('[data-qa="login-password"]').type('12345', { log: false });

        cy.get('[data-qa="login-button"]').click();

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
        
    });

    it('TC4-Logout de usuário', () => {
        // 1. Arrange
        const email = 'newjqa@example.com';
        const password = '123456';
        // 2. Act
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(password, { log: false });
    
        cy.get('[data-qa="login-button"]').click();

        cy.get('a[href="/logout"]').click();

        // 3. Assert
        cy.url().should('contain', '/login');
        cy.contains('Login to your account').should('be.visible');

    });
});