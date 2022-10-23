import 'dotenv/config';
import express, { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/appRouter';
import { createContext } from "./expressContext";

const app: Express = express();
const port = process.env.PORT;

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