import useThemeContext from "@/context/themeContext";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import Button from "@/components/ui/Button";
import { defaultUrl } from "@/constants/constants";
import ModalSlideUp from "@/components/ui/ModalSlideUp";
import useAuth from "@/context/authContext";


export default function BodyWeightTrackingScreen() {

    const { colors, theme } = useThemeContext();
    const { authenticated } = useAuth();

    const [UpdateWeightModalVisible, setUpdateWeightModalVisible] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [weights, setWeights] = useState([]);
    const [unit, setUnit] = useState("kg");
    const [weight, setWeight] = useState(null);
    const fetchWeights = async () => {

        try {
            const response = await fetch(`${defaultUrl}/weight`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authenticated}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch weights');
            }
            const { success, data, message } = await response.json();
            if (!success) {
                throw new Error(message);
            }
            console.log(data)
            setWeights(data);
        } catch (error) {
            console.error('Error fetching weights:', error);
            Alert.alert('Error', error.message);
        }
    }


    useEffect(() => {
        fetchWeights();
    }, []);

    const updateWeight = async (id) => {
        try {
            const response = await fetch(`${defaultUrl}/weight/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authenticated}`
                },
                body: JSON.stringify({ weight, unit })
            });
            if (!response.ok) {
                throw new Error('Failed to update weight');
            }
            const { success, message } = await response.json();
            if (!success) {
                throw new Error(message);
            }
            Alert.alert('Success', 'Weight updated successfully');
            fetchWeights();
            setUpdateWeightModalVisible(false);
            setWeight(null);
            setSelectedWeight(null);
        } catch (error) {
            console.error('Error updating weight:', error);
        }
    }
    const deleteWeight = async (id) => {
        try {
            console.log(id)
            const response = await fetch(`${defaultUrl}/weight/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authenticated}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete weight');
            }
            const { success, message } = await response.json();
            console.log("message", message)
            if (!success) {
                throw new Error(message);
            }
            Alert.alert('Success', 'Weight deleted successfully');
            fetchWeights();
        } catch (error) {
            console.error('Error deleting weight:', error);
            Alert.alert('Error', error.message);
        }
    }

    const renderItem = ({ item }) => (
        <View style={[styles.listItem, { backgroundColor: colors.tintLighter, alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View className="flex-col gap-1">
                <Text style={[styles.listItemText, { color: colors.text }]}>
                    Date: {item.creationdate.split(' ')[0]}
                </Text>
                <Text style={[styles.listItemText, { color: colors.text }]}>
                    Weight: {item.weight} {item.unit}
                </Text>
            </View>
            <View className="flex-row gap-2">
                <Button
                    onClick={() => {
                        setUpdateWeightModalVisible(true)
                        setSelectedWeight(item);
                    }}
                    icon="pencil"
                    styles={{ width: 30, height: 30, padding: 0, margin: 0 }}

                />
                <Button
                    onClick={() => {
                        deleteWeight(item.id)
                    }}
                    icon="delete"
                    styles={{ width: 30, height: 30, padding: 0, margin: 0 }}
                />
            </View>
        </View>
    );


    const logNewWeight = async () => {
        try {
            const response = await fetch(`${defaultUrl}/weight`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authenticated}`
                },
                body: JSON.stringify({ weight, unit })
            });

            if (!response.ok) {
                throw new Error('Failed to log weight');
            }

            const { success, message } = await response.json();
            if (!success) {
                throw new Error(message);
            }

            Alert.alert('Success', 'Weight logged successfully');
            setWeight(null);
            setIsVisible(false);
            fetchWeights();
        } catch (error) {
            console.error('Error logging weight:', error);
            Alert.alert('Error', error.message);
        }
    };
    return (
        <View className="pr-8 pl-8 pt-4 pb-4" style={{ flex: 1 }}>
            <ModalSlideUp
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                props={{
                    title: "Add new weight",
                }}
            >

                <View style={styles.inputContainer}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: colors.text,
                        marginBottom: 8,
                    }}>Weight:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: colors.tint,
                            borderRadius: 8,
                            padding: 12,
                            fontSize: 16,
                            color: colors.text,
                            backgroundColor: 'transparent',
                            marginBottom: 16,
                        }}
                        placeholder="Enter weight"
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                        selectTextOnFocus

                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: colors.text,
                        marginBottom: 8,
                    }}>Unit:</Text>
                    <Button
                        text={unit === "kg" ? "kg" : "lbs"}
                        onClick={() => setUnit(unit === "kg" ? "lbs" : "kg")}
                    />
                </View>
                <View style={{ marginTop: 16 }}>
                    <Button text="Log Weight" onClick={logNewWeight} />
                </View>

            </ModalSlideUp>
            <ModalSlideUp isVisible={UpdateWeightModalVisible} onClose={() => {
                setWeight(null); setSelectedWeight(null); setUpdateWeightModalVisible(false)
            }} props={{ title: "Update Weight" }} className="pr-8 pl-8 pt-4 pb-4">
                <View style={styles.inputContainer}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: colors.text,
                        marginBottom: 8,
                    }}>Weight:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: colors.tint,
                            borderRadius: 8,
                            padding: 12,
                            fontSize: 16,
                            color: colors.text,
                            backgroundColor: 'transparent',
                            marginBottom: 16,
                        }}
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
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.5}
                /* onEndReached={() => {
                    // fetch another new data
                }} */
                />
                <Button text="Log New Weight" onClick={() => { setIsVisible(true) }} />
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