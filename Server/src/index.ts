import 'dotenv/config';
import express, { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/appRouter';
import { createContext } from "./expressContext";
import * as fs from "fs";
import path from "path";

const app: Express = express();
const port = process.env.PORT;

// const dirContents = fs.readdirSync(__dirname);
// console.log(dirContents);
// const fileContents = fs.readFileSync(path.join(__dirname, "./tests/mockData/mockCards.json"))
// console.log(fileContents);

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