import { MMKV } from "react-native-mmkv";
import { PokemonData } from "../types";
import { useEffect, useState, useMemo } from "react";
import sort from "./sort";

export const storage = new MMKV();

export const POKEMON_STORAGE_KEY = "pokemonList";

export function getPokemonStorage(): PokemonData[] {
    if (storage.contains(POKEMON_STORAGE_KEY)) {
        let s = storage.getString(POKEMON_STORAGE_KEY) as string;
        let result = JSON.parse(s);
        if (typeof result === "object") {
            return result;
        }
    }
    return [];
}

export function usePokemonList() {
    const [list, setList] = useState<PokemonData[]>(() => getPokemonStorage());

    useEffect(() => {
        const listener = storage.addOnValueChangedListener((key) => {
            setList(getPokemonStorage());
        });
        return () => {
            listener.remove();
        };
    }, []);

    // const resort = (newSortBy: keyof PokemonData) => {
    //     setList((old) => {
    //         const newResult = [...old];
    //         newResult.sort(sort(newSortBy));
    //         return newResult;
    //     });
    // };

    return { list };
}
export function usePokemonListAction<Param>(
    action: (param: Param) => any,
    param: Param
) {
    useEffect(() => {
        action(param);
        const listener = storage.addOnValueChangedListener((key) => {
            action(param);
        });
        return () => {
            listener.remove();
        };
    }, [param]);
}

export function usePokemonCatch(pokemon: PokemonData) {
    const { list } = usePokemonList();

    const isIn = useMemo(
        () => (list.find((el) => el.id === pokemon.id) ? true : false),
        [list]
    );

    const toggle = () => {
        if (isIn) {
            removePokemon(pokemon.id);
        } else {
            addPokemon(pokemon);
        }
    };

    return [isIn, toggle] as [boolean, () => {}];
}

export function addPokemon(toAdd: PokemonData) {
    let currentList = getPokemonStorage();

    if (currentList.find((el) => el.id === toAdd.id)) return true;
    currentList.push(toAdd);
    storage.set(POKEMON_STORAGE_KEY, JSON.stringify(currentList));
    return false;
}

export function removePokemon(id: number) {
    let currentList = getPokemonStorage();
    currentList = currentList.filter((el) => el.id !== id);
    storage.set(POKEMON_STORAGE_KEY, JSON.stringify(currentList));
    return true;
}
