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
        // Asserção de visibilidade para garantir que a página carregou
        cy.get('a[href="/login"]').should('be.visible').click(); // Navega para a página de login/cadastro
    });

    it('TC15-Comprar produtos e cadastrar um usuário', () => {
        // Definindo email e a senha únicos para o cadastro
        const email = getRandomEmail();
        // O número do cartão pode ser simples, já que é um teste de UI
        const cardNumber = getRandomNumber(); // Mantendo a variável original

        // --- 1. CADASTRO DE USUÁRIO (ARRANGE) ---
        cy.log('**Iniciando Cadastro do Usuário**');
        cy.get('[data-qa="signup-name"]').type('Renata Taylor Tres');
        cy.get('[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"]').click();

        // Formulário de Informação da Conta
        cy.get('#id_gender2').check();
        cy.get('input#password').type('123456', { log: false }); // Senha fixa é aceitável em testes
        
        cy.get('select[data-qa=days]').select('10');
        cy.get('select[data-qa=months]').select('May');
        cy.get('select[data-qa=years]').select('1997');

        cy.get('input[id=newsletter]').check();
        cy.get('input[id=optin]').check();

        // Detalhes de Endereço
        cy.get('[data-qa=first_name]').type('Renata');
        cy.get('[data-qa=last_name]').type('Taylor Tres');
        cy.get('[data-qa=company]').type('New Company Inc. Second');
        cy.get('[data-qa=address]').type('Rua Nova Qa, 1253, Apt 46');
        cy.get('[data-qa=country]').select('Canada');
        cy.get('[data-qa=state]').type('Ontario');
        cy.get('[data-qa=city]').type('Toronto');
        cy.get('[data-qa=zipcode]').type('A1B 2C8');
        cy.get('[data-qa=mobile_number]').type('234 567 899');

        // Cria a conta
        cy.get('button[data-qa=create-account]').click();

        // Asserções de Criação de Conta
        cy.url().should('include', '/account_created');
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
        cy.get('a[data-qa="continue-button"]').click();

        // Verifica o status de login
        cy.get('ul.nav.navbar-nav').should('contain.text', 'Logged in as');

        // --- 2. ADICIONAR PRODUTOS (ACT) ---
        cy.log('**Adicionando Produtos ao Carrinho**');
        
        const CART_MODAL = '#cartModal';
        const VIEW_CART_LINK = 'a[href="/view_cart"]';
        const CLOSE_MODAL_BUTTON = 'button.close-modal';

        // Função auxiliar para adicionar item e fechar o modal
        const addItemAndCloseModal = (productId) => {
            // Clicar em Adicionar ao Carrinho
            cy.get(`a[data-product-id="${productId}"]`).first().click(); 
            
            // 💡 ASSERÇÃO: Espera que o modal de sucesso apareça
            cy.get(CART_MODAL).should('be.visible').within(() => {
                cy.get('h4.modal-title').should('have.text', 'Added!');
                
                // Clicar em "Continue Shopping" (Botão de fechar)
                cy.get(CLOSE_MODAL_BUTTON).click(); 
            });

            // 💡 CORREÇÃO PRINCIPAL: Espera que o modal desapareça *antes* de continuar
            cy.get(CART_MODAL).should('not.be.visible');
        };

        // Produto 1
        addItemAndCloseModal(3);

        // Produto 2
        addItemAndCloseModal(6); 
        
        // --- 3. CHECKOUT (ACT) ---
        cy.log('**Navegando para o Carrinho**');

        // Clicar no link do Carrinho (garantimos que o modal não está na frente)
        cy.get(VIEW_CART_LINK).first().click(); 
        
        // Asserções no Carrinho
        cy.url().should('include', '/view_cart');
        cy.get('a.check_out').click();

        // Asserções na página de Checkout
        cy.url().should('include', '/checkout');
        cy.get('li.address_firstname.address_lastname').should('be.visible');
        cy.get('a[href="/product_details/6"]').should('be.visible');
        cy.get('a[href="/product_details/3"]').should('be.visible');
        
        cy.get('#ordermsg').should('be.visible');
        cy.get('textarea.form-control').type('Please be careful with package.');

        cy.get('a[href="/payment"]').click();

        // Asserções na página de Pagamento
        cy.url().should('contain', '/payment');

        cy.get('input[data-qa="name-on-card"]').type('Renata Taylor Tres');
        cy.get('input[data-qa="card-number"]').type(cardNumber);
        cy.get('input[data-qa="cvc"]').type('123');
        cy.get('input[data-qa="expiry-month"]').type('12');
        cy.get('input[data-qa="expiry-year"]').type('2027');

        cy.get('button[data-qa="pay-button"]').click();

        // Asserções de Pedido Realizado
        cy.get('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!');
        cy.contains('p', 'Congratulations!').should('exist'); // Usando cy.contains é mais limpo
        cy.contains('p', 'Your order has been confirmed!').should('exist');

        // --- 4. EXCLUIR CONTA ---
        cy.get('a[href="/delete_account"]').click();

        // Asserções de Exclusão de Conta
        cy.get('h2[data-qa="account-deleted"]').should('have.text', 'Account Deleted!');
        cy.get('a[data-qa="continue-button"]').should('be.visible');

    });
});