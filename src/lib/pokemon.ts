export function getPokemonIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return parseInt(parts[parts.length - 1]);
}

export function getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
}

export const TYPE_COLORS: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};
