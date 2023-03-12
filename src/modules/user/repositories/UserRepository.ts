import { pool } from '../../../mysql';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';


class UserRepository {

    create(request: Request, response: Response) {
        const { name, email, password } = request.body;
        pool.getConnection((err: any, connection: any) => {
            const idGenerated = uuidv4();
            hash(password, 10, (err, passwordHash) => {

                if (err) {
                    return response.status(500).json(err);
                }

                connection.query(
                    'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
                    [idGenerated, name, email, passwordHash],
                    (error: any, result: any, fields: any) => {
                        connection.release();
                        if (error) {
                            response.status(400).json(error);
                        } else {
                            response.status(200).json({ message: "Usuário criado com sucesso." });
                        }
                    }
                );
            });
        });
    }

    login(request: Request, response: Response) {
        const { email, password } = request.body;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM users WHERE email=?',
                [email],
                (error: any, result: any, fields: any) => {
                    connection.release();

                    if (error) {
                        return response.status(500).json(err);
                    } else {
                        if (!result[0]) {
                            return response.status(400).json({ error: "Erro na sua autenticação (email não existe)!" });
                        } else {
                            //verifica se a senha bate
                            compare(password, result[0].password, (erroCompare: any, resultCompare: any) => {
                                if (erroCompare) {
                                    return response.status(500).json(err);
                                } else {
                                    if (resultCompare) {
                                        //json web token
                                        const token = sign({
                                            id: result[0].user_id,
                                            email: result[0].email
                                        }, "segredo", { expiresIn: "1d" });
                                        return response.status(200).json({ token: token, message: "Autenticado com sucesso." });
                                    } else {
                                        return response.status(400).json({ error: "Erro na sua autenticação (senha incorreta)!" });
                                    }
                                }
                            });
                        }
                    }
                }
            );
        });
    }
}

export { UserRepository };