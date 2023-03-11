import express from 'express';
import { pool } from './mysql';
import { v4 as uuidv4 } from 'uuid'
import { hash } from 'bcrypt'

const app = express();
app.use(express.json());

// endpoint local: http://localhost:4000/

// app.get();
// app.post()
// app.patch();
// app.put();
// app.delete();

app.get('/create-user', (request, response) => {
    const { name, email, password } = request.body;
    console.log(name, email, password);
    pool.getConnection((err: any, connection: any) => {

        const idGenerated = uuidv4();
        hash(password, 10, (err, passwordHash) => {

            if (err) {
                return response.status(500).json(err);
            }

            console.log(idGenerated);
            console.log(passwordHash);

            connection.query(
                'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
                [idGenerated, name, email, passwordHash],
                (error: any, result: any, fields: any) => {
                    if (error) {
                        response.status(400).json(error);
                    } else {
                        response.status(200).json({ sucess: true });
                    }
                }
            );
        });
    })
})

app.get('/users', (request, response) => {
    console.log('iniciando1');
    response.json([{ nome: 'Nelson', sobrenome: 'Relvas', idade: 37 },
    { nome: 'Maria', sobrenome: 'Relvas', idade: 60 },
    { nome: 'Tamires', sobrenome: 'Relvas', idade: 35 }]);
    console.log('finalizando');
})



app.post('/userdata/:id/:email', (request, response) => {
    console.log(request.query);

    console.log('-------------------------------');
    console.log(request.headers);
    console.log(request.headers.authorization);
    console.log('-------------------------------');

    console.log(request.params);                    //route params
    console.log('parametro', request.params.id);
    console.log('parametro', request.params.email);

    response.status(200).json({ sucess: true });
})


app.listen(4000);
