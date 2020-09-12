const express =  require('express');

const app = express();

app.get('/', (request, response)=>{
    return response.json({
        message:'Hi there!, you need call to measures /area/x/y for server response. Tks!'})
})

app.get('/area/:x/:y', (request, response)=>{
    const {x, y} = request.params;

    if ( isNaN(x) || isNaN(y) ){
        return response.json({message: 'Please, enter a valid number!'});
    } else {

        const totalArea = x*y;

        const item = {
            length: x,
            width: y,
            totalArea: totalArea
        }

        return response.json(item);
    }
})

app.get('/table/:x/:y/:z', (request, response)=>{
    const {x, y, z} = request.params;

    if ( isNaN(x) || isNaN(y) || isNaN(z) ){

        return response.json({message:'Please, input a valid number!'})

    } else {

        const top = {
            name: "top",
            length: x,
            width: y,
            depth: 15,
            totalArea: x*y*2
        }

        const leg = {
            name: "leg",
            length: z,
            width: 100,
            depth: 15,
            // 100mm width more 2 for make leg in L, more 4 units.
            totalArea: z*100*2*4
        }

        const table = {
            name: 'Table',
            components: {
                top: top,
                legs: leg,
            },
            totalArea: top.totalArea+leg.totalArea,
            m2: totalArea/1000,
            price: m2*90,
            tips: "You can cut in Leoroy Merlin store and build at home. =)"
        }

        return response.json(table);
    }

})

app.listen(3333);