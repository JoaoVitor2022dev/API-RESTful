// configuraçao inicial 

const express = require('express'); 
const app =  express(); 
const mongoose = require('mongoose');

const Person = require('./models/Person');

// forma de ler JSON / middlewares

app.use( 
    express.urlencoded({
        extended: true, 
    }), 
) 

app.use(express.json()) 


// rotas da API 
app.post('/person', async ( requisition , response ) => {
   // requisition.body  

    // {name: 'vitor lima', salary: 3000 , approved: true } 
    const {name, salary , approved} = requisition.body; 

    // verificaçao de name 

    if (!name) {
        response.status(422).json({error: 'O nome é obrigatorio...'})
    }
    if (!salary) {
        response.status(422).json({error: 'O salario é obrigatorio...'})
    } 
 
    const person = {
        name, 
        salary, 
        approved,
    }

     try {        
        // criando dados 
        await Person.create(person); 

        response.status(201).json({message: 'Pessoa inserindo no sistema com sucesso!'}); 
         console.log('inserindo dados com sucesso!');

     } catch (error) {
        response.status(500).json({error: error})
     }
     
}); 


// rota inicial / endPoint 
app.get('/', (requisition, reposta) => {
   // mostrar requisition 
   
   // mostrar reposta 
   reposta.json({menssage: 'ola exprexx'}); 

});

// conection com mogoose

const DB_USER = 'ehfbwjhebfjh'; 
const DB_PASSWORD = encodeURIComponent('fqiweho fiuqehw'); 

mongoose.set('strictQuery', true); 
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.l3zpv5i.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    ).then( () => {
        console.log('conectamos com o mongoDB');
        app.listen(4000); 
    }).catch( (err) => { console.log(err);})






