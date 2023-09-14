import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, ScrollView } from "react-native";
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
        "https://pokeapi.co/api/v2/pokemon/?limit=24"
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

    usePokemonListAction(makeFetch, actual);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scollContainer}>
                <View style={styles.controls}>
                    {result?.previous ? (
                        <Button
                            disabled={loading}
                            title="<"
                            onPress={() => makeFetch(result.previous)}
                        />
                    ) : (
                        <View />
                    )}
                    {result?.next && (
                        <Button
                            disabled={loading}
                            title=">"
                            onPress={() => makeFetch(result.next)}
                        />
                    )}
                </View>
                <View style={styles.list}>
                    {result?.results?.map((el) => (
                        <PokemonWrapper url={el.url} key={el.url} />
                    ))}
                </View>
                <View style={styles.controls}>
                    {result?.previous ? (
                        <Button
                            disabled={loading}
                            title="<"
                            onPress={() => makeFetch(result.previous)}
                        />
                    ) : (
                        <View />
                    )}
                    {result?.next && (
                        <Button
                            disabled={loading}
                            title=">"
                            onPress={() => makeFetch(result.next)}
                        />
                    )}
                </View>
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
});
