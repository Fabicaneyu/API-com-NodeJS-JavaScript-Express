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
    {
        "id": 1,
        "texto":  "status de pedido em atraso",
    },
    {
        "id": 2,
        "texto":  "status de pedido a caminho",
    },
    {
        "id": 3,
        "texto":  "status de pedido já entregue"
    }   
]

const getMensagensValidas = () => mensagens.filter(Boolean);

const getMensagemById = id => getMensagensValidas().find(msg => msg.id === id);


//primeiro endpoint [GET] /mensagens - retorna lista de mensagens
app.get('/mensagens', (req, res) => {
    res.send(getMensagensValidas()); //o boolean permite que ao fazer um delete e dar o get all não aparecerá null
});


//segundo endpoint com parâmetro ID - [GET] /mensagens/{id} - Retorna apenas uam única mensagem pelo ID
app.get('/mensagens/:id', (req, res) => {
    const id = +req.params.id; //nesse caso a posição 0 vira 1

    const mensagem = getMensagemById(id); //índice ID

    if(!mensagem) {
        res.send('Mensagem não encontrada');
        return;
    }

    res.send(mensagem);
});

// terceiro endpoint - [POST] /mensagens - Cria uma nova mensagem
app.post('/mensagens', (req,res) => {
    const mensagem = req.body; //bateu uma msg

    if(!mensagem || !mensagem.texto){ // caso ñ venha msg, ou essa msg não tenha um campo chamado texto eu mostro msg inválida
        res.send('Mensagem inválida')

        return;
    }

    mensagem.id = mensagens.length + 1; //exibe o novo id da nova msg
    mensagens.push(mensagem); //adiciona a msg nova

    res.send(mensagem); // mostra a msg nova
});

//quarto endpoint- [PUT] /mensagens/{id} - Atualiza uma mensagem pelo ID
app.put('/mensagens/:id', (req,res) => {
    const id = +req.params.id; //define que será pelo id
    const mensagem = getMensagemById(id); //índice ID

    const novoTexto = req.body.texto; // a msg será captada através do body

    if (!novoTexto) { //só atualizo a msg caso novo texto exista
        res.send('Mensagem invalida')

        return;
    }


    mensagem.texto = novoTexto;

    res.send(mensagem);// aviso que tem nova msg e o seu novo texto
});

//quinto endpoint - - [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID
app.delete('/mensagens/:id', (req,res) => {
    const id = +req.params.id; //define que será pelo id
    const mensagem = getMensagemById(id); //índice ID

    if(!mensagem){
        res.send('Mensagem não encontrada')
        return;
    }

    const index = mensagens.indexOf(mensagem);
    delete mensagens[index]; // deletará pelo id colocado

    res.send('Mensagem removida com sucesso') //avisa que deu certo a remoção
})

app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`);
}); //porta 


