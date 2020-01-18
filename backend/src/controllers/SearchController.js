const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request,response){
        //console.log(request.query);
        const { latitude, longitude, techs } = request.query;
        //Buscar todos os devs raio 10kmm e filtro por tech
        const techsArray = parseStringAsArray(techs);
        console.log(techsArray)
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return response.json({ devs });
    }
}