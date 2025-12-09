"use client";

import { Pokemon } from "@/types/pokemon";
import { formatName } from "@/lib/pokemon";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const mainType = pokemon.types[0].type.name;

    return (
        <Link href={`/pokemon/${pokemon.id}`}>
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "relative overflow-hidden rounded-2xl p-6 shadow-lg transition-colors duration-300",
                    "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
                    "hover:shadow-xl cursor-pointer group"
                )}
            >
                <div
                    className={cn(
                        "absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-10 blur-2xl transition-colors duration-300",
                        `bg-type-${mainType}`
                    )}
                />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="flex justify-between w-full mb-4">
                        <span className="text-sm font-bold text-neutral-400">#{pokemon.id.toString().padStart(3, '0')}</span>
                    </div>

                    <div className="relative w-32 h-32 mb-4">
                        <Image
                            src={pokemon.sprites.other?.["official-artwork"].front_default || pokemon.sprites.front_default || ""}
                            alt={pokemon.name}
                            fill
                            className="object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                        {formatName(pokemon.name)}
                    </h2>

                    <div className="flex gap-2">
                        {pokemon.types.map((type) => (
                            <span
                                key={type.type.name}
                                className={cn(
                                    "px-3 py-1 text-xs font-semibold rounded-full text-white capitalize shadow-sm",
                                    `bg-type-${type.type.name}`
                                )}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
