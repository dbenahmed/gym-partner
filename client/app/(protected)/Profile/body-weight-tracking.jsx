import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TextInput } from "react-native";
import useThemeContext from "@/context/themeContext";
import useAuth from "@/context/authContext";
import Button from "@/components/ui/Button";
import ModalSlideUp from "@/components/ui/ModalSlideUp";

import WeightListItem from "@/features/weight-tracking/components/WeightListItem";
import { fetchWeights, fetchLogWeight, fetchUpdateWeight, fetchDeleteWeight } from "@/features/weight-tracking/api/weightApi";

export default function BodyWeightTrackingScreen() {
    const { colors, theme } = useThemeContext();
    const { authenticated } = useAuth();

    const [UpdateWeightModalVisible, setUpdateWeightModalVisible] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [weights, setWeights] = useState([]);
    const [unit, setUnit] = useState("kg");
    const [weight, setWeight] = useState(null);

    const loadWeights = async () => {
        const { success, data, message } = await fetchWeights(authenticated);
        if (success) {
            setWeights(data);
        } else {
            Alert.alert('Error', message || 'Failed to fetch weights');
        }
    };

    useEffect(() => {
        loadWeights();
    }, []);

    const updateWeight = async (id) => {
        const { success, message } = await fetchUpdateWeight(authenticated, id, weight, unit);
        if (success) {
            Alert.alert('Success', 'Weight updated successfully');
            loadWeights();
            setUpdateWeightModalVisible(false);
            setWeight(null);
            setSelectedWeight(null);
        } else {
            Alert.alert('Error', message || 'Failed to update weight');
        }
    };

    const deleteWeight = async (id) => {
        const { success, message } = await fetchDeleteWeight(authenticated, id);
        if (success) {
            Alert.alert('Success', 'Weight deleted successfully');
            loadWeights();
        } else {
            Alert.alert('Error', message || 'Failed to delete weight');
        }
    };

    const logNewWeight = async () => {
        const { success, message } = await fetchLogWeight(authenticated, weight, unit);
        if (success) {
            Alert.alert('Success', 'Weight logged successfully');
            setWeight(null);
            setIsVisible(false);
            loadWeights();
        } else {
            Alert.alert('Error', message || 'Failed to log weight');
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
                    <Button text="Log Weight" onClick={logNewWeight} />
                </View>
            </ModalSlideUp>

            <ModalSlideUp 
                isVisible={UpdateWeightModalVisible} 
                onClose={() => {
                    setWeight(null); 
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
                <Button text="Update Weight" onClick={() => updateWeight(selectedWeight.id)} />
            </ModalSlideUp>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={weights}
                    renderItem={({ item }) => (
                        <WeightListItem 
                            item={item} 
                            colors={colors} 
                            onUpdate={(w) => {
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