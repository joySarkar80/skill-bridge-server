import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use('/api', router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from skill bridge server');
});

app.use(errorHandler);
app.use(notFound);
export default app;
