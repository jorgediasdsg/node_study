const express =  require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
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

function validateProjectId(request, response, next){
    const { id } = request.params;

    if (!isUuid(id)){
        return response.status(400).json({error: 'Invalid project ID.'})
    }

    return next();
}

app.get('/list', (request, response)=>{
       
    const totalAreaList = furnituresList
        .reduce((accumulator, element) => accumulator + element.totalAreaM2, 0)

    const price = totalAreaList*90;
    const tips = "You can cut in Leroy Merlin store and build at home. =)"


    return response.json({
        furnituresList,
        totalAreaList,
        price,
        tips
    });
});

app.post('/item', (request, response)=>{
    const { width, length, units, name } = request.body;
    if ( 
        length<=0 || length>2700 || 
        width<=0 || width>2700 ||
        units<=0 || units>100
        ){

        return response.json({message: 'Please, enter a valid number!'});

    } else {

        const totalAreaM2 = length*width*units/1000000;

        const item = {
            id: uuid(),
            name,
            length,
            width,
            depth: 15,
            units,
            totalAreaM2,
            label: length+"X"+width+"mm"
        }
        
        furnituresList.push(item);
        return response.json(item);
    }
})

app.post('/table', (request, response)=>{
    const { length, width, depth, units} = request.body;

    if (    
        length<=0 || length>2700 || 
        width<=0 || width>2700 ||
        depth<600 || depth>1200 ||
        units<=0 || units>100
        ){

        return response.json({message:'Please, input a valid number!'})

    } else {

        const top = {
            name: "top",
            length: length,
            width: width,
            depth: 15,
            totalAreaM2: length*width*2/1000000,
            label: "TOP: "+length+"X"+width+"mm"
        }
        
        const leg = {
            name: "leg",
            length: depth,
            width: 100,
            depth: 15,
            // 100mm width more 2 for make leg in L, more 4 units/convert to metters.
            totalAreaM2: depth*100*2*4/1000000,
            label: "LEG: "+length+"X"+width+"mm"
        }
        
        const totalAreaM2 = top.totalAreaM2+leg.totalAreaM2*units;
        
        const table = {
            id: uuid(),
            name: 'Table',
            components: {
                top,
                leg,
            },
            label: "TABLE: "+length+"X"+width+"X"+depth+"mm",
            units,
            totalAreaM2
        }
        furnituresList.push(table);
        return response.json(table);
    }
})
app.use('/table/:id', validateProjectId);
app.use('/item/:id', validateProjectId);
app.put('/table/:id', (request, response)=>{
    const { id } = request.params;
    const { length, width, depth, units} = request.body;

    const tableIndex = furnituresList.findIndex(table => table.id == id);

    if (tableIndex < 0){
        return response.status(400).json({ error: 'Table not found.' })
    }

    if (    
        length<=0 || length>2700 || 
        width<=0 || width>2700 ||
        depth<600 || depth>1200 ||
        units<=0 || units>100
        ){

        return response.json.status(400).json({message:'Please, input a valid number!'})

    } else {

        const top = {
            name: "top",
            length: length,
            width: width,
            depth: 15,
            totalAreaM2: length*width*2/1000000,
            label: "TOP: "+length+"X"+width+"mm"
        }
        
        const leg = {
            name: "leg",
            length: depth,
            width: 100,
            depth: 15,
            // 100mm width more 2 for make leg in L, more 4 units/convert to metters.
            totalAreaM2: depth*100*2*4/1000000,
            label: "LEG: "+length+"X"+width+"mm"
        }
        
        const totalAreaM2 = top.totalAreaM2+leg.totalAreaM2*units;
        
        const table = {
            id,
            name: 'Table',
            components: {
                top,
                leg,
            },
            label: "TABLE: "+length+"X"+width+"mm",
            units,
            totalAreaM2
        }

        furnituresList[tableIndex] = table;
        return response.json(table);
    }

})

app.delete('/table/:id', (request, response)=>{
    const { id } = request.params;
    
    const tableIndex = furnituresList.findIndex(table => table.id == id);

    if (tableIndex < 0){
        return response.status(400).json({ error: 'Table not found.' })
    }

    furnituresList.splice(tableIndex, 1);
    return response.status(204).send();
})

app.delete('/item/:id', (request, response)=>{
    const { id } = request.params;
    
    const itemIndex = furnituresList.findIndex(item => item.id == id);

    if (itemIndex < 0){
        return response.status(400).json({ error: 'item not found.' })
    }

    furnituresList.splice(itemIndex, 1);
    return response.status(204).send();
})

console.log("Open app here: http://localhost:3333/table/2000/600/800")

app.listen(3333);