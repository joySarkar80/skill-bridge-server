import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/globalErrorHandler';

const app: Application = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://skill-bridge-frontend-nu.vercel.app", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from skill bridge server');
});

app.use(errorHandler);
app.use(notFound);

export default app;
