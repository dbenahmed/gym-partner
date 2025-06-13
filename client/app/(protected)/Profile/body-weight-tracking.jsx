import useThemeContext from "@/context/themeContext";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Button from "@/components/ui/Button";


export default function BodyWeightTrackingScreen() {

    const { colors, theme } = useThemeContext();
    const fakeData = Array.from({ length: 50 }, (_, index) => ({
        id: index.toString(),
        weight: Math.floor(Math.random() * 50) + 50, // Random weight between 50-100
        height: Math.floor(Math.random() * 50) + 150, // Random height between 150-200
    }));

    const [data, setData] = useState(fakeData);

    const renderItem = ({ item }) => (
        <View className="bg-blue-500 p-3" >
            <Text className="">Weight: 24 kg</Text>
            <Text>Height: 24 cm</Text>
        </View>
    );

    const logNewWeight = () => {
        const newEntry = {
            id: data.length.toString(),
            weight: Math.floor(Math.random() * 50) + 50,
            height: Math.floor(Math.random() * 50) + 150,
        };
        setData((prevData) => [...prevData, newEntry]);
    };
    return (
        <View className="bg-red-500 p-8" style={{ flex: 1 }}>



            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onEndReachedThreshold={0.5}
                /* onEndReached={() => {
                    // fetch another new data
                }} */
                />
                <Button title="Log New Weight" onPress={logNewWeight} />
            </View>

        </View>
    );
}

