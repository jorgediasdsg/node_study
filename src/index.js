const express =  require('express');

const app = express();

app.get('/', (request, response)=>{
    return response.json({
        message:'Hi there!, you need call to measures /measure/x/y for server response. Tks!'})
})

app.get('/measure/:x/:y', (request, response)=>{
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

app.listen(3333);