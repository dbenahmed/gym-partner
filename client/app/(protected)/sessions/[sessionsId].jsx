import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useAuth from '@/app/contex/authcontex';
import Colors from '@/constants/Colors';
import { defaultUrl } from '@/constants/constants';
import { router } from 'expo-router';
import { Stack } from 'expo-router';


export default function SessionDetails() {
    const { sessionsId } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [exercises, setExercises] = useState([]);
    const { authenticated } = useAuth();

    useEffect(() => {
        // In a real app, you would fetch the session data from the API
        // For now, we'll use mock data
        const fetchSessionDetails = async () => {
            setLoading(true);
            try {
                // Mock data for demonstration
                const mockSession = {
                    id: 69,
                    planId: null,
                    duedate: "2025-04-21",
                    name: "dd",
                    starttime: null,
                    endtime: null,
                    note: "dd",
                    rating: null,
                    createdBy: 84
                };

                const mockExercises = [
                    {
                        id: 72,
                        sessionId: 72,
                        exerciseId: 83,
                        creationdate: "2025-04-21 18:33:28.145916+00",
                        order: 0,
                        weight: [12],
                        unit: ["lbs"],
                        reps: [32]
                    }
                ];

                // Simulate API delay
                setTimeout(() => {
                    setSession(mockSession);
                    setExercises(mockExercises);
                    setLoading(false);
                }, 500);

                // In a real app, you would use something like:
                /*
                const response = await fetch(`${defaultUrl}/workout/sessions/${sessionsId}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authenticated}`
                  }
                });
                
                if (!response.ok) {
                  throw new Error('Failed to fetch session details');
                }
                
                const data = await response.json();
                setSession(data.session);
                setExercises(data.exercises);
                */
            } catch (error) {
                console.error('Error fetching session details:', error);
                setLoading(false);
            }
        };

        fetchSessionDetails();
    }, [sessionsId]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
                <Text style={styles.loadingText}>Loading session details...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{
                title: 'Session Details',
            }} />
            <ScrollView style={styles.container}>
                {/* Session Header */}
                <View style={styles.sessionHeader}>
                    <Text style={styles.sessionName}>{session.name}</Text>
                    <Text style={styles.sessionDate}>{formatDate(session.duedate)}</Text>
                    {session.note && <Text style={styles.sessionNote}>Note: {session.note}</Text>}
                </View>

                {/* Session Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="dumbbell" size={24} color={Colors.light.tint} />
                        <Text style={styles.statValue}>{exercises.length}</Text>
                        <Text style={styles.statLabel}>Exercises</Text>
                    </View>

                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="clock-outline" size={24} color={Colors.light.tint} />
                        <Text style={styles.statValue}>
                            {session.starttime && session.endtime
                                ? `${new Date(session.endtime) - new Date(session.starttime)}min`
                                : 'N/A'}
                        </Text>
                        <Text style={styles.statLabel}>Duration</Text>
                    </View>

                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="star" size={24} color={Colors.light.tint} />
                        <Text style={styles.statValue}>{session.rating || 'N/A'}</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                {/* Exercises List */}
                <View style={styles.exercisesContainer}>
                    <Text style={styles.sectionTitle}>Exercises</Text>

                    {exercises.length === 0 ? (
                        <Text style={styles.emptyMessage}>No exercises recorded for this session</Text>
                    ) : (
                        exercises.map((exercise, index) => (
                            <View key={exercise.id} style={styles.exerciseCard}>
                                <Text style={styles.exerciseName}>Exercise #{index + 1}</Text>

                                <View style={styles.setsContainer}>
                                    {exercise.weight.map((weight, setIndex) => (
                                        <View key={setIndex} style={styles.setRow}>
                                            <Text style={styles.setNumber}>Set {setIndex + 1}</Text>
                                            <Text style={styles.setDetail}>
                                                {weight} {exercise.unit[setIndex]} × {exercise.reps[setIndex]} reps
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    {/*  <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Edit Session</Text>
                    </TouchableOpacity>
 */}
                    <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
                        <MaterialCommunityIcons name="delete" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: Colors.light.text,
    },
    sessionHeader: {
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 16,
    },
    sessionName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    sessionDate: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    sessionNote: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginTop: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    exercisesContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 16,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
        padding: 24,
    },
    exerciseCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: Colors.light.tint,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 12,
    },
    setsContainer: {
        marginTop: 8,
    },
    setRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    setNumber: {
        width: 60,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    setDetail: {
        fontSize: 16,
        color: Colors.light.text,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 8,
    },
    primaryButton: {
        backgroundColor: Colors.light.tint,
    },
    dangerButton: {
        backgroundColor: '#ff4d4d',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
