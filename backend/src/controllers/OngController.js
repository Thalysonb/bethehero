const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response){
        const {name, mail, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString("HEX");

        await connection('ongs').insert({
            id,
            name,
            mail,
            whatsapp,
            city,
            uf
        });
        return response.json({id});
    },

    async listAll(request, response){
        let ongs = await connection('ongs').select('*');
        return response.json(ongs);
    }
}