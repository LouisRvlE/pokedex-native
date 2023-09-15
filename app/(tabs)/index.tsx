import React, { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Pokemon from "../../components/Pokemon";
import sort from "../../scripts/sort";
import { usePokemonList } from "../../scripts/storage";
import { PokemonData } from "../../types";
import pokemonTypes from "../../scripts/pokemonTypes";
import objectKeys from "../../scripts/objectKeys";
import captilize from "../../scripts/captilize";

export default function App() {
    const [sortBy, setSortBy] = useState<keyof PokemonData>("id");
    const [selectedTypes, setSelectedTypes] = useState<
        (keyof typeof pokemonTypes)[]
    >([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const { list } = usePokemonList();

    const sortByList: { key: keyof PokemonData; label: string }[] = [
        { key: "height", label: "Height" },
        { key: "id", label: "Identifier" },
        { key: "name", label: "Name" },
    ];

    const toggleType = (newType: keyof typeof pokemonTypes) => {
        setSelectedTypes((old) =>
            old.includes(newType)
                ? old.filter((key) => key !== newType)
                : [...old, newType]
        );
    };

    const filteredList = useMemo(
        () =>
            list
                ?.filter((el) => {
                    let yes = el.name.includes(search);
                    if (selectedTypes.length > 0 && yes) {
                        selectedTypes.forEach((type) => {
                            if (!el.types.find((el) => el.type.name === type)) {
                                yes = false;
                            }
                        });
                    }
                    return yes;
                })
                ?.sort(sort(sortBy)),
        [search, list, sortBy, selectedTypes]
    );

    console.log(objectKeys(pokemonTypes));

    return (
        <ScrollView style={styles.container}>
            <View style={styles.search}>
                <Text style={styles.searchText}>Search by name :</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        color: "white",
                        padding: 15,
                    }}
                    onChangeText={(text) => setSearch(text.toLowerCase())}
                />
            </View>
            <View style={styles.pressList}>
                {sortByList.map(({ label, key }) => (
                    <Pressable
                        style={
                            sortBy === key ? styles.pressActive : styles.press
                        }
                        key={key}
                        onPress={() => setSortBy(key)}
                    >
                        <Text
                            style={
                                sortBy === key
                                    ? styles.pressTextActive
                                    : styles.pressText
                            }
                        >
                            {label}
                        </Text>
                    </Pressable>
                ))}
            </View>
            <View style={styles.pressList}>
                {objectKeys(pokemonTypes).map((key) => (
                    <Pressable
                        style={
                            selectedTypes.includes(key)
                                ? styles.pressActive
                                : {
                                      ...styles.press,
                                      backgroundColor: pokemonTypes[key].color,
                                  }
                        }
                        key={key}
                        onPress={() => toggleType(key)}
                    >
                        <Text
                            style={
                                selectedTypes.includes(key)
                                    ? {
                                          ...styles.pressTextActive,
                                          color: pokemonTypes[key].color,
                                      }
                                    : styles.pressText
                            }
                        >
                            {captilize(key)}
                        </Text>
                    </Pressable>
                ))}
            </View>
            <Text> {sortBy} </Text>
            <View style={styles.list}>
                {filteredList?.map((el) => (
                    <Pokemon pokemonData={el} key={el.id} />
                ))}
            </View>
            {filteredList.length === 0 && list.length !== 0 ? (
                <Text style={{ color: "white", textAlign: "center" }}>
                    There is no Pokemon in your collection corresponding to your
                    search
                </Text>
            ) : (
                <></>
            )}
            {list.length === 0 ? (
                <Text style={{ color: "white", textAlign: "center" }}>
                    Go catch some Pokemon
                </Text>
            ) : (
                <></>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        maxHeight: "auto",
        paddingVertical: 5,
        color: "white",
    },
    list: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        columnGap: 20,
        rowGap: 50,
        flex: 1,
        alignContent: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    pressList: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 5,
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
    },
    pressActive: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        margin: 5,
    },
    press: {
        backgroundColor: "#FF2244",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        margin: 5,
    },
    pressTextActive: {
        color: "black",
        fontWeight: "700",
    },
    pressText: {
        color: "white",
        fontWeight: "700",
    },
    search: {
        display: "flex",
        alignSelf: "center",
        marginVertical: 5,
        flexDirection: "row",
        gap: 10,
        borderRadius: 3,
        color: "white",
    },
    searchText: {
        alignSelf: "center",
        color: "white",
    },
});
