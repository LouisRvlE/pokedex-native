import React, { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import captilize from "../scripts/captilize";
import { usePokemonCatch } from "../scripts/storage";
import { PokemonData, types } from "../types";
import pokemonTypes from "../scripts/pokemonTypes";

const Pokemon = ({ pokemonData }: { pokemonData: PokemonData }) => {
    const [isPress, setPress] = useState(false);
    const [modal, setModal] = useState(() => pokemonData.name === "dragonair");

    const [isCatch, toggle] = usePokemonCatch(pokemonData);

    const wantedKeys: (keyof PokemonData)[] = [
        "height",
        "weight",
        "base_experience",
    ];

    return (
        <View style={styles.container}>
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
            <View style={styles.catchContainer}>
                <Text style={styles.name}>
                    {pokemonData ? captilize(pokemonData.name) : "Chargement"}
                </Text>
                <Pressable style={styles.catchButton} onPress={toggle}>
                    <Image
                        style={styles.catchImage}
                        source={
                            isCatch
                                ? require("../assets/pokemon_black.svg")
                                : require("../assets/pokemon_white.svg")
                        }
                    />
                </Pressable>
            </View>
            <View>
                <View style={styles.types}>
                    {pokemonData.types.map(({ type: { name, url } }, id) => (
                        <View
                            style={{
                                backgroundColor: pokemonTypes?.[name]?.color,
                                ...styles.typeChip,
                            }}
                            key={url}
                        >
                            <Text style={styles.typeText}>
                                {captilize(name)}
                            </Text>
                        </View>
                    ))}
                </View>
                <Pressable
                    style={styles.showInfos}
                    onPress={() => setModal(true)}
                >
                    <Text style={styles.showInfosText}>Show infos</Text>
                </Pressable>
            </View>
            <View>
                <Modal
                    animationType="fade"
                    transparent
                    visible={modal}
                    onRequestClose={() => setModal(false)}
                >
                    <View
                        style={{
                            // backgroundColor: "white",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(5px)",
                        }}
                    >
                        <View
                            style={{
                                height: 300,
                                width: 600,
                                display: "flex",
                                flexDirection: "row",
                                borderColor: "white",
                                borderWidth: 1,
                                borderRadius: 10,
                                overflow: "hidden",
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "black",
                                    height: 300,
                                    width: 300,
                                }}
                            >
                                <Image
                                    style={{
                                        height: 300,
                                        width: 300,
                                    }}
                                    source={{
                                        uri: pokemonData.sprites[
                                            isPress
                                                ? "front_shiny"
                                                : "front_default"
                                        ],
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    backgroundColor: "black",
                                    display: "flex",
                                    gap: 20,
                                    width: 300,
                                    padding: 20,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 20, color: "white" }}
                                    >
                                        {captilize(pokemonData.name)}
                                    </Text>
                                    <Pressable
                                        style={styles.catchButton}
                                        onPress={() => setModal(false)}
                                    >
                                        <Text style={styles.catchText}>X</Text>
                                    </Pressable>
                                </View>
                                {wantedKeys.map((key, id) => (
                                    <Text
                                        style={{
                                            fontWeight: "700",
                                            color: "white",
                                        }}
                                    >
                                        {captilize(key)} :{" "}
                                        <Text
                                            style={{
                                                fontWeight: "400",
                                                color: "white",
                                            }}
                                        >
                                            {pokemonData[key] as string}
                                        </Text>
                                    </Text>
                                ))}

                                <View style={styles.types}>
                                    {pokemonData.types.map(
                                        ({ type: { name, url } }, id) => (
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        pokemonTypes?.[name]
                                                            ?.color,
                                                    ...styles.typeChip,
                                                }}
                                                key={url}
                                            >
                                                <Text style={styles.typeText}>
                                                    {captilize(name)}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    name: {
        fontSize: 25,
        color: "white",
        textAlign: "center",
    },
    container: {
        alignSelf: "flex-start",
        alignItems: "center",
        width: 200,
        height: 300,
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
        // flex: 1,
        width: 200,
        gap: 5,
        flexWrap: "wrap",
    },
    typeChip: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 100,
        // width: 100,
        // minWidth: 100,
        width: 100,
        flex: 1,
    },
    typeText: {
        color: "white",
        textAlign: "center",
    },
    catchButton: {
        backgroundColor: "red",
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 10,
    },
    catchText: {
        textAlign: "center",
        color: "white",
        fontWeight: "600",
    },
    showInfos: {
        textAlign: "center",
        color: "red",
        backgroundColor: "white",
        fontWeight: "600",
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 10,
    },
    showInfosText: {
        textAlign: "center",
        color: "red",
        backgroundColor: "white",
        fontWeight: "600",
    },
    catchContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "baseline",
    },
    catchImage: {
        width: 24,
        height: 24,
    },
});

export default Pokemon;
