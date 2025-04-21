import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import SessionExerciseContainer from '@/components/sessionExerciseContainer';
import { defaultUrl } from '@/constants/constants';
import useAuth from '@/app/contex/authcontex';
import { ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';




export default function StartSession() {
    const [exercises, setExercises] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sessionName, setSessionName] = useState('');
    const [sessionNotes, setSessionNotes] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const { date } = useLocalSearchParams();

    const [filteredExercises, setFilteredExercises] = useState([]);


    const { authenticated } = useAuth();

    // Mock exercise data for search results


    const addExerciseToSession = (exercise) => {
        // Check if the exercise already exists in the session
        const exerciseExists = exercises.some(existingExercise => existingExercise.id === exercise.id);

        if (exerciseExists) {
            Alert.alert(
                "Exercise Already Added",
                "This exercise is already in your session.",
                [{ text: "OK" }]
            );
            return;
        }
        setExercises([...exercises, {
            id: exercise.id,
            name: exercise.name,
            category: exercise.category,
            sets: []
        }]);
        setModalVisible(false);
    };


    const saveSession = async () => {
        if (!sessionName || !date) {
            console.log('sesions name or date not included')
            Alert.alert('Error', 'Please enter a session name and date');
            return;
        }
        console.log('Save Session exercises');
        const exercisesArray = exercises.map((exercise, index) => ({
            ...exercise,
            order: index
        }));
        console.log('exercisesArray', exercisesArray);
        console.log(date)
        const res = await fetch(`${defaultUrl}/workout/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticated}`
            },
            body: JSON.stringify({
                planId: null,
                dueDate: date,
                name: sessionName,
                startTime: null,
                endTime: null,
                note: sessionNotes,
                rating: null,
                exercisesArray: exercisesArray
            })
        });
        console.log('res', res)
        if (!res.ok) {
            console.log('Error saving session');
            Alert.alert('Error', 'Failed to save session');
            return;
        }
        const { success, message, data } = await res.json();
        if (!success) {
            console.log('error', message)
            Alert.alert('Error', message);
            return;
        }
        console.log('Session saved successfully');
        console.log(data);
        router.push('/sessions');
    }

    const updateExerciseData = (id, field, value) => {
        const updatedExercises = exercises.map(exercise =>
            exercise.id === id ? { ...exercise, [field]: value } : exercise
        );
        console.log('UPDATED EXOS', updatedExercises)
        setExercises(updatedExercises);
    };

    const removeExercise = (id) => {
        setExercises(exercises.filter(exercise => exercise.id !== id));
    };

    const searchExercises = async (query) => {
        setSearchQuery(query);
        if (query.length === 0) {
            setFilteredExercises([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const res = await fetch(`${defaultUrl}/explore/exercises?name=${query}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticated}`
            }
        });
        if (!res.ok) {
            console.log('Error fetching exercises');
            Alert.alert('Error', 'Failed to fetch exercises');
            return;
        }
        const { success, message, data } = await res.json();
        if (!success) {
            Alert.alert('Error', message);
            return;
        }

        setFilteredExercises(data.exercises);
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* Session Name Input */}

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Session Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter session name"
                    value={sessionName}
                    onChangeText={setSessionName}
                />
            </View>

            {/* Session Notes Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Notes (optional)</Text>
                <TextInput
                    style={[styles.textInput]}
                    placeholder="Add notes about this session"
                    value={sessionNotes}
                    onChangeText={setSessionNotes}
                    multiline={true}
                    numberOfLines={3}
                />
            </View>

            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => setModalVisible(true)}
            >
                <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
                <Text style={styles.searchButtonText}>Search Exercises</Text>
            </TouchableOpacity>

            {exercises.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>
                        No exercises added yet. Search and add exercises to your session.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id}
                    style={styles.flatListStyle}
                    renderItem={({ item }) => (
                        <SessionExerciseContainer item={item} removeExercise={removeExercise} updateExerciseData={updateExerciseData} />
                    )}
                />
            )}

            {exercises.length > 0 && (
                <TouchableOpacity style={styles.saveButton}
                    onPress={() => {
                        saveSession();
                    }}
                    disabled={exercises.length === 0}
                >
                    <Text style={styles.saveButtonText}>Save Session</Text>
                </TouchableOpacity>
            )}

            {/* Exercise Search Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Search Exercises</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search exercises..."
                            value={searchQuery}
                            onChangeText={searchExercises}
                        />

                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={Colors.light.tint} />
                                <Text style={styles.loadingText}>Loading exercises...</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={filteredExercises}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.searchResultItem}
                                        onPress={() => addExerciseToSession(item)}
                                    >
                                        <Text style={styles.searchResultName}>{item.name}</Text>
                                        <Text style={styles.searchResultCategory}>{item.category}</Text>
                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={
                                    <Text style={styles.emptySearchText}>No exercises found</Text>
                                }
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    textInputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        color: '#333',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
        textAlignVertical: 'top',
        minHeight: 100,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchButton: {
        backgroundColor: Colors.light.tint,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
    },
    flatListStyle: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: Colors.light.tint,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
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
        marginBottom: 4,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    exerciseCategory: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 60,
    },
    inputContainer: {
        marginHorizontal: 4,
        justifyContent: 'flex-end',
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#f1f3f5',
        borderRadius: 4,
        padding: 6,
        fontSize: 8,
        height: 36,
    },
    setNumber: {
        width: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#555',
        alignSelf: 'flex-end',
        marginBottom: 8,
    },
    removeSetButton: {
        padding: 8,
        alignSelf: 'flex-end',
        marginBottom: 4,
    },
    addSetButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.light.tint,
        alignSelf: 'center',
        marginTop: 8,
    },
    previousRepsContainer: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 12,
        alignItems: 'center',
        height: 30,
    },
    previousRepsLabel: {
        fontSize: 12,
        color: '#666',
        marginRight: 6,
    },
    previousRepBox: {
        backgroundColor: '#e9ecef',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        marginRight: 4,
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 24,
    },
    previousRepText: {
        fontSize: 12,
        color: '#495057',
        textAlign: 'center',
    },
    setRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 6,
        padding: 8,
        height: 76,
    },
    setInputsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 60,
    },
    setInputGroup: {
        flex: 1,
        marginHorizontal: 4,
        height: 60,
        justifyContent: 'flex-end',
    },
    setInputLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    setInput: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 6,
        fontSize: 14,
        height: 36,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 20,
        maxHeight: '80%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchInput: {
        backgroundColor: '#f1f3f5',
        padding: 12,
        borderRadius: 8,
        margin: 16,
        fontSize: 16,
    },
    searchResultItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchResultName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchResultCategory: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    emptySearchText: {
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    categoryPicker: {
        backgroundColor: '#f1f3f5',
        borderRadius: 8,
        marginVertical: 8,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    previousSetInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        height: 20,
    },
    previousSetLabel: {
        fontSize: 11,
        color: '#888',
        marginRight: 4,
    },
    previousSetValue: {
        fontSize: 11,
        color: '#555',
        fontWeight: '500',
    },
});
