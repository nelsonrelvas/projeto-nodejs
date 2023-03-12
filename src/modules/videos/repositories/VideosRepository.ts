import { pool } from '../../../mysql';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


class VideosRepository {

    create(request: Request, response: Response) {
        const { title, description, users_user_id } = request.body;
        pool.getConnection((err: any, connection: any) => {
            const idGenerated = uuidv4();
            connection.query(
                'INSERT INTO videos (video_id, title, description, users_user_id) VALUES (?,?,?,?)',
                [idGenerated, title, description, users_user_id],
                (error: any, result: any, fields: any) => {
                    connection.release();
                    if (error) {
                        response.status(400).json(error);
                    } else {
                        response.status(200).json({ message: "Vídeo criado com sucesso." });
                    }
                }
            );
        });
    }

    getVideos(request: Request, response: Response) {
        const { user_id } = request.query;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE users_user_id=?',
                [user_id],
                (error: any, result: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return response.status(500).json(err);
                    } else {
                        return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos: result });
                    }
                }
            );
        });
    }

    getVideosText(request: Request, response: Response) {
        let { text } = request.query;
        text = `%${text}%`;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE title LIKE ? OR description LIKE ?',
                [text, text],
                (error: any, result: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return response.status(500).json(err);
                    } else {
                        return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos: result });
                    }
                }
            );
        });
    }
}


export { VideosRepository };