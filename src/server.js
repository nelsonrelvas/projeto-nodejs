// criar nosso servidor e alguma rotas (a aplicação vai nascer a partir desse arquivo
const express = require('express');
const app = express();

//resolver possíveis problemas no json, senao n recebe json
app.use(express.json());

// endpoint local: http://localhost:4000/

// app.get();
// app.post()
// app.patch();
// app.put();
// app.delete();

app.get('/', (request, response) => {
    // response.send('Vocẽ acessou o servidor');
    response.json({ nome: 'Nelson', sobrenome: 'Relvas', idade: 37 });
})

app.get('/users', (request, response) => {
    // response.send('Vocẽ acessou o servidor');
    console.log('iniciando1');
    response.json([{ nome: 'Nelson', sobrenome: 'Relvas', idade: 37 },
    { nome: 'Maria', sobrenome: 'Relvas', idade: 60 },
    { nome: 'Tamires', sobrenome: 'Relvas', idade: 35 }]);
    console.log('finalizando');
})



app.post('/userdata/:id/:email', (request, response) => {
    console.log('iniciando');
    // console.log(request.query);
    // console.log(request.route);
    // console.log(request.header);
    console.log(request.params);                    //route params
    console.log('parametro', request.params.id);
    console.log('parametro', request.params.email);

    // console.log(request.body);
    // console.log(request.body.nome);
    // console.log(request.body.sobrenome);
    // console.log(request.body.idade);
    // response.send('ok')  //status ok
    response.status(200).json({ sucess: true });
    console.log('finalizando');
})


app.listen(4000);
