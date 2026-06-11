import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert
} from 'react-native';
import routerLinks from "@/constants/routes.ts";
import useAuth from "@/context/authContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import useThemeContext from '@/context/themeContext';
import { useMemo } from 'react';

import { fetchExploreExercises, fetchExploreFoods } from "@/features/explore/api/exploreApi";
import ExerciseFilterModal from "@/features/explore/components/ExerciseFilterModal";
import ExploreResultItem from "@/features/explore/components/ExploreResultItem";

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
    tabContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.tint,
      marginTop: 40,
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
    tabContentAbove: {
      width: '100%',
      flex: 1
    },
    tabContent: {
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
    noResultsText: {
      textAlign: 'center',
      color: '#666',
      marginTop: 20,
      fontSize: 16,
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
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 5,
    },
  }), [colors]);

  const { authenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('exercises');
  const [exercises, setExercises] = useState([]);
  const [exercisesLoading, setExercisesLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [foodsLoading, setFoodsLoading] = useState(false);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('');
  const [foodSearchQuery, setFoodSearchQuery] = useState('');

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    force: null,
    level: null,
    mechanic: null,
    equipment: null,
    primaryMuscle: null,
    secondaryMuscle: null,
    category: null,
  });

  const resetFilters = () => {
    setFilters({
      force: null,
      level: null,
      mechanic: null,
      equipment: null,
      primaryMuscle: null,
      secondaryMuscle: null,
      category: null,
    });
  };

  const applyFilters = () => {
    fetchExercises(exerciseSearchQuery);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchExercises = async (query) => {
    setExercisesLoading(true);
    const queries = {
      name: query,
      force: filters.force,
      level: filters.level,
      mechanic: filters.mechanic,
      equipment: filters.equipment,
      primarymuscle: filters.primaryMuscle,
      secondarymuscle: filters.secondaryMuscle,
      category: filters.category
    };

    const filteredQueries = Object.fromEntries(
      Object.entries(queries).filter(([_, value]) => value !== null)
    );

    const { success, exercises: data, message } = await fetchExploreExercises(authenticated, filteredQueries);
    if (!success) {
      Alert.alert('Error', message || 'Failed to fetch exercises');
      setExercisesLoading(false);
      return;
    }
    setExercises(data);
    setExercisesLoading(false);
  };

  const fetchFoods = async (query) => {
    setFoodsLoading(true);
    const { success, foods: data, message } = await fetchExploreFoods(authenticated, query);
    if (!success) {
      Alert.alert('Error', message || 'Failed to fetch foods');
      setFoodsLoading(false);
      return;
    }
    setFoods(data);
    setFoodsLoading(false);
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.contentContainer}>
        {activeTab === 'exercises' && (
          <View style={styles.tabContentAbove}>
            <View style={styles.tabContent}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search exercises..."
                  onChangeText={(text) => {
                    if (!text) {
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

              <ExerciseFilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onReset={resetFilters}
                onApply={() => {
                  applyFilters();
                  setFilterModalVisible(false);
                }}
                filters={filters}
                setFilters={setFilters}
              />

              <ScrollView style={styles.resultsContainer}>
                {exercisesLoading ? (
                  <ActivityIndicator size="small" color={colors.tint} />
                ) : exercises?.length > 0 ? (
                  exercises.map((item) => (
                    <ExploreResultItem
                      key={item.id}
                      title={item.name}
                      subtitle={item.primarymuscles?.map((m) => m).join(', ')}
                      onPress={() => router.push(`${routerLinks.PROTECTED_EXERCISE_DETAILS}/${item.id}`)}
                    />
                  ))
                ) : (
                  <Text style={styles.noResultsText}>
                    {exerciseSearchQuery?.trim() !== '' ? 'No exercises found' : 'Start typing to search exercises'}
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        )}
        {activeTab === 'food' && (
          <View style={styles.tabContentAbove}>
            <View style={styles.tabContent}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search food..."
                  onChangeText={(text) => {
                    if (!text) {
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
                ) : foods?.length > 0 ? (
                  foods.map((food) => (
                    <ExploreResultItem
                      key={food.id}
                      title={food.foodname}
                      subtitle={`${food.calories} kcal`}
                      onPress={() => router.push(`${routerLinks.PROTECTED_FOOD_DETAILS}/${food.id}`)}
                    />
                  ))
                ) : (
                  <Text style={styles.noResultsText}>
                    {foodSearchQuery?.trim() !== '' ? 'No foods found' : 'Start typing to search foods'}
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
