import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SetsContainer from './setsContainer';
import Button from '@/components/ui/Button.jsx';
import useThemeContext from '@/context/themeContext';

export default function SessionExerciseContainer({ item, removeExercise, updateExerciseData }) {

    const { colors, theme } = useThemeContext();

    const styles = useMemo(() => StyleSheet.create({
        exerciseCard: {
            backgroundColor: colors.tintLighter,
            borderRadius: 10,
            padding: 15,
            width: "100%",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        exerciseHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        exerciseName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
        },
        exerciseCategory: {
            fontSize: 14,
            color: colors.text,
        },
        setsContainer: {
            marginTop: 10,
        },
        setsHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        setsTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text,
        },
        addSetButton: {
            paddingHorizontal: 10,
        },
        noSetsText: {
            color: colors.text,
            marginTop: 10,
        },
    }), [colors, theme]);


    useEffect(() => {
        console.log("itemeolieo", item)
    }, [item])


    return (
        <View style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <TouchableOpacity
                    hitSlop={20}
                    onPress={() => {
                        console.log("removing")
                        removeExercise(item.id)
                    }}>
                    <MaterialCommunityIcons name="close" size={20} color={colors.red} />
                </TouchableOpacity>
            </View>
            <Text style={styles.exerciseCategory}>{item.category}</Text>

            <View style={styles.setsContainer}>
                <View style={styles.setsHeader}>
                    <Text style={styles.setsTitle}>Sets</Text>
                    <TouchableOpacity
                        style={styles.addSetButton}
                        hitSlop={15}
                        onPress={() => {
                            console.log("item", item)
                            const updatedSets = Array.isArray(item.sets) ? [...item.sets] : [];
                            updatedSets.push({ reps: 0, weight: 0, unit: 'kg' });
                            console.log("updatedSets", updatedSets)
                            console.log("hihi")
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


