import React, { useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useThemeContext from '@/context/themeContext';


export default function SetsContainer({ item, index, updateExerciseData }) {


    const { theme, colors } = useThemeContext();

    const styles = useMemo(() => StyleSheet.create({
        setRow: {
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'flex-end',
            marginBottom: 6,
        },
        rowContainer: {
            marginHorizontal: 2,
            justifyContent: 'flex-end',
        },
        inputLabel: {
            fontSize: 12,
            color: colors.text,
            marginBottom: 3,
        },

        input: {
            backgroundColor: "transparent",
            color: colors.text,
            borderWidth: 0.2,
            borderRadius: 4,
            padding: 6,
            fontSize: 14,
            height: 34,
            // drop shadow
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        setNumber: {
            width: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 14,
            color: colors.text,
            alignSelf: 'flex-end',
            marginBottom: 8,
        },
        removeSetButton: {
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 4,
        },
        flex1: {
            flex: 1,
        },
        width50: {
            width: 50,
        },
        previousRepBox: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 5,
        },
        previousRepsViewStyles: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
            borderRadius: 4,
            padding: 6,
            fontSize: 14,
            height: 34,
        },

        previousSetInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 3,
            height: 18,
        },
        previousSetLabel: {
            fontSize: 10,
            color: '#888',
            marginRight: 3,
        },
        previousSetValue: {
            fontSize: 10,
            color: '#555',
            fontWeight: '500',
        },
        previousRepsText: {
            fontSize: 12,
            color: colors.tint,
            fontWeight: "500",
            textAlign: 'center',
        }
    }), [colors, theme]);


    useEffect(() => {
        console.log('itemoooo', item);
        console.log("stats", item.statistics)

    }, [item]);

    return (
        <View key={index} style={styles.setRow}>
            <Text style={styles.setNumber}>{index + 1}</Text>
            <View style={[styles.rowContainer, styles.flex1]}>
                {index === 0 && <Text style={styles.inputLabel}>Previous Reps</Text>}
                <View style={styles.previousRepsViewStyles}>
                    <Text style={styles.previousRepsText}>
                        {item.statistics[index] &&
                            item.statistics[index].reps[index] ? `${item.statistics[index].weight[index]} ${item.statistics[index].unit[index]} ${item.statistics[index].reps[index]} Reps` : 'NO DATA'
                        }
                    </Text>
                </View>
            </View>

            <View style={[styles.rowContainer, styles.width50]}>
                {index === 0 && <Text style={styles.inputLabel}>Reps</Text>}
                <TextInput
                    autoFocus={true}
                    style={styles.input}
                    value={item.sets && item.sets[index] && item.sets[index].reps ? item.sets[index].reps.toString() : ''}
                    onChangeText={(value) => {
                        const updatedSets = [...item.sets];
                        updatedSets[index].reps = parseInt(value);
                        updateExerciseData(item.id, 'sets', updatedSets);
                    }}
                    keyboardType="numeric"
                    placeholder="0"
                />
            </View>

            <View style={[styles.rowContainer, styles.width50]}>
                {index === 0 && <Text style={styles.inputLabel}>Weight</Text>}
                <TextInput
                    style={[styles.input]}
                    value={item.sets && item.sets[index] && item.sets[index].weight ? item.sets[index].weight.toString() : ''}
                    onChangeText={(value) => {
                        const updatedSets = [...item.sets];
                        updatedSets[index].weight = parseInt(value);
                        updateExerciseData(item.id, 'sets', updatedSets);
                    }}
                    keyboardType="numeric"
                    placeholder="0"
                />
            </View>
            <View style={[styles.rowContainer, styles.width50]}>
                {index === 0 && <Text style={styles.inputLabel}>Unit</Text>}
                <TouchableOpacity
                    style={[styles.input, { backgroundColor: colors.background }]}
                    onPress={() => {
                        const updatedSets = [...item.sets];
                        const currentUnit = updatedSets[index].unit || 'kg';
                        updatedSets[index].unit = currentUnit === 'kg' ? 'lbs' : 'kg';
                        updateExerciseData(item.id, 'sets', updatedSets);
                    }}
                >
                    <Text style={{ fontSize: 14, color: colors.text }}>
                        {item.sets && item.sets[index] && item.sets[index].unit ? item.sets[index].unit : 'kg'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.removeSetButton}
                onPress={() => {
                    const updatedSets = item.sets.filter((_, i) => i !== index);
                    updateExerciseData(item.id, 'sets', updatedSets);
                }}
            >
                <MaterialCommunityIcons name="minus-circle" size={20} color="#ff6b6b" />
            </TouchableOpacity>
        </View >
    );
}
