import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import useAuth from '@/context/authContext';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { fetchGetPlanExercises, fetchAddExerciseToPlan, fetchSearchExercises, fetchDeletePlan } from '@/lib/api'; // Replace with real path
import Colors from '@/constants/Colors';
import { Alert } from 'react-native';
import useThemeContext from '@/context/themeContext'; // Replace with real path
import Button from '@/components/ui/Button'; // Replace with real path
import ModalSlideUp from '@/components/ui/ModalSlideUp';
import Sortable from 'react-native-sortables';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Exercises = () => {

  const defaultLimit = 10; // Default limit for search results
  const { theme, colors } = useThemeContext();

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
    contentContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    scrollContainer: {
      flex: 1,
    },
    exerciseCard: {
      backgroundColor: colors.tintLighter,
      borderRadius: 12,
      padding: 20,
      marginVertical: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    exerciseTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: 0.3,
      marginBottom: 12,
    },
    muscleSection: {
      marginVertical: 6,
    },
    muscleLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    muscleText: {
      fontSize: 15,
      fontWeight: "400",
      color: colors.text,
      lineHeight: 20,
    },
    addButton: {
      backgroundColor: colors.tint,
      borderRadius: 12,
      padding: 20,
      marginVertical: 16,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    addButtonText: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      letterSpacing: 0.3,
    },
    modalContainer: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: '85%',
      minHeight: '75%',
    },
    modalHeader: {
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: 0.3,
    },
    searchInput: {
      height: 50,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      borderRadius: 12,
      marginBottom: 16,
      paddingHorizontal: 16,
      fontSize: 16,
      backgroundColor: '#f8f9fa',
    },
    countText: {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
      fontWeight: '500',
    },
    modalScrollView: {
      flex: 1,
    },
    searchResultItem: {
      padding: 16,
      borderRadius: 8,
      marginVertical: 4,
      backgroundColor: colors.tintLighter,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    searchResultText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    modalButton: {
      backgroundColor: colors.tint,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    disabledButton: {
      backgroundColor: '#ccc',
      opacity: 0.6,
    },
    cancelButton: {
      backgroundColor: '#6c757d',
    },
    modalButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#fff',
      letterSpacing: 0.3,
    },
  }), [colors]);

  const { authenticated } = useAuth();
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(defaultLimit);
  const [count, setCount] = useState(0);


  const handleDragEnd = (params) => {
    const {
      key,           // The key of the dragged item
      fromIndex,     // Original position
      toIndex,       // New position
      indexToKey,    // Array of keys in new order
      keyToIndex,    // Object mapping keys to new indices
      data           // Reordered data array
    } = params;
    const newExercises = [...data]
    setExercises(newExercises)

    

  }

  const renderItem = ({ item }) => {
    console.log(item.exercises.id)
    return (
      <View key={item.exercises.id} style={styles.exerciseCard}>
        <Text style={styles.exerciseTitle}>{item.exercises.name}</Text>

        {item.exercises.primarymuscles?.length > 0 && (
          <View style={styles.muscleSection}>
            <Text style={styles.muscleLabel}>Primary Muscles:</Text>
            <Text style={styles.muscleText}>{item.exercises.primarymuscles.join(", ")}</Text>
          </View>
        )}

        {item.exercises.secondarymuscles?.length > 0 && (
          <View style={styles.muscleSection}>
            <Text style={styles.muscleLabel}>Secondary Muscles:</Text>
            <Text style={styles.muscleText}>{item.exercises.secondarymuscles.join(", ")}</Text>
          </View>
        )}

        {item.exercises.equipment && (
          <View style={styles.muscleSection}>
            <Text style={styles.muscleLabel}>Equipment:</Text>
            <Text style={styles.muscleText}>{item.exercises.equipment}</Text>
          </View>
        )}
      </View>

    )
  }


  const handleSearchExercise = async (query) => {
    if (query.length === 0) {
      setSearchResults([]);
      setCount(0);
      return;
    }
    const { success, data, message } = await fetchSearchExercises(authenticated, { query, limit });
    if (!success) {
      Alert.alert(message);
    } else {
      setSearchResults(data.exercises);
      setCount(data.count);
    }
  };

  const { collectionId, planId, title } = useLocalSearchParams();

  const handleLimitChanged = async (newLimit) => {
    setLimit(newLimit);
    await handleSearchExercise(searchQuery);
  }

  const fetchData = async () => {
    const { success, data, message } = await fetchGetPlanExercises(authenticated, { planId });
    if (!success) {
      Alert.alert(message);
    } else {
      console.log("datas", data)
      setExercises(data);
    }
  };

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    }
    run();
  }, [planId]);

  const handleSearch = async (query) => {
    const { success, data, message } = await fetchSearchExercises(query);
    if (!success) {
      Alert.alert(message);
    } else {
      setSearchResults(data);
    }
  };

  const handleSelectExercise = async (exercise) => {
    // verify if the exercise is already inside the plan exercises ( exercises )
    const isAlreadySelected = exercises.some((ex) => ex.exercises.id === exercise.id);
    if (isAlreadySelected) {
      Alert.alert('Exercise already added to the plan');
      return;
    }
    const { success, message, data } = await fetchAddExerciseToPlan(authenticated, { planId, exercisesIds: [exercise.id] });
    if (!success) {
      if (data?.missingExercises) {
        Alert.alert(message, `Missing exercises: ${data.missingExercises.join(", ")}`);
      } else {
        Alert.alert(message);
      }
    } else {
      console.log("success", data)
      setModalVisible(false);
      setSelectedExercises([]);
      setSearchResults([]);
      setCount(0);
      setSearchQuery('');
      setLoading(true);
      console.log("fetching data")
      await fetchData();
      setLoading(false);
      Alert.alert('Exercise added successfully');
    }
  };

  const handleCreateExercise = async () => {
    const { success, message } = await fetchCreateExercise(authenticated, { name: newExerciseName });
    if (!success) {
      Alert.alert(message);
    } else {
      Alert.alert('Exercise created successfully');
    }
  };


  const deletePlan = async () => {
    Alert.alert(
      'Delete Plan',
      'Are you sure you want to delete this plan?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const { success, message } = await fetchDeletePlan(authenticated, planId);
            if (!success) {
              Alert.alert(message);
            } else {
              router.back();
            }
          },
        },
      ],
      { cancelable: false }
    );
  }


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: title === undefined ? 'Exercises' : `${title} Exercises`,
          headerRight: () => (
            <TouchableOpacity onPress={() => deletePlan()} style={{ padding: 10 }}>
              <Text style={{ color: colors.tint }}>Delete</Text>
            </TouchableOpacity>
          ),
        }}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Sortable.Grid
                onDragEnd={handleDragEnd}
                columns={1} // Single column = full width items
                columnGap={0}
                data={exercises}
                keyExtractor={(item) => String(item.exercises.id)}
                renderItem={renderItem}
                rowGap={15} // Space between items
              />
            </GestureHandlerRootView>


            <Button
              text="Add New Exercise"
              onClick={() => {
                setModalVisible(true);
              }}
            />
          </ScrollView>

          {/* Modal */}
          <ModalSlideUp
            isVisible={modalVisible}

            onClose={() => {
              setModalVisible(false)
            }}
            props={{ title: "Search Exercise" }}

          >
            <View style={{
              flex: 1,
              marginTop: 25,
            }}>


              <TextInput
                value={searchQuery}
                onChangeText={(text) => {
                  setCount(0); // Reset count when searching
                  setLimit(defaultLimit); // Reset limit when searching
                  setSearchQuery(text);
                  handleSearchExercise(text);
                }}
                placeholder="Search for exercises"
                style={{
                  borderWidth: 1,
                  borderColor: colors.tint,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  fontSize: 16,
                  color: colors.text,
                }}
              />

              {count > 0 && (
                <Text style={styles.countText}>Found Exercises Count: {count}</Text>
              )}

              <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
                {searchResults && searchResults.map((exercise) => (
                  <TouchableOpacity
                    key={exercise.id}
                    style={styles.searchResultItem}
                    onPress={() => handleSelectExercise(exercise)}
                  >
                    <Text style={styles.searchResultText}>{exercise.name}</Text>
                  </TouchableOpacity>
                ))}

                {searchResults.length === 0 && (
                  <Text style={styles.noResultsText}>No results found</Text>
                )}
                {searchResults.length > 0 && limit < count && (
                  <Button
                    text="Load More"
                    onClick={() => handleLimitChanged(limit + 10)}
                    styles={{
                      ...styles.modalButton,
                      ...styles.cancelButton,
                      marginBottom: 20,
                    }}
                    disabled={limit >= count}
                  />
                )}
              </ScrollView>
            </View>
          </ModalSlideUp>
        </View>
      )}
    </View>
  );
};


export default Exercises;