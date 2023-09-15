import { types } from "../types";

const pokemonTypes: Record<types, { color: string }> = {
    steel: { color: "#60a2b9" },
    fighting: { color: "#ff8100" },
    dragon: { color: "#4f60e2" },
    water: { color: "#2481f0" },
    electric: { color: "#fac100" },
    fairy: { color: "#ef71f0" },
    fire: { color: "#e72324" },
    ice: { color: "#3dd9ff" },
    bug: { color: "#92a212" },
    normal: { color: "#a0a2a0" },
    grass: { color: "#3da224" },
    poison: { color: "#923fcc" },
    psychic: { color: "#ef3f7a" },
    rock: { color: "#b0ab82" },
    ground: { color: "#92501b" },
    ghost: { color: "#713f71" },
    dark: { color: "#4f3f3d" },
    flying: { color: "#82baf0" },
};

export default pokemonTypes;
