


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@/app/contex/authcontex';
import Colors from '@/constants/Colors';

export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authenticated } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        // Fetch sessions data
        const fetchSessions = async () => {
            try {
                // Replace with actual API call when available
                // Example: const response = await fetchGetUserSessions(authenticated);
                
                // Placeholder data
                const mockSessions = [
                    { id: 1, title: 'Morning Workout', date: '2023-06-15', duration: '45 min' },
                    { id: 2, title: 'Evening Run', date: '2023-06-14', duration: '30 min' },
                    { id: 3, title: 'Strength Training', date: '2023-06-12', duration: '60 min' },
                ];

                setTimeout(() => {
                    setSessions(mockSessions);
                    setLoading(false);
                }, 1000);

            } catch (error) {
                console.error('Error fetching sessions:', error);
                Alert.alert('Error', 'Failed to load workout sessions');
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                    Your Workout Sessions
                </Text>

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.light.tint} />
                ) : (
                    <FlatList
                        data={sessions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: Colors.light.background,
                                    borderRadius: 8,
                                    padding: 16,
                                    marginBottom: 12,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 2,
                                    borderLeftWidth: 4,
                                    borderLeftColor: Colors.light.tint,
                                }}
                                onPress={() => {
                                    // Navigate to session details
                                    console.log('Navigate to session', item.id);
                                    // router.push(`/sessions/${item.id}`);
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                                    {item.title}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 14, color: '#666' }}>
                                        {item.date}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: '#666' }}>
                                        {item.duration}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            <View style={{ alignItems: 'center', marginTop: 40 }}>
                                <Text style={{ fontSize: 16, color: '#666' }}>
                                    No workout sessions found
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: Colors.light.tint,
                    borderRadius: 8,
                    padding: 16,
                    margin: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                }}
                onPress={() => {
                    console.log('Create new session');
                    // Navigate to create session screen
                    // router.push('/sessions/create');
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                    Start New Session
                </Text>
            </TouchableOpacity>
        </View>
    );
}