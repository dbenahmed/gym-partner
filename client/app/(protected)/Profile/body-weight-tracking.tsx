import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TextInput } from "react-native";
import useThemeContext from "@/context/themeContext";
import useAuth from "@/context/authContext";
import Button from "@/components/ui/Button";
import ModalSlideUp from "@/components/ui/ModalSlideUp";

import { WeightListItem, useWeightData } from "@/features/weight-tracking";

export default function BodyWeightTrackingScreen() {
    const { colors, theme } = useThemeContext();
    const { authenticated } = useAuth();

    const { weights, updateWeight: apiUpdateWeight, deleteWeight, logNewWeight: apiLogNewWeight } = useWeightData();
    const [UpdateWeightModalVisible, setUpdateWeightModalVisible] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [unit, setUnit] = useState("kg");
    const [weight, setWeight] = useState<string>("");

    const handleUpdateWeight = async (id: any) => {
        const success = await apiUpdateWeight(id, weight, unit);
        if (success) {
            setUpdateWeightModalVisible(false);
            setWeight("");
            setSelectedWeight(null);
        }
    };

    const handleLogNewWeight = async () => {
        const success = await apiLogNewWeight(weight, unit);
        if (success) {
            setWeight("");
            setIsVisible(false);
        }
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 32, paddingVertical: 16 }}>
            <ModalSlideUp
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                props={{
                    title: "Add new weight",
                }}
            >
                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabel, { color: colors.text }]}>Weight:</Text>
                    <TextInput
                        style={[styles.input, { borderColor: colors.tint, color: colors.text }]}
                        placeholder="Enter weight"
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                        selectTextOnFocus
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabel, { color: colors.text }]}>Unit:</Text>
                    <Button
                        text={unit === "kg" ? "kg" : "lbs"}
                        onClick={() => setUnit(unit === "kg" ? "lbs" : "kg")}
                    />
                </View>
                <View style={{ marginTop: 16 }}>
                    <Button text="Log Weight" onClick={handleLogNewWeight} />
                </View>
            </ModalSlideUp>

            <ModalSlideUp 
                isVisible={UpdateWeightModalVisible} 
                onClose={() => {
                    setWeight(""); 
                    setSelectedWeight(null); 
                    setUpdateWeightModalVisible(false)
                }} 
                props={{ title: "Update Weight" }} 
            >
                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabel, { color: colors.text }]}>Weight:</Text>
                    <TextInput
                        style={[styles.input, { borderColor: colors.tint, color: colors.text }]}
                        placeholder="Enter weight"
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                        selectTextOnFocus
                    />
                </View>
                <Button text="Update Weight" onClick={() => handleUpdateWeight(selectedWeight?.id)} />
            </ModalSlideUp>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={weights}
                    renderItem={({ item }) => (
                        <WeightListItem 
                            item={item} 
                            colors={colors} 
                            onUpdate={(w: any) => {
                                setUpdateWeightModalVisible(true);
                                setSelectedWeight(w);
                            }}
                            onDelete={deleteWeight}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.5}
                />
                <Button text="Log New Weight" onClick={() => { setIsVisible(true) }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: 'transparent',
    }
});