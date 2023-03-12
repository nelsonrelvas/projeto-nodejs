import express from 'express';
import { userRoutes } from './routes/user.routes'
import { videosRoutes } from './routes/video.routes';

const app = express();
app.use(express.json());

// rotas
app.use('/user', userRoutes);
app.use('/videos', videosRoutes);

app.listen(4000);
