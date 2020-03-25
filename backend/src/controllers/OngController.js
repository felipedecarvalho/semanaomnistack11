const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {

    async index(request, response) {
    
        const ongs  = await connection('ongs').select('*');
        
        return response.json(ongs);
    },

    async create(request, response){
        
        //const data  = request.body; 
        //console.log(data);

        //limita os campos 
        const { nome, email, whatsapp, city, uf }  = request.body; 

        const id = crypto.randomBytes(4).toString('HEX');
        
        //espera executar o codigo abaixo = await, pra depois continuar = return...
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({id});

    }
};