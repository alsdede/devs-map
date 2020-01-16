const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request,response){
        //console.log(request.query);
        const { latitude, longitude, techs } = request.body;
        //Buscar todos os devs raio 10kmm e filtro por tech
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.ind({
            techs: {
                $in: techsArray,
            },
            locaion: {
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordnates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return response.json({ devs: [] });
    }
}