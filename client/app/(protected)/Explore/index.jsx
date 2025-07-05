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
import routerLinks from "@/constants/routes.ts";
import Color from "@/constants/Colors.ts";
import { defaultUrl } from "@/constants/constants.ts";
import useAuth from "@/context/authContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import useThemeContext from '@/context/themeContext';
import { useMemo } from 'react';
import Button from "@/components/ui/Button";
import ModalSlideUp from "@/components/ui/ModalSlideUp";


export default function Explore() {

	const { colors } = useThemeContext();

	const styles = useMemo(() => StyleSheet.create({
		container: {
			backgroundColor: colors.background,
			paddingTop: 0,
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
			borderRadius: 10,
			borderColor: colors.tint,
		},
		tab: {
			flex: 1,
			borderRadius: 9,
			paddingVertical: 12,
			alignItems: 'center',
			backgroundColor: 'transparent',
		},
		activeTab: {
			backgroundColor: colors.tint,
		},
		tabText: {
			fontWeight: '600',
			color: colors.tint,
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
			backgroundColor: colors.tintLighter,
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
			color: colors.text,
		},
		resultSubtitle: {
			fontSize: 14,
			color: colors.text,
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
			backgroundColor: colors.background,
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
			color: colors.tint,
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
			color: colors.text,
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
		modalFooter: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginTop: 0,
			paddingTop: 10,
			borderTopWidth: 1,
			borderTopColor: colors.tintLighter,
		},
		filterButton: {
			backgroundColor: colors.tint,
			padding: 10,
			borderRadius: 5,
			marginBottom: 10,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},
		filterButtonText: {
			color: colors.tint,
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
			backgroundColor: colors.tint,
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
		},
		selectContainer: {
			width: '100%',
		},
		buttonGroup: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			gap: 8,
		},
		button: {
			paddingVertical: 8,
			paddingHorizontal: 12,
			borderRadius: 8,
			borderWidth: 1,
			marginRight: 8,
			marginBottom: 8,
		},
		buttonSelected: {
			backgroundColor: colors.tint, // Blue background for selected

		},
		buttonUnselected: {
			backgroundColor: colors.tintLighter,
		},
		buttonText: {
			fontSize: 14,
		},
		buttonTextSelected: {
			color: colors.text, // White text for selected
			fontWeight: 'bold',
		},
		buttonTextUnselected: {
			color: colors.text,
		},

	}), [colors]);



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

		fetchExercises(exerciseSearchQuery);
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
				primarymuscle: selectedPrimaryMuscle,
				secondarymuscle: selectedSecondaryMuscle,
				category: selectedCategory
			}// filter null queries 
			const filteredQueries = Object.fromEntries(
				Object.entries(queries).filter(([_, value]) => value !== null)
			);


			console.log('Filtered queries:', filteredQueries);

			const searchParams = new URLSearchParams(filteredQueries);

			console.log(`${defaultUrl}/explore/exercises?${searchParams.toString()}`)
			const response = await fetch(`${defaultUrl}/explore/exercises?${searchParams.toString()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});
			const { success, data, message, error } = await response.json();
			if (!success) {
				console.log(message)
				setExercisesLoading(false);
				Alert.alert(error);
				return;
			}
			setExercises(data.exercises);
			setExercisesLoading(false);
		} catch (error) {
			console.error('Error fetching exercises:', error);
			setExercises([]);
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


	// Reusable ButtonGroup component for rendering filter options
	const ButtonGroup = ({ options, selectedValue, onSelect }) => {
		return (
			<View style={styles.buttonGroup}>
				{options.map((option) => (
					<TouchableOpacity
						key={option.value}
						style={[
							styles.button,
							selectedValue === option.value || (selectedValue === null && option.value === 'any')
								? styles.buttonSelected
								: styles.buttonUnselected,
						]}
						onPress={() => onSelect(option.value === 'any' ? null : option.value)}
					>
						<Text
							style={[
								styles.buttonText,
								selectedValue === option.value || (selectedValue === null && option.value === 'any')
									? styles.buttonTextSelected
									: styles.buttonTextUnselected,
							]}
						>
							{option.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>

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
												setExercises([]);
												setExerciseSearchQuery(null);
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
													<MaterialIcons name="close" size={24} color={colors.red} />
												</TouchableOpacity>
											</View>

											<ScrollView
												style={styles.filterScrollView}
												keyboardShouldPersistTaps="handled"
												showsVerticalScrollIndicator={true}
											>
												{/* Force Filter */}
												<View style={styles.filterSection}>
													<Text style={styles.filterSectionTitle}>Force</Text>
													<View style={styles.selectContainer}>
														<ButtonGroup
															options={[
																{ label: 'Any', value: 'any' },
																{ label: 'Static', value: 'static' },
																{ label: 'Pull', value: 'pull' },
																{ label: 'Push', value: 'push' },
															]}
															selectedValue={selectedForce}
															onSelect={setSelectedForce}
														/>
													</View>
												</View>

												{/* Level Filter */}
												<View style={styles.filterSection}>
													<Text style={styles.filterSectionTitle}>Level</Text>
													<View style={styles.selectContainer}>
														<ButtonGroup
															options={[
																{ label: 'Any', value: 'any' },
																{ label: 'Beginner', value: 'beginner' },
																{ label: 'Intermediate', value: 'intermediate' },
																{ label: 'Expert', value: 'expert' },
															]}
															selectedValue={selectedLevel}
															onSelect={setSelectedLevel}
														/>
													</View>
												</View>

												{/* Mechanic Filter */}
												<View style={styles.filterSection}>
													<Text style={styles.filterSectionTitle}>Mechanic</Text>
													<View style={styles.selectContainer}>
														<ButtonGroup
															options={[
																{ label: 'Any', value: 'any' },
																{ label: 'Isolation', value: 'isolation' },
																{ label: 'Compound', value: 'compound' },
															]}
															selectedValue={selectedMechanic}
															onSelect={setSelectedMechanic}
														/>
													</View>
												</View>

												{/* Equipment Filter */}
												<View style={styles.filterSection}>
													<Text style={styles.filterSectionTitle}>Equipment</Text>
													<View style={styles.selectContainer}>
														<ButtonGroup
															options={[
																{ label: 'Any', value: 'any' },
																{ label: 'Medicine Ball', value: 'medicine ball' },
																{ label: 'Dumbbell', value: 'dumbbell' },
																{ label: 'Body Only', value: 'body only' },
																{ label: 'Bands', value: 'bands' },
																{ label: 'Kettlebells', value: 'kettlebells' },
																{ label: 'Foam Roll', value: 'foam roll' },
																{ label: 'Cable', value: 'cable' },
																{ label: 'Machine', value: 'machine' },
																{ label: 'Barbell', value: 'barbell' },
																{ label: 'Exercise Ball', value: 'exercise ball' },
																{ label: 'E-Z Curl Bar', value: 'e-z curl bar' },
																{ label: 'Other', value: 'other' },
															]}
															selectedValue={selectedEquipment}
															onSelect={setSelectedEquipment}
														/>
													</View>
												</View>

												{/* Primary Muscles Filter */}
												<View style={styles.filterSection}>
													<Text style={styles.filterSectionTitle}>Primary Muscles</Text>
													<View style={styles.selectContainer}>
														<ButtonGroup
															options={[
																{ label: 'Any', value: 'any' },
																{ label: 'Abdominals', value: 'abdominals' },
																{ label: 'Abductors', value: 'abductors' },
																{ label: 'Adductors', value: 'adductors' },
																{ label: 'Biceps', value: 'biceps' },
																{ label: 'Calves', value: 'calves' },
																{ label: 'Chest', value: 'chest' },
																{ label: 'Forearms', value: 'forearms' },
																{ label: 'Glutes', value: 'glutes' },
																{ label: 'Hamstrings', value: 'hamstrings' },
																{ label: 'Lats', value: 'lats' },
																{ label: 'Lower Back', value: 'lower back' },
																{ label: 'Middle Back', value: 'middle back' },
																{ label: 'Neck', value: 'neck' },
																{ label: 'Quadriceps', value: 'quadriceps' },
																{ label: 'Shoulders', value: 'shoulders' },
																{ label: 'Traps', value: 'traps' },
																{ label: 'Triceps', value: 'triceps' },
															]}
															selectedValue={selectedPrimaryMuscle}
															onSelect={setSelectedPrimaryMuscle}
														/>
													</View>
												</View>

												{/* Secondary Muscles Filter */}
												<View style={styles.filterSection}>
													<Text style={styles.filterSectionTitle}>Secondary Muscles</Text>
													<View style={styles.selectContainer}>
														<ButtonGroup
															options={[
																{ label: 'Any', value: 'any' },
																{ label: 'Abdominals', value: 'abdominals' },
																{ label: 'Abductors', value: 'abductors' },
																{ label: 'Adductors', value: 'adductors' },
																{ label: 'Biceps', value: 'biceps' },
																{ label: 'Calves', value: 'calves' },
																{ label: 'Chest', value: 'chest' },
																{ label: 'Forearms', value: 'forearms' },
																{ label: 'Glutes', value: 'glutes' },
																{ label: 'Hamstrings', value: 'hamstrings' },
																{ label: 'Lats', value: 'lats' },
																{ label: 'Lower Back', value: 'lower back' },
																{ label: 'Middle Back', value: 'middle back' },
																{ label: 'Neck', value: 'neck' },
																{ label: 'Quadriceps', value: 'quadriceps' },
																{ label: 'Shoulders', value: 'shoulders' },
																{ label: 'Traps', value: 'traps' },
																{ label: 'Triceps', value: 'triceps' },
															]}
															selectedValue={selectedSecondaryMuscle}
															onSelect={setSelectedSecondaryMuscle}
														/>
													</View>
												</View>

												{/* Category Filter */}
												<View style={styles.filterSection}>
													<Text style={styles.filterSectionTitle}>Category</Text>
													<View style={styles.selectContainer}>
														<ButtonGroup
															options={[
																{ label: 'Any', value: 'any' },
																{ label: 'Powerlifting', value: 'powerlifting' },
																{ label: 'Strength', value: 'strength' },
																{ label: 'Stretching', value: 'stretching' },
																{ label: 'Cardio', value: 'cardio' },
																{ label: 'Olympic Weightlifting', value: 'olympic weightlifting' },
																{ label: 'Strongman', value: 'strongman' },
																{ label: 'Plyometrics', value: 'plyometrics' },
															]}
															selectedValue={selectedCategory}
															onSelect={setSelectedCategory}
														/>
													</View>
												</View>
											</ScrollView>

											<View style={styles.modalFooter}>

												<Button
													text="Reset"
													type="secondary"
													onClick={() => resetFilters()}
												/>
												<Button
													text="Apply"
													type="primary"
													onClick={() => {
														applyFilters();
														setFilterModalVisible(false);
													}}
												/>

											</View>
										</View>
									</View>
								</Modal>
								<ScrollView style={styles.resultsContainer}>
									{exercisesLoading ? (
										<ActivityIndicator size="small" color={colors.tint} />
									) : exercises.length > 0 ? (
										exercises.map((item) => (
											<TouchableOpacity
												key={item.id}
												style={styles.resultItem}
												onPress={() => router.push(`${routerLinks.PROTECTED_EXERCISE_DETAILS}/${item.id}`)}
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
												setFoods([]);
												setFoodSearchQuery(null);
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
										<ActivityIndicator size="small" color={colors.tint} />
									) : (
										foods.length > 0 ? (
											foods.map((food) => (
												<TouchableOpacity
													key={food.id}
													style={styles.resultItem}
													onPress={() => router.push(`${routerLinks.PROTECTED_FOOD_DETAILS}/${food.id}`)}
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
