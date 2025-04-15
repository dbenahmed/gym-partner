import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    TextInput,
    Modal
} from 'react-native';
import Color from "@/constants/Colors.ts";
import { defaultUrl } from "@/constants/constants.ts";
import useAuth from "@/app/contex/authcontex";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';



export default function Explore() {
    const [loading, setLoading] = useState(false);
    const { authenticated } = useAuth();

    const [activeTab, setActiveTab] = useState('exercises');
    const [exercises, setExercises] = useState([]);
    const [exercisesLoading, setExercisesLoading] = useState(false);
    const [foods, setFoods] = useState([]);
    const [foodsLoading, setFoodsLoading] = useState(false);
    const [exerciseSearchQuery, setExerciseSearchQuery] = useState('');
    const [foodSearchQuery, setFoodSearchQuery] = useState('');


    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedForce, setSelectedForce] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [selectedPrimaryMuscles, setSelectedPrimaryMuscles] = useState([]);
    const [selectedSecondaryMuscles, setSelectedSecondaryMuscles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const togglePrimaryMuscle = (muscle) => {
        setSelectedPrimaryMuscles((prev) => [...prev, muscle]);
    };

    const toggleSecondaryMuscle = (muscle) => {
        setSelectedSecondaryMuscles((prev) => [...prev, muscle]);
    };

    const resetFilters = () => {
        setSelectedForce(null);
        setSelectedLevel(null);
        setSelectedMechanic(null);
        setSelectedEquipment(null);
        setSelectedPrimaryMuscles([]);
        setSelectedSecondaryMuscles([]);
        setSelectedCategory(null);
    };

    const applyFilters = () => {
        console.log('Applying filters:', {
            force: selectedForce,
            level: selectedLevel,
            mechanic: selectedMechanic,
            equipment: selectedEquipment,
            primaryMuscles: selectedPrimaryMuscles,
            secondaryMuscles: selectedSecondaryMuscles,
            category: selectedCategory
        });

        // TODO: Implement actual filtering logic
        // For example, you might want to filter exercises based on the selected criteria
        // and update the exercises state
        // Here's a simple example:

    }




    // Handle tab change with animation

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchExercises = async (query) => {
        try {
            setExercisesLoading(true);
            // Simulate API call
            setTimeout(() => {
                if (query.trim() === '') {
                    setExercises([]);
                } else {
                    setExercises([
                        { id: 1, title: 'Push-ups', category: 'Strength' },
                        { id: 2, title: 'Squats', category: 'Legs' },
                        { id: 3, title: 'Lunges', category: 'Legs' },
                        { id: 4, title: 'Plank', category: 'Core' }
                    ]);
                }
                setExercisesLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching exercises:', error);
            setExercisesLoading(false);
        }
    };

    const fetchFoods = async (query) => {
        try {
            setFoodsLoading(true);
            // Simulate API call
            setTimeout(() => {
                if (query.trim() === '') {
                    setFoods([]);
                } else {
                    setFoods([
                        { id: 1, name: 'Apple', calories: 95 },
                        { id: 2, name: 'Banana', calories: 105 },
                        { id: 3, name: 'Chicken Breast', calories: 165 },
                        { id: 4, name: 'Salmon', calories: 206 }
                    ]);
                }
                setFoodsLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching foods:', error);
            setFoodsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Explore</Text>

            {/* Tab Navigation */}

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'exercises' && styles.activeTab]}
                    onPress={() => handleTabChange('exercises')}
                >
                    <Text style={[styles.tabText, activeTab === 'exercises' && styles.activeTabText]}>Exercises</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'food' && styles.activeTab]}
                    onPress={() => handleTabChange('food')}
                >
                    <Text style={[styles.tabText, activeTab === 'food' && styles.activeTabText]}>Food</Text>
                </TouchableOpacity>
            </View>

            {/* Content Container with Animation */}
            <View style={styles.contentContainer}>
                {
                    activeTab === 'exercises' && (
                        <View style={styles.tabContentAbove}>
                            {/* Exercises Tab Content */}
                            <View style={styles.tabContent}>
                                <View style={styles.searchContainer}>
                                    <TextInput
                                        style={styles.searchInput}
                                        placeholder="Search exercises..."
                                        onChangeText={(text) => {
                                            setExerciseSearchQuery(text);
                                            fetchExercises(text);
                                        }}
                                        value={exerciseSearchQuery}
                                    />
                                    <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
                                </View>
                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => setFilterModalVisible(true)}
                                >
                                    <MaterialIcons name="filter-list" size={20} color="#fff" />
                                    <Text style={styles.filterButtonText}>Filters</Text>
                                </TouchableOpacity>

                                {/* Filter Modal */}
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={filterModalVisible}
                                    onRequestClose={() => setFilterModalVisible(false)}
                                >
                                    <View style={styles.modalOverlay}>
                                        <View style={styles.modalContent}>
                                            <View style={styles.modalHeader}>
                                                <Text style={styles.modalTitle}>Search Preferences</Text>
                                                <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                                                    <MaterialIcons name="close" size={24} color="#333" />
                                                </TouchableOpacity>
                                            </View>

                                            <ScrollView style={styles.filterScrollView}>
                                                {/* Force Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Force</Text>
                                                    <View style={styles.filterOptions}>
                                                        {[null, "static", "pull", "push"].map((option) => (
                                                            <TouchableOpacity
                                                                key={option || 'none'}
                                                                style={[
                                                                    styles.filterOption,
                                                                    selectedForce === option && styles.filterOptionSelected
                                                                ]}
                                                                onPress={() => setSelectedForce(option)}
                                                            >
                                                                <Text style={[
                                                                    styles.filterOptionText,
                                                                    selectedForce === option && styles.filterOptionTextSelected
                                                                ]}>
                                                                    {option || 'Any'}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                </View>

                                                {/* Level Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Level</Text>
                                                    <View style={styles.filterOptions}>
                                                        {["beginner", "intermediate", "expert"].map((option) => (
                                                            <TouchableOpacity
                                                                key={option}
                                                                style={[
                                                                    styles.filterOption,
                                                                    selectedLevel === option && styles.filterOptionSelected
                                                                ]}
                                                                onPress={() => setSelectedLevel(option)}
                                                            >
                                                                <Text style={[
                                                                    styles.filterOptionText,
                                                                    selectedLevel === option && styles.filterOptionTextSelected
                                                                ]}>
                                                                    {option}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                </View>

                                                {/* Mechanic Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Mechanic</Text>
                                                    <View style={styles.filterOptions}>
                                                        {["isolation", "compound", null].map((option) => (
                                                            <TouchableOpacity
                                                                key={option || 'none'}
                                                                style={[
                                                                    styles.filterOption,
                                                                    selectedMechanic === option && styles.filterOptionSelected
                                                                ]}
                                                                onPress={() => setSelectedMechanic(option)}
                                                            >
                                                                <Text style={[
                                                                    styles.filterOptionText,
                                                                    selectedMechanic === option && styles.filterOptionTextSelected
                                                                ]}>
                                                                    {option || 'Any'}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                </View>

                                                {/* Equipment Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Equipment</Text>
                                                    <View style={styles.filterOptions}>
                                                        <Picker
                                                            selectedValue={selectedEquipment}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue) => setSelectedEquipment(itemValue)}
                                                        >
                                                            <Picker.Item label="Any" value={null} />
                                                            <Picker.Item label="Medicine Ball" value="medicine ball" />
                                                            <Picker.Item label="Dumbbell" value="dumbbell" />
                                                            <Picker.Item label="Body Only" value="body only" />
                                                            <Picker.Item label="Bands" value="bands" />
                                                            <Picker.Item label="Kettlebells" value="kettlebells" />
                                                            <Picker.Item label="Foam Roll" value="foam roll" />
                                                            <Picker.Item label="Cable" value="cable" />
                                                            <Picker.Item label="Machine" value="machine" />
                                                            <Picker.Item label="Barbell" value="barbell" />
                                                            <Picker.Item label="Exercise Ball" value="exercise ball" />
                                                            <Picker.Item label="E-Z Curl Bar" value="e-z curl bar" />
                                                            <Picker.Item label="Other" value="other" />
                                                        </Picker>
                                                    </View>
                                                </View>

                                                {/* Primary Muscles Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Primary Muscles</Text>
                                                    <View style={styles.filterOptionsMulti}>
                                                        {[
                                                            "abdominals", "abductors", "adductors", "biceps", "calves",
                                                            "chest", "forearms", "glutes", "hamstrings", "lats",
                                                            "lower back", "middle back", "neck", "quadriceps",
                                                            "shoulders", "traps", "triceps"
                                                        ].map((muscle) => (
                                                            <TouchableOpacity
                                                                key={muscle}
                                                                style={[
                                                                    styles.filterOption,
                                                                    selectedPrimaryMuscles.includes(muscle) && styles.filterOptionSelected
                                                                ]}
                                                                onPress={() => togglePrimaryMuscle(muscle)}
                                                            >
                                                                <Text style={[
                                                                    styles.filterOptionText,
                                                                    selectedPrimaryMuscles.includes(muscle) && styles.filterOptionTextSelected
                                                                ]}>
                                                                    {muscle}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                </View>

                                                {/* Secondary Muscles Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Secondary Muscles</Text>
                                                    <View style={styles.filterOptionsMulti}>
                                                        {[
                                                            "abdominals", "abductors", "adductors", "biceps", "calves",
                                                            "chest", "forearms", "glutes", "hamstrings", "lats",
                                                            "lower back", "middle back", "neck", "quadriceps",
                                                            "shoulders", "traps", "triceps"
                                                        ].map((muscle) => (
                                                            <TouchableOpacity
                                                                key={muscle}
                                                                style={[
                                                                    styles.filterOption,
                                                                    selectedSecondaryMuscles.includes(muscle) && styles.filterOptionSelected
                                                                ]}
                                                                onPress={() => toggleSecondaryMuscle(muscle)}
                                                            >
                                                                <Text style={[
                                                                    styles.filterOptionText,
                                                                    selectedSecondaryMuscles.includes(muscle) && styles.filterOptionTextSelected
                                                                ]}>
                                                                    {muscle}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                </View>

                                                {/* Category Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Category</Text>
                                                    <View style={styles.filterOptions}>
                                                        {[
                                                            "powerlifting", "strength", "stretching", "cardio",
                                                            "olympic weightlifting", "strongman", "plyometrics"
                                                        ].map((category) => (
                                                            <TouchableOpacity
                                                                key={category}
                                                                style={[
                                                                    styles.filterOption,
                                                                    selectedCategory === category && styles.filterOptionSelected
                                                                ]}
                                                                onPress={() => setSelectedCategory(category)}
                                                            >
                                                                <Text style={[
                                                                    styles.filterOptionText,
                                                                    selectedCategory === category && styles.filterOptionTextSelected
                                                                ]}>
                                                                    {category}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                </View>
                                            </ScrollView>

                                            <View style={styles.modalFooter}>
                                                <TouchableOpacity
                                                    style={styles.resetButton}
                                                    onPress={resetFilters}
                                                >
                                                    <Text style={styles.resetButtonText}>Reset</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.applyButton}
                                                    onPress={() => {
                                                        applyFilters();
                                                        setFilterModalVisible(false);
                                                    }}
                                                >
                                                    <Text style={styles.applyButtonText}>Apply</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                                <ScrollView style={styles.resultsContainer}>
                                    {exercisesLoading ? (
                                        <ActivityIndicator size="small" color={Color.light.tint} />
                                    ) : (
                                        exercises.length > 0 ? (
                                            exercises.map((exercise) => (
                                                <View key={exercise.id} style={styles.resultItem}>
                                                    <Text style={styles.resultTitle}>{exercise.title}</Text>
                                                    <Text style={styles.resultSubtitle}>{exercise.category}</Text>
                                                </View>
                                            ))
                                        ) : (
                                            <Text style={styles.noResultsText}>
                                                {exerciseSearchQuery.trim() === '' ? 'Start typing to search exercises' : 'No exercises found'}
                                            </Text>
                                        )
                                    )}
                                </ScrollView>
                            </View>
                        </View>
                    )
                }
                {
                    activeTab === 'food' && (
                        <View style={styles.tabContentAbove}>
                            {/* Food Tab Content */}
                            <View style={styles.tabContent}>
                                <View style={styles.searchContainer}>
                                    <TextInput
                                        style={styles.searchInput}
                                        placeholder="Search food..."
                                        onChangeText={(text) => {
                                            setFoodSearchQuery(text);
                                            fetchFoods(text);
                                        }}
                                        value={foodSearchQuery}
                                    />
                                    <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
                                </View>

                                <ScrollView style={styles.resultsContainer}>
                                    {foodsLoading ? (
                                        <ActivityIndicator size="small" color={Color.light.tint} />
                                    ) : (
                                        foods.length > 0 ? (
                                            foods.map((food) => (
                                                <View key={food.id} style={styles.resultItem}>
                                                    <Text style={styles.resultTitle}>{food.name}</Text>
                                                    <Text style={styles.resultSubtitle}>{food.calories} kcal</Text>
                                                </View>
                                            ))
                                        ) : (
                                            <Text style={styles.noResultsText}>
                                                {foodSearchQuery.trim() === '' ? 'Start typing to search foods' : 'No foods found'}
                                            </Text>
                                        )
                                    )}
                                </ScrollView>
                            </View>
                        </View>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.light.background,
        padding: 16,
        width: '100%',
        flex: 1
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Color.light.tint,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    activeTab: {
        backgroundColor: Color.light.tint,
    },
    tabText: {
        fontWeight: '600',
        color: Color.light.tint,
    },
    activeTabText: {
        color: '#fff',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
    },
    tabContent: { // Each tab takes half of the contentContainer
        width: '100%',
    },
    tabContentAbove: {
        width: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 13,
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 8,
    },
    resultsContainer: {
        flex: 1,
    },
    resultItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    noResultsText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
        fontSize: 16,

    }
});
