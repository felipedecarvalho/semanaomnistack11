const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {

    async create(request, response) {
    
        const { id }  = request.body; 

        const ong  = await connection('ongs')
            .where('id', id)
            .select('nome')
            .first();
        
        if (!ong){
            //400 = algo deu errado            
            return response.status(400).json({error: 'No ONG found with this ID'});
        }

        return response.json(ong);
    }
};    