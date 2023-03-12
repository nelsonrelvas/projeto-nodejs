import { Router } from 'express';
import { VideosRepository } from '../modules/videos/repositories/VideosRepository';

const videosRoutes = Router();
const videosRepository = new VideosRepository();

videosRoutes.post('/create-video', (request, response) => {
    videosRepository.create(request, response);
});

videosRoutes.get('/get-video', (request, response) => {
    videosRepository.getVideos(request, response);
});

export { videosRoutes };