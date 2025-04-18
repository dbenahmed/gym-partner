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
    Modal,
    Alert
} from 'react-native';
import Color from "@/constants/Colors.ts";
import { defaultUrl } from "@/constants/constants.ts";
import useAuth from "@/app/contex/authcontex";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { FlatList } from 'react-native';



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
    const [selectedPrimaryMuscle, setSelectedPrimaryMuscle] = useState(null);
    const [selectedSecondaryMuscle, setSelectedSecondaryMuscle] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const togglePrimaryMuscle = (muscle) => {
        setSelectedPrimaryMuscle(muscle);
    };

    const toggleSecondaryMuscle = (muscle) => {
        setSelectedSecondaryMuscle(muscle);
    };

    const resetFilters = () => {
        setSelectedForce(null);
        setSelectedLevel(null);
        setSelectedMechanic(null);
        setSelectedEquipment(null);
        setSelectedPrimaryMuscle(null);
        setSelectedSecondaryMuscle(null);
        setSelectedCategory(null);
    };

    const applyFilters = () => {
        console.log('Applying filters:', {
            force: selectedForce,
            level: selectedLevel,
            mechanic: selectedMechanic,
            equipment: selectedEquipment,
            primaryMuscle: selectedPrimaryMuscle,
            secondaryMuscle: selectedSecondaryMuscle,
            category: selectedCategory
        });
    }




    // Handle tab change with animation

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchExercises = async (query) => {
        try {
            setExercisesLoading(true);
            const token = authenticated;
            console.log('tokenooooo', token)
            // Simulate API call
            const queries = {
                name: query,
                force: selectedForce,
                level: selectedLevel,
                mechanic: selectedMechanic,
                equipment: selectedEquipment,
                primaryMuscle: selectedPrimaryMuscle,
                secondaryMuscle: selectedSecondaryMuscle,
                category: selectedCategory
            }// filter null queries 
            const filteredQueries = Object.fromEntries(
                Object.entries(queries).filter(([_, value]) => value !== null)
            );
            const searchParams = new URLSearchParams(filteredQueries);
            const response = await fetch(`${defaultUrl}/explore/exercises?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const { success, data, message } = await response.json();
            if (!success) {
                console.log(message)
                setExercisesLoading(false);
                Alert.alert(message);
                return;
            }
            setExercises(data.exercises);
            setExercisesLoading(false);
        } catch (error) {
            console.error('Error fetching exercises:', error);
            setExercisesLoading(false);
        }
    };

    const fetchFoods = async (query) => {
        try {
            setFoodsLoading(true);
            const token = authenticated;

            // Prepare query parameters
            const queries = {
                name: query
            };
            const searchParams = new URLSearchParams(queries);
            console.log(searchParams.toString());
            const response = await fetch(`${defaultUrl}/explore/meals?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const { success, meals, message } = await response.json();
            if (!success) {
                console.log(message);
                setFoodsLoading(false);
                Alert.alert(message);
                return;
            }
            setFoods(meals);
            setFoodsLoading(false);
            console.log(meals);
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
                                            if (text === "" || text === null || text === undefined) {
                                                setExerciseSearchQuery(null);
                                                fetchExercises(null);
                                            } else {
                                                setExerciseSearchQuery(text);
                                                fetchExercises(text);
                                            }
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
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
                                                    <View style={styles.selectContainer}>
                                                        <Picker
                                                            selectedValue={selectedForce}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue) => {
                                                                if (itemValue === "any") {
                                                                    setSelectedForce(null);
                                                                } else {
                                                                    setSelectedForce(itemValue);
                                                                }
                                                            }}
                                                        >
                                                            <Picker.Item label="Any" value="any" />
                                                            <Picker.Item label="Static" value="static" />
                                                            <Picker.Item label="Pull" value="pull" />
                                                            <Picker.Item label="Push" value="push" />
                                                        </Picker>
                                                    </View>
                                                </View>

                                                {/* Level Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Level</Text>
                                                    <View style={styles.selectContainer}>
                                                        <Picker
                                                            selectedValue={selectedLevel}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue) => {
                                                                if (itemValue === "any") {
                                                                    setSelectedLevel(null);
                                                                } else {
                                                                    setSelectedLevel(itemValue);
                                                                }
                                                            }}
                                                        >
                                                            <Picker.Item label="Any" value="any" />
                                                            <Picker.Item label="Beginner" value="beginner" />
                                                            <Picker.Item label="Intermediate" value="intermediate" />
                                                            <Picker.Item label="Expert" value="expert" />
                                                        </Picker>
                                                    </View>
                                                </View>

                                                {/* Mechanic Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Mechanic</Text>
                                                    <View style={styles.selectContainer}>
                                                        <Picker
                                                            selectedValue={selectedMechanic}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue) => {
                                                                if (itemValue === "any") {
                                                                    setSelectedMechanic(null);
                                                                } else {
                                                                    setSelectedMechanic(itemValue);
                                                                }
                                                            }}
                                                        >
                                                            <Picker.Item label="Any" value="any" />
                                                            <Picker.Item label="Isolation" value="isolation" />
                                                            <Picker.Item label="Compound" value="compound" />
                                                        </Picker>
                                                    </View>
                                                </View>

                                                {/* Equipment Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Equipment</Text>
                                                    <View style={styles.selectContainer}>
                                                        <Picker
                                                            selectedValue={selectedEquipment}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue) => {
                                                                if (itemValue === "any") {
                                                                    setSelectedEquipment(null);
                                                                } else {
                                                                    setSelectedEquipment(itemValue);
                                                                }
                                                            }}
                                                        >
                                                            <Picker.Item label="Any" value="any" />
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
                                                    <View style={styles.selectContainer}>
                                                        <Picker
                                                            selectedValue={selectedPrimaryMuscle}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue) => {
                                                                if (itemValue === "any") {
                                                                    setSelectedPrimaryMuscle(null);
                                                                } else {
                                                                    setSelectedPrimaryMuscle(itemValue);
                                                                }
                                                            }}
                                                        >
                                                            <Picker.Item label="Any" value="any" />
                                                            <Picker.Item label="Abdominals" value="abdominals" />
                                                            <Picker.Item label="Abductors" value="abductors" />
                                                            <Picker.Item label="Adductors" value="adductors" />
                                                            <Picker.Item label="Biceps" value="biceps" />
                                                            <Picker.Item label="Calves" value="calves" />
                                                            <Picker.Item label="Chest" value="chest" />
                                                            <Picker.Item label="Forearms" value="forearms" />
                                                            <Picker.Item label="Glutes" value="glutes" />
                                                            <Picker.Item label="Hamstrings" value="hamstrings" />
                                                            <Picker.Item label="Lats" value="lats" />
                                                            <Picker.Item label="Lower Back" value="lower back" />
                                                            <Picker.Item label="Middle Back" value="middle back" />
                                                            <Picker.Item label="Neck" value="neck" />
                                                            <Picker.Item label="Quadriceps" value="quadriceps" />
                                                            <Picker.Item label="Shoulders" value="shoulders" />
                                                            <Picker.Item label="Traps" value="traps" />
                                                            <Picker.Item label="Triceps" value="triceps" />
                                                        </Picker>
                                                    </View>
                                                </View>

                                                {/* Secondary Muscles Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Secondary Muscles</Text>
                                                    <View style={styles.selectContainer}>
                                                        <Picker
                                                            selectedValue={selectedSecondaryMuscle}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue) => {
                                                                if (itemValue === "any") {
                                                                    setSelectedSecondaryMuscle(null);
                                                                } else {
                                                                    setSelectedSecondaryMuscle(itemValue);
                                                                }
                                                            }}
                                                        >
                                                            <Picker.Item label="Any" value="any" />
                                                            <Picker.Item label="Abdominals" value="abdominals" />
                                                            <Picker.Item label="Abductors" value="abductors" />
                                                            <Picker.Item label="Adductors" value="adductors" />
                                                            <Picker.Item label="Biceps" value="biceps" />
                                                            <Picker.Item label="Calves" value="calves" />
                                                            <Picker.Item label="Chest" value="chest" />
                                                            <Picker.Item label="Forearms" value="forearms" />
                                                            <Picker.Item label="Glutes" value="glutes" />
                                                            <Picker.Item label="Hamstrings" value="hamstrings" />
                                                            <Picker.Item label="Lats" value="lats" />
                                                            <Picker.Item label="Lower Back" value="lower back" />
                                                            <Picker.Item label="Middle Back" value="middle back" />
                                                            <Picker.Item label="Neck" value="neck" />
                                                            <Picker.Item label="Quadriceps" value="quadriceps" />
                                                            <Picker.Item label="Shoulders" value="shoulders" />
                                                            <Picker.Item label="Traps" value="traps" />
                                                            <Picker.Item label="Triceps" value="triceps" />
                                                        </Picker>
                                                    </View>
                                                </View>

                                                {/* Category Filter */}
                                                <View style={styles.filterSection}>
                                                    <Text style={styles.filterSectionTitle}>Category</Text>
                                                    <View style={styles.selectContainer}>
                                                        <Picker
                                                            selectedValue={selectedCategory}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue) => {
                                                                if (itemValue === "any") {
                                                                    setSelectedCategory(null);
                                                                } else {
                                                                    setSelectedCategory(itemValue);
                                                                }
                                                            }}
                                                        >
                                                            <Picker.Item label="Any" value="any" />
                                                            <Picker.Item label="Powerlifting" value="powerlifting" />
                                                            <Picker.Item label="Strength" value="strength" />
                                                            <Picker.Item label="Stretching" value="stretching" />
                                                            <Picker.Item label="Cardio" value="cardio" />
                                                            <Picker.Item label="Olympic Weightlifting" value="olympic weightlifting" />
                                                            <Picker.Item label="Strongman" value="strongman" />
                                                            <Picker.Item label="Plyometrics" value="plyometrics" />
                                                        </Picker>
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
                                    ) : exercises.length > 0 ? (
                                        exercises.map((item) => (
                                            <TouchableOpacity
                                                key={item.id}
                                                style={styles.resultItem}
                                                onPress={() => router.push(`/Explore/exercise/${item.id}`)}
                                            >
                                                <Text style={styles.resultTitle}>{item.name}</Text>
                                                <Text style={styles.resultSubtitle}>{item.primarymuscles.map((muscle) => muscle).join(', ')}</Text>
                                            </TouchableOpacity>
                                        ))
                                    ) : (
                                        <Text style={styles.noResultsText}>
                                            {exerciseSearchQuery && exerciseSearchQuery.trim() !== '' ? 'No exercises found' : 'Start typing to search exercises'}
                                        </Text>
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
                                            if (text === "" || text === null || text === undefined) {
                                                setFoodSearchQuery(null);
                                                fetchFoods(null);
                                            } else {
                                                setFoodSearchQuery(text);
                                                fetchFoods(text);
                                            }
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
                                                <TouchableOpacity
                                                    key={food.id}
                                                    style={styles.resultItem}
                                                    onPress={() => router.push(`/Explore/meals/${food.id}`)}
                                                >
                                                    <Text style={styles.resultTitle}>{food.foodname}</Text>
                                                    <Text style={styles.resultSubtitle}>{food.calories} kcal</Text>
                                                </TouchableOpacity>
                                            ))
                                        ) : (
                                            <Text style={styles.noResultsText}>
                                                {foodSearchQuery && foodSearchQuery.trim() !== '' ? 'No foods found' : 'Start typing to search foods'}
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
        flex: 1
    },
    tabContentAbove: {
        width: '100%',
        flex: 1
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

    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    filterScrollView: {
        maxHeight: 350,
    },
    filterSection: {
        marginBottom: 16,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
    },
    picker: {
        width: '100%',
        height: 40,
        color: '#333',
        fontSize: 14,
    },
    resetButton: {
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    applyButton: {
        backgroundColor: Color.light.tint,
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    filterButton: {
        backgroundColor: Color.light.tint,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },

    // Exercise card styles
    exerciseCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    exerciseDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    exerciseDetail: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
        marginBottom: 8,
        fontSize: 12,
    },
    exerciseDescription: {
        color: '#666',
        marginBottom: 10,
    },

    // Food card styles
    foodCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    foodCalories: {
        color: '#666',
        fontSize: 14,
    },

    // Loading indicator styles
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    // Empty state styles
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },

    // Filter chips styles
    filterChipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    filterChip: {
        backgroundColor: Color.light.tint,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterChipText: {
        color: '#fff',
        fontSize: 12,
        marginRight: 5,
    },
    filterChipIcon: {
        color: '#fff',
    }

});