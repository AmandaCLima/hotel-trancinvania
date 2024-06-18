import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/app';
import { prismaMock } from '../../setupTests';
import { PaymentMethod } from '@prisma/client';

const feature = loadFeature('tests/features/payment-method-management.feature');

const mockPayMethod =  {
    id: 20,
    name: 'Cart�o Ita�',
    numCard: '1234567890123456',
    cvv: '123',
    expiryDate: '07/2030',
    type: 'DEBITO',
    clientId: 1,
    cpf: '12345678909',
  };

defineFeature(feature, (test) => {
  let response: request.Response;
  let payload: PaymentMethod;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Cadastrar M�todo de pagamento com sucesso', ({ given, when, then }) => {
    given('eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�', () => {
      // Mock para criar um novo m�todo de pagamento
      prismaMock.paymentMethod.create.mockResolvedValue({ ...payload });
    });

    when('eu preencho os campos obrigat�rios para cadastrar um novo m�todo de pagamento', async () => {
      payload = {
        id : 20,
        name: 'Cart�o Ita�',
        numCard: '1234567890123456',
        cvv: 123,
        expiryDate: '07/2030',
        type: 'DEBITO',
        clientId: 1,
        cpf: '12345678909',
      };
      response = await request(app).post('/client/paymentMethods').send(payload);
    });

    then('eu vejo a mensagem "Cart�o cadastrado com sucesso!"', () => {
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cart�o cadastrado com sucesso!');
    });

    then('eu vejo "Cart�o Ita�" na p�gina "Meus M�todos de Pagamento"', async () => {
      prismaMock.paymentMethod.findMany.mockResolvedValue([{
        id: 1,
        name: 'Cart�o Ita�',
        numCard: '1234567890123456',
        cvv: 123,
        expiryDate: '07/2030',
        type: 'DEBITO',
        clientId: 1,
        cpf: '12345678909',
      }]);

      const methodsResponse = await request(app).get('/client/paymentMethods');
      expect(methodsResponse.body).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: "Cart�o Ita�" })
      ]));
    });

  test('Scenario 4: Alterar m�todo de pagamento com sucesso', ({ given, when, then }) => {
        given('eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�', () => {
          prismaMock.paymentMethod.findUnique.mockResolvedValue({
            id: 20,
            name: 'Cart�o Ita�',
            numCard: '1234567890123456',
            cvv: 123,
            expiryDate: '07/2030',
            type: 'DEBITO',
            clientId: 1,
            cpf: '12345678909',
          });
        });
    
        when('eu seleciono a op��o �Alterar� no m�todo de pagamento �Cart�o Ita��', async () => {
          payload = {
            id : 20,
            name: 'Cart�o Ita�',
            numCard: '1234567890123456',
            cvv: 123,
            expiryDate: '07/2030',
            type: 'CREDITO',
            clientId: 1,
            cpf: '12345678909',
          };
          response = await request(app).patch('/client/paymentMethods/').send(payload);
        });
    
        then('eu vejo a mensagem "M�todo de Pagamento Alterado com Sucesso"', () => {
          expect(response.status).toBe(200);
          expect(response.body.message).toBe('M�todo de Pagamento Alterado com Sucesso');
        });
    
        then('eu vejo �Cart�o Ita�� na p�gina �Meus M�todos de Pagamento�', async () => {
          prismaMock.paymentMethod.findMany.mockResolvedValue([{
            id: 20,
            name: 'Cart�o Ita�',
            numCard: '1234567890123456',
            cvv: 123,
            expiryDate: '07/2030',
            type: 'CREDITO',
            clientId: 1,
            cpf: '12345678909',
          }]);
    
          const methodsResponse = await request(app).get('/client/paymentMethods');
          expect(methodsResponse.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'Cart�o Ita�', type: 'CREDITO' })
          ]));
        });
      });
    
      test('Scenario 6: Deletar m�todo de pagamento com sucesso', ({ given, when, then }) => {
        given('eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�', () => {
          prismaMock.paymentMethod.findUnique.mockResolvedValue({
            id: 20,
            name: 'Cart�o Ita�',
            numCard: '1234567890123456',
            cvv: 123,
            expiryDate: '07/2030',
            type: 'DEBITO',
            clientId: 1,
            cpf: '12345678909',
          });
        });
    
        when('eu seleciono a op��o �Deletar� no m�todo de pagamento �Cart�o Ita��', async () => {
          response = await request(app).delete('/client/paymentMethods/1');
        });
    
        then('eu vejo a mensagem �M�todo de pagamento Deletado com Sucesso�', () => {
          expect(response.status).toBe(200);
          expect(response.body.message).toBe('M�todo de pagamento Deletado com Sucesso');
        });
    
        then('eu n�o vejo �Cart�o Ita�� na p�gina �Meus M�todos de Pagamento�', async () => {
          prismaMock.paymentMethod.findMany.mockResolvedValue([]); // Empty list after deletion
    
          const methodsResponse = await request(app).get('/client/paymentMethods');
          expect(methodsResponse.body).not.toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'Cart�o Ita�' })
          ]));
        });
      });
    });
});



// import { defineFeature, loadFeature } from 'jest-cucumber';
// import request from 'supertest';
// import app from '../../src/app';
// import { prismaMock } from '../../setupTests';

// const feature = loadFeature('tests/features/payment-method-management.feature');

// defineFeature(feature, (test) => {
//   let response: request.Response;
//   let payload: any;

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('Scenario 1: Cadastrar M�todo de pagamento com sucesso', ({ given, when, then }) => {
//     given('eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�', () => {
//       // Mock para criar um novo m�todo de pagamento
//       prismaMock.paymentMethod.create.mockResolvedValue({ id: 1, ...payload });
//     });

//     when('eu preencho os campos obrigat�rios para cadastrar um novo m�todo de pagamento', async () => {
//       payload = {
//         name: 'Cart�o Ita�',
//         numCard: '1234567890123456',
//         cvv: '123',
//         expiryDate: '07/2030',
//         type: 'DEBITO',
//         clientId: 1,
//         cpf: '12345678909',
//       };
//       response = await request(app).post('/client/paymentMethods').send(payload);
//     });

//     then('eu vejo a mensagem �Cart�o cadastrado com sucesso!�', () => {
//       expect(response.status).toBe(201); // Status code for resource creation
//       expect(response.body.message).toBe('Cart�o cadastrado com sucesso!');
//     });

//     then('eu vejo �Cart�o Ita�� na p�gina �Meus M�todos de Pagamento�', async () => {
//       prismaMock.paymentMethod.findMany.mockResolvedValue([{
//         id: 1,
//         name: 'Cart�o Ita�',
//         numCard: '1234567890123456',
//         cvv: 123,
//         expiryDate: '07/2030',
//         type: 'DEBITO',
//         clientId: 1,
//         cpf: '12345678909',
//       }]);

//       const methodsResponse = await request(app).get('/client/paymentMethods');
//       expect(methodsResponse.body).toEqual(expect.arrayContaining([
//         expect.objectContaining({ name: 'Cart�o Ita�' })
//       ]));
//     });
//   });

//   test('Scenario 4: Alterar m�todo de pagamento com sucesso', ({ given, when, then }) => {
//     given('eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�', () => {
//       prismaMock.paymentMethod.findUnique.mockResolvedValue({
//         id: 1,
//         name: 'Cart�o Ita�',
//         numCard: '1234567890123456',
//         cvv: 123,
//         expiryDate: '07/2030',
//         type: 'DEBITO',
//         clientId: 1,
//         cpf: '12345678909',
//       });
//     });

//     when('eu seleciono a op��o �Alterar� no m�todo de pagamento �Cart�o Ita��', async () => {
//       payload = {
//         id: 1,
//         type: 'CREDITO', // Change type to credit
//       };
//       response = await request(app).patch('/client/paymentMethods/1').send(payload);
//     });

//     then('eu vejo a mensagem "M�todo de Pagamento Alterado com Sucesso"', () => {
//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('M�todo de Pagamento Alterado com Sucesso');
//     });

//     then('eu vejo �Cart�o Ita�� na p�gina �Meus M�todos de Pagamento�', async () => {
//       prismaMock.paymentMethod.findMany.mockResolvedValue([{
//         id: 1,
//         name: 'Cart�o Ita�',
//         numCard: '1234567890123456',
//         cvv: 123,
//         expiryDate: '07/2030',
//         type: 'CREDITO',
//         clientId: 1,
//         cpf: '12345678909',
//       }]);

//       const methodsResponse = await request(app).get('/client/paymentMethods');
//       expect(methodsResponse.body).toEqual(expect.arrayContaining([
//         expect.objectContaining({ name: 'Cart�o Ita�', type: 'CREDITO' })
//       ]));
//     });
//   });

//   test('Scenario 6: Deletar m�todo de pagamento com sucesso', ({ given, when, then }) => {
//     given('eu estou logado como usu�rio �Cliente� com login �Matheus� e senha �123�', () => {
//       prismaMock.paymentMethod.findUnique.mockResolvedValue({
//         id: 1,
//         name: 'Cart�o Ita�',
//         numCard: '1234567890123456',
//         cvv: 123,
//         expiryDate: '07/2030',
//         type: 'DEBITO',
//         clientId: 1,
//         cpf: '12345678909',
//       });
//     });

//     when('eu seleciono a op��o �Deletar� no m�todo de pagamento �Cart�o Ita��', async () => {
//       response = await request(app).delete('/client/paymentMethods/1');
//     });

//     then('eu vejo a mensagem �M�todo de pagamento Deletado com Sucesso�', () => {
//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('M�todo de pagamento Deletado com Sucesso');
//     });

//     then('eu n�o vejo �Cart�o Ita�� na p�gina �Meus M�todos de Pagamento�', async () => {
//       prismaMock.paymentMethod.findMany.mockResolvedValue([]); // Empty list after deletion

//       const methodsResponse = await request(app).get('/client/paymentMethods');
//       expect(methodsResponse.body).not.toEqual(expect.arrayContaining([
//         expect.objectContaining({ name: 'Cart�o Ita�' })
//       ]));
//     });
//   });
// });
