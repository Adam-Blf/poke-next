import { getPokemonList, getPokemon } from "@/lib/api";
import { PokemonCard } from "@/components/PokemonCard";

export default async function Home() {
  const list = await getPokemonList(24, 0);
  const pokemons = await Promise.all(
    list.results.map((p) => getPokemon(p.name))
  );

  return (
    <main className="min-h-screen p-8 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
            PokeNext
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            The Ultimate Next.js Pokedex
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </main>
  );
}
