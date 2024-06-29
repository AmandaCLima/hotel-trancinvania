import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { Client, PrismaClient, PublishedReservation, ClientSavedReservation, Hotelier } from '@prisma/client';
import { prismaMock } from "../../setupTests";
import SetupDatabaseTest from "../../src/email/setupDatabaseTest";

const feature = loadFeature('tests/features/shareandsave.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let response: supertest.Response;
    let clientSavedReservations: { client_id: number, reservation_id: number }[] = [];
    let hoteliers: Hotelier[] = [];
    let publishedReservations: PublishedReservation[] = [];
    let clients: Client[] = [];
    
    const setupDBTest = new SetupDatabaseTest();
    setupDBTest.resetDatabase();

    afterEach(async () => {
        clients = [];
        publishedReservations = [];
        clientSavedReservations = [];
        hoteliers = [];
        await setupDBTest.resetDatabase();
    });

    const createHotelier = {
        id: hoteliers.length + 1,
        name: 'Amanda',
        email: 'acfml@cin.ufpe.br',
        username: 'amandinha',
        password: '1234',
        hotel: 'Encantado',
        adress: 'Rua rio branco',
        cnpj: '716.006.119-47',
    };
    
    const createClient = async (email: string, password: string) => {
        return {
            id: clients.length + 1,
            name: 'Victória',
            email: email,
            username: 'vic',
            phone: '81981041181',
            password: password,
            cpf: '12388885348',
            birthDate: '2003-04-24',
        };
    };
    
    const createPublishedReservation = async (name: string) => {
        return {
            id: publishedReservations.length + 1,
            name: name,
            rooms: 1,
            people: 2,
            wifi: true,
            breakfast: true,
            airConditioner: true,
            parking: false,
            room_service: true,
            price: 400,
            new_price: 300,
            promotion_id: null,
            hotelier_id: 1
        };
    };

    const createSavedReservation = async (client_id: number, reservation_id: number) => {
        return {
            client_id: client_id,
            reservation_id: reservation_id
        };
    };

    const givenClientExist = (given: DefineStepFunction) =>
        given(/^existe um usuário "(.*)" logado com o e-mail "(.*)" e a senha "(.*)"$/, async (user, email, password) => {
            expect(user).toBe('Cliente');
            const cliente = await createClient(email, password);
            clients.push(cliente);
            prismaMock.client.findUnique.mockResolvedValue(cliente);
        });

    const givenPublishedReservationExist = (given: DefineStepFunction) => 
        given(/^um quarto no hotel "(.*)" está nas reservas publicadas$/, async (name) => {
            const publishedReservation = await createPublishedReservation(name);
            publishedReservations.push(publishedReservation);
            prismaMock.publishedReservation.findUnique.mockResolvedValue(publishedReservation);
        });

    const givenSavePublishedReservationExist = (given: DefineStepFunction) => 
        given(/^o "(.*)" está na listagem de reservas salvas$/, async (name) => {
            const publishedReservation = await createPublishedReservation(name);
            publishedReservations.push(publishedReservation);
            const savedReservation = await createSavedReservation(clients[0].id, publishedReservations[0].id);
            clientSavedReservations.push(savedReservation);
            prismaMock.publishedReservation.findUnique.mockResolvedValue(publishedReservation);
        });

    const thenStatusIsReturned = (then: DefineStepFunction) =>
        then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
            expect(response.status).toBe(parseInt(status, 10));
        });

    const thenReturnedMessage = (then: DefineStepFunction) => 
        then(/^é retornada a mensagem "(.*)"$/, async (message) => {
            expect(response.body.message).toEqual(message);
        });

    const whenSaveReservation = (when: DefineStepFunction) => 
        when(/^uma requisição POST é enviada para "(.*)"$/, async (url) => {
            const hotelier_0 = createHotelier;
            hoteliers.push(hotelier_0);
            await setupDBTest.setupDatabaseforSavedReservationTests(clients[0], hoteliers[0], publishedReservations[0]);
            
            const requestBody = {
                client_id: clients[0].id,
                reservation_id: publishedReservations[0].id
            };

            response = await request.post(url).send(requestBody);
        });

    const whenDeleteSaveReservation = (when: DefineStepFunction) => 
        when(/^uma requisição DELETE é enviada para "(.*)"$/, async (url) => {
            await setupDBTest.setupDatabaseforSavedReservationTests(clients[0], createHotelier, publishedReservations[0], clientSavedReservations);
            response = await request.delete(url);
        });

    test('Salvar reserva', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPublishedReservationExist(and);
        whenSaveReservation(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Excluir reserva salva', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenSavePublishedReservationExist(and);
        whenDeleteSaveReservation(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });
});
