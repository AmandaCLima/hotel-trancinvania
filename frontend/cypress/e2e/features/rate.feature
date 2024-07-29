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
