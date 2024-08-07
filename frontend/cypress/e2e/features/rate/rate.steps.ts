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
Given('eu estou na página de {string} em {string}', (page: string, menuOption: string) => {
    cy.get('[data-cy="menu-c-button"]').trigger('mouseover');
    cy.contains(menuOption).should('be.visible').click();
    cy.contains(page).should('be.visible').click();
});

When('eu seleciono a opcao {string} do {string}', (option: string, hotelName: string) => {
    cy.contains(hotelName)
      .parents('[data-cy^="reservation-item-"]') // Encontra o contêiner da reserva
      .within(() => {
        if (option === 'Avaliar' || option == 'Editar') {
          cy.get(`[data-cy^="rate-button-"]`).click();
        } else if (option === 'Excluir Avaliação') {
          cy.get(`[data-cy^="delete-button-"]`).click();
        }
      });
  });

When('eu seleciono a estrela {string}', (starNumber: string) => {
  const index = parseInt(starNumber) - 1; // Convertendo o número da estrela para índice (zero-based)
  cy.get('[data-cy^="star-icon-"]')
    .eq(index)
    .should('be.visible')
    .click();
});
When('eu preencho o campo de comentários com {string}', (msg: string) => {
  cy.get('[data-cy="comments-input"]').clear().type(msg);

});
When('eu seleciono {string}', (button: string) => {
  cy.get(`[data-cy="submit-rating-button"]`).click();
 

});

Then('eu vejo um toast de sucesso com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
});

Then('eu vejo um toast de erro com a mensagem {string}', (message: string) => {
  cy.get('.Toastify__toast-body').should('contain.text', message);
});

Then('eu sou redirecionado para a página {string}', (page: string) => {
    cy.url().should('include', page);
});
Then('eu vejo minha avaliação da reserva {string} com {string} estrelas e comentário {string}', (hotelName: string, rating: string, comments: string) => {
  cy.contains(hotelName).closest('[data-cy^="reservation-item-"]').within(() => {
      // Verifica as estrelas
      const ratingNumber = parseInt(rating, 10);
      cy.get('.fa-star').should('have.length', 5).each(($star, index) => {
          if (index < ratingNumber) {
              cy.wrap($star).should('have.css', 'color', 'rgb(255, 193, 7)'); // Cor das estrelas preenchidas
          } else {
              cy.wrap($star).should('have.css', 'color', 'rgb(228, 229, 233)'); // Cor das estrelas vazias
          }
      });

      // Verifica o comentário
      cy.contains(comments).should('be.visible');
  });
});
Then('eu vejo minha avaliação da reserva {string} com {string} estrelas', (hotelName: string, rating: string) => {
  cy.contains(hotelName).closest('[data-cy^="reservation-item-"]').within(() => {
      // Verifica as estrelas
      const ratingNumber = parseInt(rating, 10);
      cy.get('.fa-star').should('have.length', 5).each(($star, index) => {
          if (index < ratingNumber) {
              cy.wrap($star).should('have.css', 'color', 'rgb(255, 193, 7)'); // Cor das estrelas preenchidas
          } else {
              cy.wrap($star).should('have.css', 'color', 'rgb(228, 229, 233)'); // Cor das estrelas vazias
          }
      });
  });
});

