Feature: Avaliar Reserva
As a usuário “Cliente”
I want to avaliar uma reserva que já foi feita
So that outros usuários possam ver a minha opinião sobre a reserva

Scenario: Avaliação de reserva bem sucedida com comentário
  Given eu estou logado como cliente com o username "Amandinha" e a senha "ess1234"
  And eu estou na página de "Avaliações" em "Meu Perfil"
  When eu seleciono a opcao 'Avaliar' do 'Quarto Luxo'
  And eu seleciono a estrela '3'
  And eu preencho o campo de comentários com 'Valeu a pena'
  And eu seleciono 'Enviar Avaliação'
  Then eu vejo um toast de sucesso com a mensagem 'Avaliação enviada com sucesso!'
  And eu vejo minha avaliação da reserva 'Quarto Luxo' com '3' estrelas e comentário 'Valeu a pena'

Scenario: Edição da avaliação de reserva bem sucedida
  Given eu estou logado como cliente com o username "Amandinha" e a senha "ess1234"
  And eu estou na página de "Avaliações" em "Meu Perfil"
  When eu seleciono a opcao 'Editar' do 'Quarto Luxo'
  And eu seleciono a estrela '5'
  And eu preencho o campo de comentários com 'Excelente estadia'
  And eu seleciono 'Enviar Avaliação'
  Then eu vejo um toast de sucesso com a mensagem 'Avaliação atualizada com sucesso!'
  And eu vejo minha avaliação da reserva 'Quarto Luxo' com '5' estrelas e comentário 'Excelente estadia'

Scenario: Avaliação de reserva bem sucedida sem comentário
  Given eu estou logado como cliente com o username "Amandinha" e a senha "ess1234"
  And eu estou na página de "Avaliações" em "Meu Perfil"
  When eu seleciono a opcao 'Avaliar' do 'Suite campo'
  And eu seleciono a estrela '3'
  And eu seleciono 'Enviar Avaliação'
  Then eu vejo um toast de sucesso com a mensagem 'Avaliação enviada com sucesso!'
  And eu vejo minha avaliação da reserva 'Suite campo' com '3' estrelas

Scenario: Excluir avaliação
  Given eu estou logado como cliente com o username "Amandinha" e a senha "ess1234"
  And eu estou na página de "Avaliações" em "Meu Perfil"
  When eu seleciono a opcao 'Excluir Avaliação' do 'Suite campo'
  Then eu vejo um toast de sucesso com a mensagem 'Avaliação excluída com sucesso!'
