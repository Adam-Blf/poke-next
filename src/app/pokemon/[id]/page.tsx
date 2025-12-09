import { getPokemon, getPokemonSpecies, getEvolutionChain } from "@/lib/api";
import { formatName, TYPE_COLORS } from "@/lib/pokemon";
import { StatChart } from "@/components/StatChart";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const pokemon = await getPokemon(id);
    return {
        title: `${formatName(pokemon.name)} | PokeNext`,
        description: `Details about ${formatName(pokemon.name)}`,
    };
}

export default async function PokemonDetail({ params }: Props) {
    const { id } = await params;
    const pokemon = await getPokemon(id);
    const species = await getPokemonSpecies(id);
    // Evolution chain is fetched but not displayed yet in this version to keep it simple first
    // const evolutionChain = await getEvolutionChain(species.evolution_chain.url);

    const mainType = pokemon.types[0].type.name;
    const themeColor = TYPE_COLORS[mainType] || "#A8A77A";

    const flavorText = species.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
    )?.flavor_text.replace(/\f/g, " ");

    return (
        <main className={cn("min-h-screen pb-20 bg-neutral-50 dark:bg-neutral-950")}>
            {/* Header / Hero */}
            <div
                className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: themeColor }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-50 dark:to-neutral-950" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-64 h-64 animate-float">
                        <Image
                            src={pokemon.sprites.other?.["official-artwork"].front_default || ""}
                            alt={pokemon.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                    <h1 className="text-5xl font-black text-white drop-shadow-md mt-4">
                        {formatName(pokemon.name)}
                    </h1>
                    <div className="flex gap-3 mt-4">
                        {pokemon.types.map(t => (
                            <span key={t.type.name} className="px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold capitalize border border-white/30">
                                {t.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* About Card */}
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">About</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-6">
                            {flavorText}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                                <span className="text-sm text-neutral-500 block mb-1">Height</span>
                                <span className="text-xl font-bold">{pokemon.height / 10} m</span>
                            </div>
                            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                                <span className="text-sm text-neutral-500 block mb-1">Weight</span>
                                <span className="text-xl font-bold">{pokemon.weight / 10} kg</span>
                            </div>
                            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl col-span-2">
                                <span className="text-sm text-neutral-500 block mb-1">Abilities</span>
                                <div className="flex flex-wrap gap-2">
                                    {pokemon.abilities.map(a => (
                                        <span key={a.ability.name} className="font-medium capitalize px-3 py-1 bg-white dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600">
                                            {a.ability.name.replace('-', ' ')} {a.is_hidden && '(Hidden)'}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">Base Stats</h2>
                        <StatChart stats={pokemon.stats} color={themeColor} />

                        <div className="mt-6 space-y-3">
                            {pokemon.stats.map(s => (
                                <div key={s.stat.name} className="flex items-center gap-4">
                                    <span className="w-32 font-medium text-neutral-500 uppercase text-xs tracking-wider">{s.stat.name.replace('-', ' ')}</span>
                                    <div className="flex-1 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: `${(s.base_stat / 255) * 100}%`, backgroundColor: themeColor }}
                                        />
                                    </div>
                                    <span className="w-8 text-right font-bold">{s.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
