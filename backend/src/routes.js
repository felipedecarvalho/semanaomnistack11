const express = require('express');
//const crypto = require('crypto');
//const connection = require('./database/connection');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

    //rota raiz do sistema
    routes.get('/', (request, response) => {
    //   return response.send('Hello World !');
        return response.json({
            evento: 'Semana OmniStack 11.0',
            aluno: 'Felipe Carvalho'
        });
    }); 
    
    //Query params = usa sinal de interogacao antes do campo = .../users?nome=felipe 
    //Route params = usa nome do campo após a barra = .../users/:id
    //request body = corpo da requisicao, usado para criar ou alterar recursos/registros no banco
    routes.get('/users/:id', (request, response) => {
    
        const params1 = request.query; // query params 
    
        const params2 = request.params; // route params
    
        console.log("params1 : ");
        console.log(params1);
        console.log("params2 : ");
        console.log(params2);
    
        //   return response.send('Hello World !');
        return response.json({
            evento: 'Semana OmniStack 11.0',
            aluno: 'usuário : Felipe Carvalho'
        });
    }); 

    //rota para LOGIN
    routes.post('/sessions', SessionController.create); 


    //rota para inserir ONGs
    routes.post('/ongs', OngController.create); 
        
    //rota para listar ONGs
    routes.get('/ongs', OngController.index);     

    //rota para inserir incidents
    routes.post('/incidents', IncidentController.create); 
        
    //rota para listar incidents
    routes.get('/incidents', IncidentController.index);     

    //rota para deletar  incidents
    routes.delete('/incidents/:id', IncidentController.delete);     

    //rota para listar incidents de uma ONG especifica
    routes.get('/profile', ProfileController.index);     

    module.exports = routes;
