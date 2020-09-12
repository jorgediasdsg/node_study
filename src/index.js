const express =  require('express');

const app = express();

app.get('/', (request, response)=>{
    return response.json({message:'Hi there!'})
})

app.listen(3333);