import { PokemonData } from "../types";

export default function (newSortBy: keyof PokemonData) {
    return (a: PokemonData, b: PokemonData): number => {
        let elA = a[newSortBy];
        let elB = b[newSortBy];
        if (typeof elA === "string" && typeof elB === "string") {
            return elA.charCodeAt(0) - elB.charCodeAt(0);
        } else if (typeof elA === "number" && typeof elB === "number") {
            return elA - elB;
        }
        return 0;
    };
}
