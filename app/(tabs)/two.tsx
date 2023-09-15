import React, { useEffect, useState } from "react";
import {
    Button,
    View,
    StyleSheet,
    ScrollView,
    Pressable,
    Text,
} from "react-native";
import PokemonWrapper from "../../components/PokemonFetchWrapper";
import { PokemonData } from "../../types";
import { usePokemonListAction } from "../../scripts/storage";

export default function AllList() {
    const [result, setResult] = useState<{
        previous: string;
        next: string;
        results: { url: string }[];
    }>();

    const [actual, setActual] = useState<string>(
        "https://pokeapi.co/api/v2/pokemon/?limit=11"
    );
    const [loading, setLoading] = useState(true);
    const makeFetch = async (url: string) => {
        if (actual !== url) {
            setActual(url);
        }
        setLoading(true);
        const res = await fetch(url);
        const result = await res.json();
        setResult(result);
        setLoading(false);
    };

    console.log("act", actual);

    usePokemonListAction(makeFetch, actual);

    const controls = (
        <View style={styles.controls}>
            {result?.previous ? (
                <Pressable
                    style={styles.press}
                    disabled={loading}
                    onPress={() => makeFetch(result.previous)}
                >
                    <Text>{"<"}</Text>
                </Pressable>
            ) : (
                <View />
            )}
            {result?.next && (
                <Pressable
                    style={styles.press}
                    disabled={loading}
                    onPress={() => makeFetch(result.next)}
                >
                    <Text>{">"}</Text>
                </Pressable>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scollContainer}>
                {controls}
                <View style={styles.list}>
                    {result?.results?.map((el) => (
                        <PokemonWrapper url={el.url} key={el.url} />
                    ))}
                </View>
                {controls}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
    },
    scollContainer: {
        flex: 1,
        maxHeight: "auto",
        padding: 5,
    },
    list: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        columnGap: 20,
        rowGap: 50,
        flex: 1,
        alignContent: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        flexWrap: "wrap",
    },
    controls: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    press: {
        backgroundColor: "#FF0000",
        paddingHorizontal: 10,
        color: "#FFFFFF",
        fontWeight: "900",
        aspectRatio: "1/1",
        fontSize: 20,
        paddingVertical: 5,
        borderRadius: 100,
        margin: 5,
    },
});
