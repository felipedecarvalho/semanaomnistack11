const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
    //routes.post('/ongs', OngController.create); 
    
    //inserindo validações via celebrate
    routes.post('/ongs', celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        })
    }), OngController.create); 
        
    //rota para listar ONGs
    routes.get('/ongs', OngController.index);     

    //rota para inserir incidents
    routes.post('/incidents', IncidentController.create); 
        
    //rota para listar incidents
    routes.get('/incidents', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }) , IncidentController.index);     

    //rota para deletar  incidents
    //obs = da erro se tentar deletar um id que nao existe!!!
    routes.delete('/incidents/:id' , celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }) , IncidentController.delete);     

    //rota para listar incidents de uma ONG especifica
    routes.get('/profile', celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown() //nao conheço todos os headers, entao eu ignoro eles !
    }) , ProfileController.index);     

    module.exports = routes;
