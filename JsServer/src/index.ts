import express, { Express } from 'express';
import dotenv from 'dotenv';
import * as trpcExpress from '@trpc/server/adapters/express';
import { Pokemon } from './interfaces/Pokemon';
import { Trainer } from './interfaces/Trainer';
import { appRouter } from './routers/appRouter';
import { createContext } from "./expressContext";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

export const pokemonList: Pokemon[] = [
    {
      type: 'electic',
      name: 'Pikachu',
    },
];

export const trainerList: Trainer[] = [
  {
    name: 'Charlie',
    numberOfPokemon: 5
  },
];

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});