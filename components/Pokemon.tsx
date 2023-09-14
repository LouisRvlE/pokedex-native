import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import captilize from "../scripts/captilize";
import { usePokemonCatch } from "../scripts/storage";
import { PokemonData, types } from "../types";

const Pokemon = ({ pokemonData }: { pokemonData: PokemonData }) => {
    const [isPress, setPress] = useState(false);

    const typeStyles: Record<types, { color: string }> = {
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

    const [isCatch, toggle] = usePokemonCatch(pokemonData);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {pokemonData ? captilize(pokemonData.name) : "Chargement"}
            </Text>
            {pokemonData && pokemonData?.sprites?.front_default && (
                <Pressable
                    onPressIn={() => setPress(true)}
                    onPressOut={() => setPress(false)}
                >
                    <Image
                        style={styles.frontImage}
                        source={{
                            uri: pokemonData.sprites[
                                isPress ? "front_shiny" : "front_default"
                            ],
                        }}
                    />
                    <Image
                        style={styles.back}
                        source={{
                            uri: pokemonData.sprites["front_shiny"],
                        }}
                    />
                </Pressable>
            )}
            <View style={styles.types}>
                {pokemonData.types.map(({ type: { name, url } }, id) => (
                    <View
                        style={{
                            backgroundColor: typeStyles?.[name]?.color,
                            ...styles.typeChip,
                        }}
                        key={url}
                    >
                        <Text style={styles.typeText}>{captilize(name)}</Text>
                    </View>
                ))}
            </View>
            <Pressable style={{ backgroundColor: "red" }} onPress={toggle}>
                <Text> {isCatch ? "Release" : "Catch"} </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    name: {
        fontSize: 25,
        color: "white",
    },
    container: {
        alignItems: "center",
        width: 200,
        minHeight: 200,
        // flex: 1,
    },
    frontImage: {
        height: 200,
        width: 200,
    },
    back: {
        height: 0,
        width: 0,
    },
    types: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap",
    },
    typeChip: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 100,
        // width: 100,
        minWidth: 100,
        flex: 1,
    },
    typeText: {
        color: "white",
        textAlign: "center",
    },
});

export default Pokemon;
