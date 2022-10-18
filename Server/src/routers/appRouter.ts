import { initTRPC } from '@trpc/server';
import { pokemonList, trainerList } from '../index';
import { Context } from "../expressContext";

const trpc = initTRPC.context<Context>().create();

export const appRouter = trpc.router({
    pokemon: trpc.procedure.query(() => pokemonList[0]),
    getAllPokemon: trpc.procedure.query(() => trainerList[0]),
    createPokemon: trpc.procedure.mutation(() => {
        pokemonList.push({ name: "Charmander", type: "fire" })

        return pokemonList;
    })
});

export type AppRouter = typeof appRouter;