const connection = require('../database/connection');


module.exports = {
    async create(request, response){
        let {title, description, value} = request.body;
        let ong_id = request.headers.authorization;

        let [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({id});
    },

    async listAll(request, response) {
        let {page = 1} = request.query;
        let [count] = await connection('incidents').count();

        let  incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.mail',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

    async deleteById(request, response){
        let {id} = request.params;
        let ong_id = request.headers.authorization;
        console.log("primeiro", ong_id, id);
        let incident = await connection('incidents').where('id', id).select('ong_id').first();
        console.log(ong_id, incident.ong_id);
        if(ong_id != incident.ong_id){
            return response.status(401).json({error: "não permitido"});
        }
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
        
    }
}