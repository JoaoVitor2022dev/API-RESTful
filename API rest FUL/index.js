// configuraçao inicial 

require('dotenv').config()
const express = require('express'); 
const app =  express(); 
const mongoose = require('mongoose');
const personRoutes = require("./routes/personRoutes"); 

//  middlewares - config de express
app.use( 
    express.urlencoded({
        extended: true, 
    }), 
) 

// forma que o express vai se comunicar... 
app.use(express.json()) 

// rotas da API
app.use('/person', personRoutes);


// rota inicial / endPoint 
app.get('/', (requisition, reposta) => {
   // mostrar requisition 
   // mostrar reposta 
   reposta.json({menssage: 'ola exprexx'}); 
});

// conection com mogoose para pode acessar o mongo DB
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)  

mongoose.set('strictQuery', true); 
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.l3zpv5i.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    ).then( () => {
        console.log('conectamos com o mongoDB');
        app.listen(4000); 
    }).catch( (err) => { console.log(err);})

