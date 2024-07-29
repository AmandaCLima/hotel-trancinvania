import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('eu estou logado como cliente com o username {string} e a senha {string}', (username: string, password: string) => {
    cy.visit('/client/login');
    cy.get('[data-cy="username-c"]').type(username);
    cy.get('[data-cy="password-c"]').type(password);
    cy.get('[data-cy="login-button-c"]').click();
});
Given('eu não estou logado', (page: string, hotelName: string) => {
    cy.visit('/reservations');
});

Given('eu estou na página {string} da reserva {string}', (page: string, hotelName: string) => {
    cy.get(`[data-cy="${hotelName}"]`).click();
    cy.url().should('include', page);  
});
Given('eu estou na página de {string} em {string}', (page: string, menuOption: string) => {
    cy.get('[data-cy="menu-c-button"]').trigger('mouseover');
    cy.contains(menuOption).should('be.visible').click();
    cy.contains(page).should('be.visible').click();
});
Given('existe uma reserva salva do {string}', (hotelName: string) => {
    cy.contains(hotelName).should('be.visible')
});

When('eu salvo a reserva {string}', (hotelName: string) => {
    cy.contains('Salvar').should('be.visible').click();
});
When('eu tento excluir a reserva salva {string}', (hotelName: string) => {
    // Encontra a reserva pelo nome e clica no botão de deletar associado
    cy.contains(hotelName)
      .parents('[data-cy^="reservation-item-"]') // Seletor para os itens de reserva
      .find('[data-cy="delete-button"]') // Seletor para o botão de deletar
      .click();
});


When('eu tento salvar a reserva {string}', (hotelName: string) => {
    cy.contains('Salvar').should('be.visible').click();
});
Then('eu vejo um toast de sucesso com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
});
Then('eu vejo um toast de erro com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
})
Then('eu vou na página de {string} em {string}', (page: string, menuOption: string) => {
    cy.get('[data-cy="menu-c-button"]').trigger('mouseover');
    cy.contains(menuOption).should('be.visible').click();
    cy.contains(page).should('be.visible').click();
});

Then('eu vejo {string} salva' ,(hotelName: string) => {
    cy.contains(hotelName).should('be.visible');
});



