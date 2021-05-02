const express = require('express'); //instancia
const app = express(); //executa

const port = 3000; //variável constante não pode sofrer alteração
 
//endpoint para testar
app.get('/hello', (req, res) => { // barra sem detalhe de endpoint
  res.send('Hello World'); // resposta que será executada
});
 

/*
Lista de endpoints da aplicação
- [GET] /mensagens - retorna lista de mensagens
- [GET] /mensagens/{id} - Retorna apenas uam única mensagem pelo ID
- [POST] /mensagens - Cria uma nova mensagem
- [PUT] /mensagens/{id} - Atualiza uma mensagem pelo ID
- [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID
*/

//Array, lista de mensagens de status de pedido
const mensagens = [
    "status de pedido em atraso",
    "status de pedido a caminho",
    "status de pedido já entregue"
]

//primeiro endpoint [GET] /mensagens - retorna lista de mensagens
app.get('/mensagens', (req, res) => {
    res.send(mensagens);
});


//segundo endpoint com parâmetro ID - [GET] /mensagens/{id} - Retorna apenas uam única mensagem pelo ID
app.get('/mensagens/:id', (req, res) => {
    const id = req.params.id -1; //nesse caso a posição 0 vira 1
    const mensagem = mensagens [id] //índice ID

    res.send(mensagem)
});



app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`);
}); //porta 


