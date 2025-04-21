import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SetsContainer from './setsContainer';

export default function SessionExerciseContainer({ item, removeExercise, updateExerciseData }) {
    return (
        <View style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeExercise(item.id)}>
                    <MaterialCommunityIcons name="close" size={20} color="#ff6b6b" />
                </TouchableOpacity>
            </View>
            <Text style={styles.exerciseCategory}>{item.category}</Text>

            <View style={styles.setsContainer}>
                <View style={styles.setsHeader}>
                    <Text style={styles.setsTitle}>Sets</Text>
                    <TouchableOpacity
                        style={styles.addSetButton}
                        onPress={() => {
                            const updatedSets = Array.isArray(item.sets) ? [...item.sets] : [];
                            updatedSets.push({ reps: '', weight: '' });
                            updateExerciseData(item.id, 'sets', updatedSets);
                        }}
                    >
                        <MaterialCommunityIcons name="plus" size={20} color="#4CAF50" />
                    </TouchableOpacity>
                </View>

                {(!item.sets || item.sets.length === 0) ? (
                    <Text style={styles.noSetsText}>No sets added yet. Add your first set.</Text>
                ) : (
                    item.sets.map((set, index) => (
                        <SetsContainer 
                            key={index} 
                            item={item} 
                            set={set} 
                            index={index} 
                            updateExerciseData={updateExerciseData} 
                        />
                    ))
                )}
            </View>
        </View>
    );
}   

const styles = StyleSheet.create({
    exerciseCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    exerciseCategory: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    setsContainer: {
        marginTop: 8,
    },
    setsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    setsTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    addSetButton: {
        padding: 4,
    },
    noSetsText: {
        color: '#888',
        fontStyle: 'italic',
        textAlign: 'center',
        padding: 16,
    }
});
