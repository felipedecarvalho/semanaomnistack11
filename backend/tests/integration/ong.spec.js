const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    
    //cria as tabelas de teste primeiro
    beforeEach( async () => {
        await connection.migrate.rollback(); //desfaz todas as migrations, para nao ficar um banco grande
        await connection.migrate.latest();   //executa as migrations
    });

    //cria as tabelas de teste primeiro
    afterAll( async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        
        const response = await request(app)
            .post('/ongs')
            .send({
                nome: "APAD teste",
                email: "apad@teste.com.br",
                whatsapp: "12345677771",
                city: "Juiz de Fora",
                uf: "MG"
            });

        //obs : se fosse preciso passar o HEADER authorization, 
        //      incluiria uma linha entre .post  e .send,  assim:
        //.set('Authorization', 'id da ong')
        //obs : teria que criar uma ong antes e passar o id dela no campo acima 'id da ong'

        console.log(response.body);

        expect(response.body).toHaveProperty('id'); //espera que tenha um ID no corpo da resposta
        expect(response.body.id).toHaveLength(8);   //espera que esse ID tenha 8 caracteres

    })
});