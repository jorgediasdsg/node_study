const express =  require('express');
const { uuid } = require('uuidv4');
const app = express();

app.use(express.json());

const furnituresList = [];

function logRequest(request, response, next){
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel)

    next();

    console.timeEnd(logLabel);
}

app.use(logRequest);

app.get('/list', (request, response)=>{

    const totalAreaList = furnituresList
        .reduce((accumulator, element) => accumulator + element.totalAreaM2, 0)

    return response.json({
        furnituresList,
        totalAreaList
    });
});

app.post('/item', (request, response)=>{
    const { width, length, units } = request.body;
    if ( isNaN(length) || isNaN(width) )  {
        return response.json({message: 'Please, enter a valid number!'});
    } else {

        const totalAreaM2 = length*width*units/1000000;

        const item = {
            id: uuid(),
            name: 'Item',
            length,
            width,
            units,
            depth: 15,
            totalAreaM2
        }
        
        furnituresList.push(item);
        return response.json(item);
    }
})

app.post('/table', (request, response)=>{
    const { length, width, depth, units} = request.body;

    if (    
        isNaN(length) || 
        isNaN(width) || 
        isNaN(depth)  || 
        isNaN(units) 
        ){

        return response.json({message:'Please, input a valid number!'})

    } else {

        const top = {
            name: "top",
            length: length,
            width: width,
            depth: 15,
            totalAreaM2: length*width*2/1000000,
            resume: "This item is top of table."
        }
        
        const leg = {
            name: "leg",
            length: depth,
            width: 100,
            depth: 15,
            // 100mm width more 2 for make leg in L, more 4 units/convert to metters.
            totalAreaM2: depth*100*2*4/1000000,
            resume: "This item is the 4 legs of table, and the lag use 2 wood in 'L'."
        }
        
        const totalAreaM2 = top.totalAreaM2+leg.totalAreaM2;
        
        const m2 = totalAreaM2;
        const price = m2*90;
        const manual = "https://encurtador.com.br/gLWZ4"
        const tips = "You can cut in Leroy Merlin store and build at home. =)"
        
        
        const table = {
            id: uuid(),
            name: 'Table',
            components: {
                top,
                leg,
            },
            totalAreaM2,
            m2,
            price,
            manual,
            tips
        }
        furnituresList.push(table);
        return response.json(table);
    }
})

console.log("Open app here: http://localhost:3333/table/2000/600/800")

app.listen(3333);
