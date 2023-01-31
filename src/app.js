import express from 'express';
import cors from 'cors';
import testRoute from './routes/testRoute.js';

export const server = express();
server.use(express.json());
server.use(cors());

server.use([testRoute]);

server.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
  console.log(`Use: http://localhost:${process.env.PORT}`);
});