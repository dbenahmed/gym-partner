import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SetsContainer({ item, index, updateExerciseData }) {
    return (
        <View key={index} style={styles.setRow}>
            <Text style={styles.setNumber}>{index + 1}</Text>
            <View style={[styles.rowContainer, styles.flex1]}>
                {index === 0 && <Text style={styles.inputLabel}>Previous Reps</Text>}
                <View style={styles.previousRepsViewStyles}>
                    <Text style={styles.previousRepsText}>
                        {[10, 20, 18].map((rep, idx) => (
                            idx === 0 ? `${rep}` : `, ${rep}`
                        )).join('')}
                    </Text>
                </View>
            </View>

            <View style={[styles.rowContainer, styles.width50]}>
                {index === 0 && <Text style={styles.inputLabel}>Reps</Text>}
                <TextInput
                    style={styles.input}
                    value={item.reps}
                    onChangeText={(value) => {
                        const updatedSets = [...item.sets];
                        updatedSets[index].reps = value;
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
                    value={item.weight}
                    onChangeText={(value) => {
                        const updatedSets = [...item.sets];
                        updatedSets[index].weight = value;
                        updateExerciseData(item.id, 'sets', updatedSets);
                    }}
                    keyboardType="numeric"
                    placeholder="0"
                />
            </View>
            <View style={[styles.rowContainer, styles.width50]}>
                {index === 0 && <Text style={styles.inputLabel}>Unit</Text>}
                <TouchableOpacity
                    style={[styles.input]}
                    onPress={() => {
                        const updatedSets = [...item.sets];
                        const currentUnit = updatedSets[index].unit || 'kg';
                        updatedSets[index].unit = currentUnit === 'kg' ? 'lbs' : 'kg';
                        updateExerciseData(item.id, 'sets', updatedSets);
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#495057' }}>
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

const styles = StyleSheet.create({
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
        color: '#666',
        marginBottom: 3,
    },

    input: {
        backgroundColor: '#f1f3f5',
        borderRadius: 4,
        padding: 6,
        fontSize: 14,
        height: 34,
    },
    setNumber: {
        width: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#555',
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
        backgroundColor: '#f1f3f5',
        borderRadius: 4,
        padding: 6,
        fontSize: 14,
        height: 34,
    },
    previousRepText: {
        fontSize: 11,
        color: '#888',
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
        color: '#555',
        textAlign: 'center',
    }
});
