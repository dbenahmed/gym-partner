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
        <View style={[styles.listItem, { backgroundColor: colors.tintLighter }]}>
            <Text style={[styles.listItemText, { color: colors.text }]}>
                Weight: {item.weight} kg
            </Text>
            <Text style={[styles.listItemText, { color: colors.text }]}>
                Height: {item.height} cm
            </Text>
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
        <View className="pr-8 pl-8 pt-4 pb-4" style={{ flex: 1 }}>
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


const styles = StyleSheet.create({
    listItem: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
    },
    listItemText: {
        fontSize: 16,
    },
});