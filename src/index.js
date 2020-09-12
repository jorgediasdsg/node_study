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
            totalArea: x*y*2,
            resume: "This item is top of table."
        }

        const leg = {
            name: "leg",
            length: z,
            width: 100,
            depth: 15,
            // 100mm width more 2 for make leg in L, more 4 units.
            totalArea: z*100*2*4,
            resume: "This item is the 4 legs of table, and the lag use 2 wood in 'L'."
        }

        const totalArea = top.totalArea+leg.totalArea;

        const m2 = totalArea/1000000;
        const price = m2*90;
        const manual = "https://encurtador.com.br/gLWZ4"
        const tips = "You can cut in Leroy Merlin store and build at home. =)"


        const table = {
            name: 'Table',
            components: {
                top,
                leg,
            },
            totalArea,
            m2,
            price,
            manual,
            tips
        }
        return response.json(table);
    }
})

console.log("Open app here: http://localhost:3333/table/2000/600/800")

app.listen(3333);
