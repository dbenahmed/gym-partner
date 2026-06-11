import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { fetchExploreExercises, fetchExploreFoods } from '../api/exploreApi';
import useAuth from '@/context/authContext';

export function useExploreData() {
  const { authenticated } = useAuth();
  
  const [exercises, setExercises] = useState<any[]>([]);
  const [exercisesLoading, setExercisesLoading] = useState(false);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('');
  
  const [foods, setFoods] = useState<any[]>([]);
  const [foodsLoading, setFoodsLoading] = useState(false);
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  
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

  const fetchExercises = useCallback(async (query: string, currentFilters = filters) => {
    setExercisesLoading(true);
    const queries = {
      name: query,
      force: currentFilters.force,
      level: currentFilters.level,
      mechanic: currentFilters.mechanic,
      equipment: currentFilters.equipment,
      primarymuscle: currentFilters.primaryMuscle,
      secondarymuscle: currentFilters.secondaryMuscle,
      category: currentFilters.category
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
  }, [authenticated, filters]);

  const fetchFoods = useCallback(async (query: string) => {
    setFoodsLoading(true);
    const { success, foods: data, message } = await fetchExploreFoods(authenticated, query);
    if (!success) {
      Alert.alert('Error', message || 'Failed to fetch foods');
      setFoodsLoading(false);
      return;
    }
    setFoods(data);
    setFoodsLoading(false);
  }, [authenticated]);

  const handleExerciseSearch = (text: string) => {
    setExerciseSearchQuery(text);
    if (!text) {
      setExercises([]);
    } else {
      fetchExercises(text);
    }
  };

  const handleFoodSearch = (text: string) => {
    setFoodSearchQuery(text);
    if (!text) {
      setFoods([]);
    } else {
      fetchFoods(text);
    }
  };

  const applyFilters = () => {
    fetchExercises(exerciseSearchQuery, filters);
  };

  return {
    exercises,
    exercisesLoading,
    exerciseSearchQuery,
    handleExerciseSearch,
    foods,
    foodsLoading,
    foodSearchQuery,
    handleFoodSearch,
    filters,
    setFilters,
    resetFilters,
    applyFilters,
  };
}
