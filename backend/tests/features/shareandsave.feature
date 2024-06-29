Feature: Salvar, gostar e compartilhar reservas
As a usuário “Cliente”
I want to salvar e compartilhar as reservas que eu gostar
So that eu posso salvar opções de reservas e ver depois e também mandar para contatos por meio das redes sociais

Scenario: Salvar reserva
    Given existe um usuário "Cliente" logado com o e-mail "acfml.cin.ufpe.br" e a senha "1234"
    And um quarto no hotel "Porto de Galinhas" está nas reservas publicadas
    When uma requisição POST é enviada para "/saved-reservations"
    Then o status da resposta deve ser "201"
    And é retornada a mensagem "A reserva foi salva com sucesso!"

Scenario: Excluir reserva salva
    Given existe um usuário "Cliente" logado com o e-mail "mlng@cin.ufpe.br" e a senha "54321"
    And o "Hotel Maragogi" está na listagem de reservas salvas
    When uma requisição DELETE é enviada para "/saved-reservations/1/1"
    Then o status da resposta deve ser "200"
    And é retornada a mensagem "A reserva foi removida dos salvos com sucesso!"
