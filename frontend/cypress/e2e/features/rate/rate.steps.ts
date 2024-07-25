import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('eu estou logado como cliente com o username {string} e a senha {string}', (username: string, password: string) => {
    cy.visit('/client/login');
    cy.get('[data-cy="username-c"]').type(username);
    cy.get('[data-cy="password-c"]').type(password);
    cy.get('[data-cy="login-button-c"]').click();
});

Given('eu estou na página {string}', (page: string) => {
    cy.visit(page);
    cy.url().should('include', page);
});

When('eu seleciono a opcao {string} do {string}', (option: string, hotelName: string) => {
    cy.contains(hotelName).parent().within(() => {
        cy.contains(option).click();
    });
});

When('eu seleciono {string}', (button: string) => {
    cy.get(`[data-cy="${button}"]`).click();
});
Given('eu estou na página de {string} em {string}', (page: string, menuOption: string) => {
    cy.get('[data-cy="menu-c-button"]').trigger('mouseover');
    cy.contains(menuOption).should('be.visible').click();
    cy.contains(page).should('be.visible').click();
});

When('eu preencho o campo {string} com {string}', (field: string, value: string) => {
    cy.get(`[data-cy="${field}"]`).type(value);
});

Then('eu vejo um toast de sucesso com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
});

Then('eu sou redirecionado para a página {string}', (page: string) => {
    cy.url().should('include', page);
});

Then('eu vejo minha avaliação da {string} com nota {string} e comentário {string}', (hotelName: string, rating: string, comments: string) => {
    cy.contains(hotelName).should('be.visible');
    cy.contains(rating).should('be.visible');
    cy.contains(comments).should('be.visible');
});
