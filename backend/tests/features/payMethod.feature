Feature: Gest�o de M�todo de Pagamento


Scenario: Cadastrar Metodo de Pagamento com Sucesso
    Given nenhum metodo de pagamento esta cadastrado
    When cadastro um novo metodo de pagamento com nome "Visa", numCard "4111111111111111", cvv "123", validade "07/2023", tipo "CREDITO", cpf "12345678990"
    Then vejo a mensagem "Cartao Cadastrado com Sucesso"
    And vejo "Visa" na lista de m�todos de pagamento

  Scenario: Alterar Metodo de Pagamento com Sucesso
    Given o m�todo de pagamento "Visa" est� cadastrado com o tipo "CREDITO"
    When altero o m�todo de pagamento "Visa" para o tipo "DEBITO"
    Then vejo a mensagem "Metodo de Pagamento Alterado com Sucesso"
    And vejo "Visa" com o tipo "DEBITO" na lista de m�todos de pagamento

  Scenario: Deletar Metodo de Pagamento com Sucesso
    Given o m�todo de pagamento "Visa" est� cadastrado
    When deleto o m�todo de pagamento "Visa"
    Then vejo a mensagem "Metodo de pagamento Deletado com Sucesso"
    And n�o vejo "Visa" na lista de m�todos de pagamento
