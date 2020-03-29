const connection = require('../database/connection');

module.exports = {
    async listAllIncidentsByOngId(request, response){
        let ong_id = request.headers.authorization;
        console.log(ong_id);
        let incidents = await connection('incidents').where('ong_id', ong_id).select('*');
        return response.json(incidents);
    }
}