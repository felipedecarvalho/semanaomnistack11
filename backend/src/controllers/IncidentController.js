const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
    
        const { page = 1 }  = request.query; //pagina padrão é 1.

        const [count] = await connection('incidents').count();
        //[count] ou count e count[0]
        console.log(count);

        //limita a 5 registros por página
        const incidents  = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset( (page - 1) * 5)
            .select(['incidents.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);  
            //assim, eu retirei o id da ONG, pois estava sendo confundido com o id do incidente
        
        //envia no cabecalho da resposta o total de registros.
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        
        //limita os campos 
        const { title, description, value }  = request.body; 
        //const data  = request.body; 
        //console.log("campos:");
        //console.log(data);

        const ong_id = request.headers.authorization;
        //const ong_id = "8a1808ea"; 

        //espera executar o codigo abaixo = await, pra depois continuar = return...
        const [id] = await connection('incidents').insert({            
            title,
            description,
            value,
            ong_id, 
        });

        return response.json({ id });

    },

    async delete(request, response) {
    
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident  = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id){
            //401 = erro = nao autorizado
            return response.status(401).json({error: 'Operation not permitted.'}); 
        }
        
        await connection('incidents').where('id',id).delete();

        return response.status(204).send(); //204 = ok, mas sem conteudo a ser retornado
    },
};