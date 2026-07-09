<<<<<<< HEAD
// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import router from './routes';

// const app: Application = express();

// // parsers
// app.use(express.json());
// // app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// // application routes
// app.use('/api', router);


// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from skill bridge server');
// });

// export default app;




import express, {
  Application,
  Request,
  Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
=======
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/globalErrorHandler';
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0

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

<<<<<<< HEAD
// routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from skill bridge server");
=======
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from skill bridge server');
>>>>>>> 928eb9304f1ba3644fc8a72860999ae10e977da0
});

app.use(errorHandler);
app.use(notFound);

export default app;
