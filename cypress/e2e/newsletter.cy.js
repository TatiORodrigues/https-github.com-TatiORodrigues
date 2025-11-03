/// <reference types="cypress" />   
//puxa a tipagem do cypress do node_modules

import { 
    getRandomNumber,
    getRandomEmail
} from '../support/helpers';

describe('TC8 - TC9 - TC10 - Testes que não precisam de login', () => {
    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.visit('https://www.automationexercise.com/'); // FICA NA HOME PAGE
    });

    it('TC10-Subscrição de Newsletter', () => {
        //const timestamp = new Date().getTime();
        const email = getRandomEmail();

        cy.wait(2000);
        cy.get('h2').contains('Subscription').should('be.visible');
        // Find the email input inside the Subscription section to be resilient to id changes
        cy.contains('h2', 'Subscription').parent().find('input[type="email"]').should('be.visible').type(email);

        cy.get('button#subscribe').click();

        // The success message may be rendered without the same class across environments.
        // Check for a visible message containing 'subscribed' to be more tolerant.
        cy.contains(/subscribed/i, { timeout: 10000 }).should('be.visible');
    }); 
});