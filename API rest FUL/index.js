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

// rota inicial / endPoint 
app.get('/', (requisition, reposta) => {
   // mostrar requisition 
   
   // mostrar reposta 
   reposta.json({menssage: 'ola exprexx'}); 

});

const DB_USER = 'userNULL'; 
const DB_PASSWORD = encodeURIComponent('bkjhguygo2326hkhjg'); 

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.l3zpv5i.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    ).then( () => {
        console.log('conectamos com o mongoDB');
        app.listen(4000); 
    }).catch( (err) => { console.log(err);})





