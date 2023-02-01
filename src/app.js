import express from 'express';
import cors from 'cors';
import pollRoute from './routes/pollRoute.js';
import choiceRoute from './routes/choiceRoute.js';

export const server = express();
server.use(express.json());
server.use(cors());

server.use([pollRoute, choiceRoute]);

server.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
  console.log(`Use: http://localhost:${process.env.PORT}`);
});