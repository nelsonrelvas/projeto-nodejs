import { Router } from 'express';
import { VideosRepository } from '../modules/videos/repositories/VideosRepository';
import { login } from '../middleware/login'

const videosRoutes = Router();
const videosRepository = new VideosRepository();

videosRoutes.post('/create-video', login, (request, response) => {
    videosRepository.create(request, response);
});

videosRoutes.get('/get-video', login, (request, response) => {
    videosRepository.getVideos(request, response);
});

videosRoutes.get('/search', (request, response) => {
    videosRepository.getVideosText(request, response);
});

export { videosRoutes };