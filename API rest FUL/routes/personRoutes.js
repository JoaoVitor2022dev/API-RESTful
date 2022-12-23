const router = require('express').Router() 
const Person = require('../models/Person');

// rotas da API 


// CREATE - criaaçao de dados 
router.post('/', async ( requisition , response ) => {
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
         response.status(500).json({error: 'dados nao enviados...'})
      }  
 }); 
 
 // red - leitura de dados... 

    router.get('/', async ( requisition , reposta) => {
      
       try {
          
        const people = await Person.find(); 
        
        reposta.status(200).json(people);

       } catch (error) {
          reposta.status(500).json({error: 'error na requisition para a amostra de dados...'})
       }  

     })


// extrair por id os dados... 

  router.get('/:id', async ( requisition , reposta) => {
   // extrair o dado da requisiçao, pela url = requisition.params
     const id = requisition.params.id; 
    
    try {
      const person = await Person.findOne({ _id: id}) 

      if (!person) {
         reposta.status(422).json({ message: 'Usuario nao encontrado'}); 
          return;
      }
    
      // reposta para o front end 
      reposta.status(200).json(person);    

     } catch (error) {
        reposta.status(500).json({error: 'error na requisition de extrair por id'})
     } 
  })
    



 module.exports = router; 