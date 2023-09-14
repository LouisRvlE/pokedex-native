import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Pokemon from "./Pokemon";
import { PokemonData } from "../types";

const PokemonWrapper = ({ url }: { url: string }) => {
    const [result, setResult] = useState<PokemonData>();

    const makeFetch = async () => {
        const res = await fetch(url);
        const result = await res.json();
        setResult(result);
    };

    useEffect(() => {
        makeFetch();
    }, []);

    if (!result) {
        return (
            <Text style={{ color: "white", minHeight: 200, width: 150 }}>
                {" "}
                Loading...{" "}
            </Text>
        );
    }
    return <Pokemon pokemonData={result} />;
};

export default PokemonWrapper;
