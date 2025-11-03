/// <reference types="cypress" />   
//puxa a tipagem do cypress do node_modules

import {getRandomEmail} from '../support/helpers';

describe('Automation Exercise Test Suite_CONTATO (nao precisa de login)', () => {
    beforeEach(() => {
        // Executa antes de cada teste
        cy.viewport('macbook-13');
        cy.visit('https://www.automationexercise.com/');
        //cy.get('a[href="/login"]').click(); // Navega para a página de login/cadastro antes de cada teste

    });

it('TC6-Enviar formulário de contato com upload de arquivo', () => {
        //const timestamp = new Date().getTime();
        const email = getRandomEmail();
        //const password = '123456';

        //cy.get('[data-qa="login-email"]').type(email);
        //cy.get('[data-qa="login-password"]').type(password, { log: false });
        
        cy.get('a[href="/contact_us"]').click();

        //Preencher o formulário de contato
        cy.get('[data-qa=name]').type('Renata Taylor');
        cy.get('[data-qa=email]').type(email);
        cy.get('[data-qa=subject]').type('I would like more informations about my purchase');
        cy.get('[data-qa=message]').type('Hello, I dont know how to track my order. How could you help me? I let a image for helps.');

        // Upload de arquivo - o cy.fixture é usado para carregar arquivos de fixtures e armazena num arquivo temporário (fileToUpload)
        //cy.fixture('capa_teste_jpg.jpg').as('fileToUpload');
        //cy.get('input[type=file]').selectFile('@fileToUpload');
        cy.get('input[type=file]').selectFile('cypress/fixtures/capa_teste_jpeg.jpeg');

        cy.get('[data-qa=submit-button]').click();

        // Verificar se a mensagem de sucesso é exibida
        cy.get('.btn.btn-success').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    });
});