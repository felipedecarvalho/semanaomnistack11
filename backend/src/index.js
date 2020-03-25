const express = require('express');  //um pacote
const cors = require('cors');    //um pacote
const routes = require('./routes');  //um arquivo

const app = express();

app.use(cors()); 

//quando for para produção,  coloca a opção "origin"
/*
app.use(cors({
    origin: 'http://meuapp.com'
})); 
*/

//converte as requisições em JSON
app.use(express.json());
app.use(routes);


app.listen(3333); //localhost:3333


//banco de dados : SQLite
//Driver : select * from users;
//Query Builder : table('users').select('*').where('name=felipe');
  // KNEXJS = knexjs.org