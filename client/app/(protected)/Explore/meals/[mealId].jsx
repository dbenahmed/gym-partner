import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { defaultUrl } from '@/constants/constants';
import Color from "@/constants/Colors.ts";
import useAuth from '@/context/authContext';
import { Stack } from 'expo-router';
import useThemeContext from "@/context/themeContext"; // Replace with real path
import { useMemo } from 'react';




export default function MealDetails() {




    const { colors } = useThemeContext();


    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
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
            backgroundColor: colors.background,
            borderRadius: 10,
            padding: 16,
            margin: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        headerSection: {
            alignItems: 'center',
            marginBottom: 16,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
            textAlign: 'center',
        },
        brand: {
            fontSize: 16,
            color: colors.text,
            marginTop: 4,
        },
        descriptionCard: {
            backgroundColor: colors.tintLighter,
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
        },
        descriptionText: {
            fontSize: 16,
            lineHeight: 22,
            color: colors.text,
        },
        nutritionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        sectionTitle: {
            fontSize: 20,
            color: colors.text,
            fontWeight: 'bold',
        },
        perServing: {
            fontSize: 14,
            color: colors.text,
        },
        nutritionCard: {
            backgroundColor: colors.tintLighter,
            borderRadius: 8,
            padding: 12,
        },
        nutritionRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 8,
        },
        nutritionLabel: {
            fontSize: 16,
            fontWeight: '500',
            color: colors.text,
        },
        nutritionLabelIndented: {
            fontSize: 16,
            marginLeft: 16,
            color: colors.text,
        },
        nutritionValue: {
            fontSize: 16,
            fontWeight: '500',
            color: colors.tint,
        },
        divider: {
            height: 1,
            backgroundColor: '#ddd',
            marginVertical: 8,
        },
        detailedNutritionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 8,
            color: colors.text,
        },
    }), [colors]);

    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authenticated } = useAuth();




    const { mealId } = useLocalSearchParams();

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await fetch(`${defaultUrl}/explore/meals/${mealId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authenticated}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch meal details');
                }
                const { meal, success, message } = await response.json();
                if (!success) {
                    throw new Error(message);
                }
                setMeal(meal);
            } catch (error) {
                console.error('Error fetching meal details:', error);
                Alert.alert('Error', 'Failed to load meal details');
            } finally {
                setLoading(false);
            }
        };

        fetchMealDetails();
    }, [mealId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.tint} />
            </View>
        );
    }

    if (!meal) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Meal not found</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.mainCard}>
                        <View style={styles.headerSection}>
                            <Text style={styles.title}>{meal.foodname}</Text>
                            {meal.brand && <Text style={styles.brand}>by {meal.brand}</Text>}
                        </View>

                        {meal.description && (
                            <View style={styles.descriptionCard}>
                                <Text style={styles.descriptionText}>{meal.description}</Text>
                            </View>
                        )}

                        <View style={styles.nutritionHeader}>
                            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
                            <Text style={styles.perServing}>Per 100g</Text>
                        </View>

                        <View style={styles.nutritionCard}>
                            {meal.calories != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabel}>Calories</Text>
                                    <Text style={styles.nutritionValue}>{meal.calories} kcal</Text>
                                </View>
                            )}

                            {(meal.calories != null || meal.proteinper100g != null ||
                                meal.carbohydratesper100g != null || meal.fatper100g != null) && (
                                    <View style={styles.divider} />
                                )}

                            {meal.proteinper100g != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabel}>Protein</Text>
                                    <Text style={styles.nutritionValue}>{meal.proteinper100g}g</Text>
                                </View>
                            )}

                            {meal.carbohydratesper100g != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabel}>Carbohydrates</Text>
                                    <Text style={styles.nutritionValue}>{meal.carbohydratesper100g}g</Text>
                                </View>
                            )}

                            {meal.fatper100g != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabel}>Fat</Text>
                                    <Text style={styles.nutritionValue}>{meal.fatper100g}g</Text>
                                </View>
                            )}

                            {(meal.saturatedfatper100g != null || meal.transfat != null ||
                                meal.fiber != null || meal.sugar != null ||
                                meal.sodium != null || meal.cholesterol != null) && (
                                    <>
                                        <View style={styles.divider} />
                                        <Text style={styles.detailedNutritionTitle}>Detailed Nutrition</Text>
                                    </>
                                )}

                            {meal.saturatedfatper100g != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabelIndented}>Saturated Fat</Text>
                                    <Text style={styles.nutritionValue}>{meal.saturatedfatper100g}g</Text>
                                </View>
                            )}

                            {meal.transfat != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabelIndented}>Trans Fat</Text>
                                    <Text style={styles.nutritionValue}>{meal.transfat}g</Text>
                                </View>
                            )}

                            {meal.fiber != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabelIndented}>Fiber</Text>
                                    <Text style={styles.nutritionValue}>{meal.fiber}g</Text>
                                </View>
                            )}

                            {meal.sugar != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabelIndented}>Sugar</Text>
                                    <Text style={styles.nutritionValue}>{meal.sugar}g</Text>
                                </View>
                            )}

                            {meal.sodium != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabelIndented}>Sodium</Text>
                                    <Text style={styles.nutritionValue}>{meal.sodium}mg</Text>
                                </View>
                            )}

                            {meal.cholesterol != null && (
                                <View style={styles.nutritionRow}>
                                    <Text style={styles.nutritionLabelIndented}>Cholesterol</Text>
                                    <Text style={styles.nutritionValue}>{meal.cholesterol}mg</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}


