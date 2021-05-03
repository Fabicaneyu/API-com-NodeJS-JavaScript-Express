const express = require('express'); //instancia
const bodyParser = require('body-parser')
const app = express(); //executa

const port = 3000; //variável constante não pode sofrer alteração

app.use(bodyParser.json());
 
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
    res.send(mensagens.filter(Boolean)); //o boolean permite que ao fazer um delete e dar o get all não aparecerá null
});


//segundo endpoint com parâmetro ID - [GET] /mensagens/{id} - Retorna apenas uam única mensagem pelo ID
app.get('/mensagens/:id', (req, res) => {
    const id = req.params.id -1; //nesse caso a posição 0 vira 1
    const mensagem = mensagens [id] //índice ID

    res.send(mensagem)
});

// terceiro endpoint - [POST] /mensagens - Cria uma nova mensagem
app.post('/mensagens', (req,res) => {
    const mensagem = req.body.mensagem; //bateu uma msg

    mensagens.push(mensagem); //adiciona a msg nova

    res.send(`Mensagem criada com sucesso: ${mensagem}`); // mostra a msg nova
});

//quarto endpoint- [PUT] /mensagens/{id} - Atualiza uma mensagem pelo ID
app.put('/mensagens/:id', (req,res) => {
    const id = req.params.id -1; //define que será pelo id
    const mensagem = req.body.mensagem; // a msg será captada através do body
    mensagens[id] = mensagem; // posição do id da lista de mensagens, coloco a nova msg q eu acabei de obter 
    res.send(`Mensagem atualizada com sucesso: ${mensagem}.`);// aviso que tem nova msg e o seu novo texto
});

//quinto endpoint - - [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID
app.delete('/mensagens/:id', (req,res) => {
    const id = req.params.id-1; //obtem o id
    delete mensagens[id]; // deletará pelo id colocado
    res.send('Mensagem removida com sucesso') //avisa que deu certo a remoção
})

app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`);
}); //porta 


