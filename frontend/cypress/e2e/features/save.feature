Feature: Salvar, gostar e compartilhar reservas
As a usuário “Cliente”
I want to salvar e compartilhar as reservas que eu gostar
So that eu posso salvar opções de reservas e ver depois e também mandar para contatos por meio das redes sociais

Scenario: Salvar reserva com sucesso
Given eu estou logado como cliente com o username "Bela" e a senha "ess1234"
And eu estou na página "/select-reservation" da reserva "Suite-campo"
When eu salvo a reserva "Suite-campo"
Then eu vejo um toast de sucesso com a mensagem “Reserva salva com sucesso”
And eu vou na página de "Lista de desejos" em "Meu Perfil"
And eu vejo "Suíte campo" salva