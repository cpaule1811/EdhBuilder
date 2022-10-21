import { appRouter } from '../routers/appRouter';
import { expect, test } from '@jest/globals';

// test('pokemon_WhenCalled_ShouldReturnMatchingPokemon', async () => {
//     const expected = {
//         type: 'electic',
//         name: 'Pikachu'
//     }
//     const caller = appRouter.createCaller({});
//
//     const result = await caller.pokemon();
//
//     expect(result).toEqual(expected);
// });
//
// test('createPokemon_WhenCalled_ShouldCreatePokemon', async () => {
//     const expected = [{type: 'electic', name: 'Pikachu'}, {name: "Charmander", type: "fire"}]
//     const caller = appRouter.createCaller({});
//
//     const result = await caller.createPokemon();
//
//     expect(result).toEqual(expected);
// })