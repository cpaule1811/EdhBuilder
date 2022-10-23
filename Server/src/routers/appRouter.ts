import { initTRPC } from '@trpc/server';
import { Context } from "../expressContext";
import { deleteCards } from "../services/cardService"

const trpc = initTRPC.context<Context>().create();

export const appRouter = trpc.router({
    deleteCards: trpc.procedure.query(async  () => await deleteCards())
});

export type AppRouter = typeof appRouter;