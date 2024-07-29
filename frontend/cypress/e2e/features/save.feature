Feature: Salvar, gostar e compartilhar reservas
As a usuário “Cliente”
I want to salvar e compartilhar as reservas que eu gostar
So that eu posso salvar opções de reservas e ver depois e também mandar para contatos por meio das redes sociais

Scenario: Salvar reserva com sucesso
Given eu estou logado como cliente com o username "Bela" e a senha "ess1234"
And eu estou na página "/select-reservation" da reserva "Suite-campo"
When eu salvo a reserva "Suite-campo"
Then eu vejo um toast de sucesso com a mensagem 'Reserva salva com sucesso!'
And eu vou na página de "Lista de desejos" em "Meu Perfil"
And eu vejo 'Suite campo' salva

Scenario: Salvar reserva sem sucesso (usário não logado)
Given eu não estou logado
And eu estou na página "/select-reservation" da reserva "Suite-campo"
When eu tento salvar a reserva "Suite-campo"
Then eu vejo um toast de erro com a mensagem 'Você precisa estar logado para salvar a reserva.'

Scenario: Excluir reserva salva
Given eu estou logado como cliente com o username "Amandinha" e a senha "ess1234"
And eu estou na página de "Lista de desejos" em "Meu Perfil"
And existe uma reserva salva do 'Quarto Luxo'
When eu tento excluir a reserva salva 'Quarto Luxo'
Then eu vejo um toast de sucesso com a mensagem 'Reserva apagada com sucesso!'


