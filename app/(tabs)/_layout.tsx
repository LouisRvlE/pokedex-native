import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, Image } from "react-native";

import Colors from "../../constants/Colors";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "My Pokedex",
                    tabBarIcon: ({ color, focused }) => (
                        // <TabBarIcon
                        //     name="square-o"
                        //     color={focused ? "red" : "gray"}
                        // />
                        <Image
                            source={
                                focused
                                    ? require("../../assets/pokedex_active.png")
                                    : require("../../assets/pokedex.png")
                            }
                            style={{ width: 24, height: 24 }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "All Pokemon",
                    tabBarIcon: ({ color, focused }) => (
                        // <TabBarIcon
                        //     name="search"
                        //     color={focused ? "red" : "gray"}
                        // />
                        <Image
                            source={
                                focused
                                    ? require("../../assets/grass_active.png")
                                    : require("../../assets/grass.png")
                            }
                            style={{ width: 24, height: 24 }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
