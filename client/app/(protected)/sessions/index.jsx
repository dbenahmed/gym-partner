


import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@/app/contex/authcontex';
import Colors from '@/constants/Colors';
import { router, useFocusEffect } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { defaultUrl } from '@/constants/constants';



export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authenticated } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date(Date.now()));


    useFocusEffect(
        useCallback(() => {
            // Fetch sessions data
            const fetchSessions = async () => {
                setLoading(true);
                console.log('Fetching sessions for date:', currentDate.toISOString().split('T')[0]);
                try {
                    // Replace with actual API call when available
                    // Example: const response = await fetchGetUserSessions(authenticated);

                    const res = await fetch(`${defaultUrl}/workout/sessions?date=${currentDate.toISOString().split('T')[0]}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authenticated}`
                        }
                    })
                    if (!res.ok) {
                        Alert.alert('Error', 'Failed to load workout sessions');
                        setLoading(false);
                        return;
                    }

                    const { success, userSessions, message } = await res.json();

                    if (!success) {
                        Alert.alert('Error', message);
                        setLoading(false);
                        return;
                    }

                    setSessions(userSessions);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching sessions:', error);
                    Alert.alert('Error', 'Failed to load workout sessions');
                    setLoading(false);
                }
            };

            fetchSessions();
        }, [currentDate])
    );



    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison

    const goToPreviousDay = () => {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setCurrentDate(prevDate);
        console.log('Previous day:', prevDate.toISOString().split('T')[0]);
        // Here you would fetch data for the previous day
    };

    const goToNextDay = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setCurrentDate(nextDate);
        console.log('Next day:', nextDate.toISOString().split('T')[0]);
        // Here you would fetch data for the next day
    };

    // Check if current date is today (to disable next button)
    const isToday = currentDate.getTime() === today.getTime();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '100%', alignItems: 'center', marginBottom: 8 }}>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            width: 40,
                            alignItems: 'center',
                        }}
                        onPress={goToPreviousDay}
                    >
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={24}
                            color={Colors.light.tint}
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.2,
                                shadowRadius: 1,
                                elevation: 2,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.light.text }}>
                            {currentDate.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </Text>
                    </View>

                    {!isToday ? (
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                width: 40,
                                alignItems: 'center',
                            }}
                            onPress={goToNextDay}
                        >
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={24}
                                color={Colors.light.tint}
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 1,
                                    elevation: 2,
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: 40 }} /> // Empty view with same width as buttons
                    )}
                </View>


            </View>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.light.tint} />
            ) : (
                <FlatList
                    style={{ marginBottom: 20, flex: 1, paddingHorizontal: 20 }} // Added marginBottom to avoid overlap with button
                    contentContainerStyle={{ paddingBottom: 80 }} // Added paddingBottom to avoid overlap with button
                    showsVerticalScrollIndicator={true}
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
                                router.push({
                                    pathname: `/sessions/${item.id}`,
                                });
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                                {item.name}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 14, color: '#666' }}>
                                    {item.note}
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
                    router.push({
                        pathname: '/sessions/newSession',
                        params: {
                            date: currentDate.toISOString().split('T')[0]
                        }
                    });
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                    Start New Session
                </Text>
            </TouchableOpacity>
        </View>
    );
}