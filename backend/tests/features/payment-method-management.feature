Feature: Cadastro e Manuten��o de M�todos de Pagamento
As a Usu�rio Cliente
I want to Cadastrar, alterar e excluir m�todos de pagamento
So that Eu posso realizar pagamentos com m�todos diferentes 


Scenario 1: Cadastrar M�todo de pagamento com sucesso
  Given eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�
  and eu estou na p�gina �Meus M�todos de Pagamento�
  and nenhum m�todo de pagamento est� cadastrado 
  When eu seleciono a op��o �Cadastrar novo m�todo de pagamento�
  and eu preencho o campo �nome titular� com �Matheus silva�
  and eu preencho campo �n�mero cart�o� com �1234 5678 9123 4567� 
  and eu preencho o campo �cvc� com �123�
  and eu seleciono o campo  �Tipo� com �d�bito� 
  and eu preencho o campo �apelido� com �Cart�o Ita��
  Then eu tento realizar o cadastro
  and eu vejo a mensagem �Cart�o cadastrado com sucesso!�
  and eu vejo �Cart�o ita��  na p�gina �Meus M�todos de Pagamento�
	
Scenario 2: Tentativa de Cadastro de M�todo de pagamento  j� cadastrado
  Given eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�
  and eu estou na p�gina �Meus M�todos de Pagamento�
  and o m�todo de pagamento �Cart�o ita�� est� cadastrado com o campo �Tipo� com o valor �d�bito�
  When eu seleciono a op��o �Cadastrar novo m�todo de Pagamento� 
  and eu preencho o campo �nome titular� com �Matheus silva�
  and eu preencho campo �n�mero cart�o� com �1234 5678 9123 4567� 	
  and eu preencho o campo "data de validade" com "07-2030"
  and eu preencho o campo �cvc� com �123�
  and eu seleciono o campo  �Tipo� com �d�bito� 
  and eu preencho o campo �apelido� com �Cart�o Ita��
  Then eu tento realizar o cadastro
  and eu vejo a mensagem �Cart�o j� Cadastrado!�
  and eu vejo �Cart�o ita��  na p�gina �Meus M�todos de Pagamento�

Scenario 3: Tentativa de Cadastrar M�todo de pagamento com informa��es insuficientes
  Given eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�
  and eu estou na p�gina �Meus M�todos de Pagamento�
  and o m�todo de pagamento �Cart�o ita�� n�o est� cadastrado
  When eu seleciono a op��o �Cadastrar novo m�todo de pagamento� 
  and eu preencho o campo �nome titular� com �Matheus silva�
  and eu preencho campo �n�mero cart�o� com �1234 5678 9123 4567� 
  and eu seleciono o campo  �Tipo� com �d�bito� 
  and eu preencho o campo �apelido� com �Cart�o Ita��
  Then eu tento realizar o cadastro
  and eu vejo a mensagem �Campos n�o foram totalmente preenchidos�
  and eu continuo o cadastro do m�todo de pagamento

Scenario 4: Alterar m�todo de pagamento com sucesso
  Given eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�
  and eu estou na p�gina �Meus M�todos de Pagamento�
  and o m�todo de pagamento �Cart�o ita�� est� cadastrado com Campo �Tipo� com o valor  �d�bito�
  When eu seleciono a op��o �Alterar� no m�todo de pagamento �Cart�o ita��
  and eu seleciono o campo  �Tipo� com �cr�dito� 
  Then eu tento realizar a atualiza��o
  and eu vejo a mensagem ��Cart�o Ita�� alterado com Sucesso!�
  and eu vejo �Cart�o ita��  na p�gina �Meus M�todos de Pagamento� com o �Tipo� �Cr�dito�

Scenario 5:  Tentativa de Alterar m�todo de pagamento com informa��o em Branco
  Given eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�
  and eu estou na p�gina �Meus M�todos de Pagamento�
  and o m�todo de pagamento �Cart�o ita�� est� cadastrado e o campo �cvc� com valor �123�
  When eu seleciono a op��o �Alterar� no m�todo de pagamento �Cart�o ita��
  and eu preencho  o campo  �cvc� com �   � 
  Then eu tento realizar o cadastro
  and eu vejo a mensagem �Campos n�o foram totalmente preenchidos�
  and eu continuo a altera��o do m�todo de pagamento

Scenario 6: Deletar m�todo de pagamento com sucesso
  Given eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�
  and eu estou na p�gina �Meus M�todos de Pagamento�
  and o m�todo de pagamento �Cart�o ita�� est� cadastrado 
  When eu seleciono a op��o �Deletar� no m�todo de pagamento �Cart�o ita��
  Then eu vejo a mensagem �Deseja deletar m�todo de pagamento?�
  and eu seleciono a op��o �sim�
  and eu vejo a mensagem �M�todo de pagamento Deletado  com Sucesso!�
	
Scenario 7: Desist�ncia de exclus�o de m�todo de pagamento
  Given eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�
  and eu estou na p�gina �Meus M�todos de Pagamento�
  and o m�todo de pagamento �Cart�o ita�� est� cadastrado 
  When eu seleciono a op��o �Deletar� no m�todo de pagamento �Cart�o ita��
  Then eu vejo a mensagem �Deseja deletar m�todo de pagamento?�
  and eu seleciono a op��o �n�o�
  and eu continuo na p�gina �Meus M�todos de Pagamento�