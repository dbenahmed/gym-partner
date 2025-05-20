import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, Alert, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { defaultUrl } from '@/constants/constants';
import Colors from '@/constants/Colors';
import useAuth from '@/app/contex/authcontex';
import { Stack } from 'expo-router';
import ImageViewing from 'react-native-image-viewing';

export default function ExerciseDetails() {
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewerVisible, setViewerVisible] = useState(false);
    const [viewerIndex, setViewerIndex] = useState(0);
    const { authenticated } = useAuth();

    const { exerciseId } = useLocalSearchParams();

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                const response = await fetch(`${defaultUrl}/explore/exercises/${exerciseId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authenticated}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch exercise details');
                }
                const { data, success, message } = await response.json();
                if (!success) {
                    throw new Error(message);
                }
                setExercise(data);
            } catch (error) {
                console.error('Error fetching exercise details:', error);
                Alert.alert('Error', 'Failed to load exercise details');
            } finally {
                setLoading(false);
            }
        };

        fetchExerciseDetails();
    }, [exerciseId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
            </View>
        );
    }

    if (!exercise) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Exercise not found</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Image Viewer for fullscreen zoomable images */}
            {exercise.images && (
                <ImageViewing
                    images={exercise.images.map(img => ({
                        uri: `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${img}`
                    }))}
                    imageIndex={viewerIndex}
                    visible={viewerVisible}
                    onRequestClose={() => setViewerVisible(false)}
                />
            )}

            <ScrollView style={styles.container}>
                <View style={styles.mainCard}>
                    <Text style={styles.title}>{exercise.name}</Text>
                    <Text style={styles.description}>{exercise.description}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoCard}>
                            <Text style={styles.cardTitle}>Category</Text>
                            <Text style={styles.infoText}>{exercise.category}</Text>
                        </View>

                        <View style={styles.infoCard}>
                            <Text style={styles.cardTitle}>Level</Text>
                            <Text style={styles.infoText}>{exercise.level}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoCard}>
                            <Text style={styles.cardTitle}>Force</Text>
                            <Text style={styles.infoText}>{exercise.force || 'N/A'}</Text>
                        </View>

                        <View style={styles.infoCard}>
                            <Text style={styles.cardTitle}>Mechanic</Text>
                            <Text style={styles.infoText}>{exercise.mechanic || 'N/A'}</Text>
                        </View>
                    </View>

                    <View style={styles.fullWidthCard}>
                        <Text style={styles.cardTitle}>Equipment</Text>
                        <Text style={styles.infoText}>{exercise.equipment || 'None required'}</Text>
                    </View>

                    <View style={styles.fullWidthCard}>
                        <Text style={styles.cardTitle}>Primary Muscles</Text>
                        <View style={styles.muscleList}>
                            {exercise.primarymuscles.map((muscle, index) => (
                                <Text key={`primary-${index}`} style={styles.muscleItem}>• {muscle}</Text>
                            ))}
                        </View>
                    </View>

                    {exercise.secondarymuscles && exercise.secondarymuscles.length > 0 && (
                        <View style={styles.fullWidthCard}>
                            <Text style={styles.cardTitle}>Secondary Muscles</Text>
                            <View style={styles.muscleList}>
                                {exercise.secondarymuscles.map((muscle, index) => (
                                    <Text key={`secondary-${index}`} style={styles.muscleItem}>• {muscle}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    <View style={styles.fullWidthCard}>
                        <Text style={styles.cardTitle}>Instructions</Text>
                        <View style={styles.instructionsList}>
                            {exercise.instructions.map((instruction, index) => (
                                <Text key={`instruction-${index}`} style={styles.instructionItem}>
                                    {index + 1}. {instruction}
                                </Text>
                            ))}
                        </View>
                    </View>


                    <View style={styles.fullWidthCard}>
                        <Text style={styles.cardTitle}>Images</Text>

                        {/* Horizontal images scroll */}
                        {exercise.images && exercise.images.length > 0 && (
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={true}
                                style={styles.horizontalImageScroll}
                                contentContainerStyle={styles.horizontalImageContent}
                            >
                                {exercise.images.map((img, idx) => (
                                    <Pressable
                                        key={idx}
                                        onPress={() => {
                                            setViewerIndex(idx);
                                            setViewerVisible(true);
                                        }}
                                    >
                                        <Image
                                            source={{ uri: `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${img}` }}
                                            style={styles.horizontalImage}
                                        />
                                    </Pressable>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    mainCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    horizontalImageScroll: {
        maxHeight: 500,
        width: 350,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: Colors.light.background,
    },
    horizontalImageContent: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalImage: {
        width: 250,
        maxHeight: "100%",
        aspectRatio: 1,
        resizeMode: 'fill',
        borderRadius: 12,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoCard: {
        width: '48%',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    fullWidthCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        textTransform: 'capitalize',
    },
    muscleList: {
        marginTop: 5,
    },
    muscleItem: {
        fontSize: 16,
        marginBottom: 5,
        textTransform: 'capitalize',
    },
    instructionsList: {
        marginTop: 5,
    },
    instructionItem: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 22,
    },
});
