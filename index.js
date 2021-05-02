const express = require('express'); //instancia
const app = express(); //executa

const port = 3000; //variável constante não pode sofrer alteração
 
app.get('/hello', (req, res) => { // barra sem detalhe de endpoint
  res.send('Hello World'); // resposta que será executada
});
 
app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`);
}); //porta 


