Feature: Avaliar Reserva
As a usuário “Cliente”
I want to avaliar uma reserva que já foi feita
So that outros usuários possam ver a minha opinião sobre a reserva

Scenario: Avaliação de reserva bem sucedida
Given existe um usuário "Cliente" logado com o e-mail "acfml@cin.ufpe.br" e a senha "12345"
And o “Hotel fazenda em Gravatá” está na listagem de reserva
When uma requisição POST é enviada para "/rated-reservations" com nota de 3.7”  e comentário “Valeu a pena”
Then é retornada a mensagem “Avaliação realizada com sucesso”
 And o status da resposta deve ser "201"

Scenario: Deletar avaliação de uma reserva
Given existe um usuário "Cliente" logado com o e-mail "acfml@cin.ufpe.br" e a senha "12345"
And existe uma avaliação de reserva com client_id “1” , reservation_id “1”, nota “4.5” e comentário “Muito bom”
When uma requisição DELETE é enviada para "/rated-reservations/1/1"
Then é retornada a mensagem “Avaliação deletada com sucesso”
 And o status da resposta deve ser "204"
