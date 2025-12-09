import { Pokemon, PokemonListResponse, PokemonSpecies, EvolutionChain } from "@/types/pokemon";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
    const res = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) {
        throw new Error("Failed to fetch pokemon list");
    }
    return res.json();
}

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${nameOrId}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch pokemon: ${nameOrId}`);
    }
    return res.json();
}

export async function getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    const res = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${nameOrId}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch pokemon species: ${nameOrId}`);
    }
    return res.json();
}

export async function getEvolutionChain(url: string): Promise<EvolutionChain> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch evolution chain");
    }
    return res.json();
}

export async function getPokemonByType(type: string) {
    const res = await fetch(`${POKEAPI_BASE_URL}/type/${type}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch type: ${type}`);
    }
    return res.json();
}
