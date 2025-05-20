import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import useAuth from '@/app/contex/authcontex';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { fetchGetPlanExercises, fetchAddExerciseToPlan, fetchSearchExercises } from '@/lib/api'; // Replace with real path
import Colors from '@/constants/Colors';
import { Alert } from 'react-native';


const Exercises = () => {
  const { authenticated } = useAuth();
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);


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

  const { collectionId, planId, title } = useLocalSearchParams(); // 'id' is planId


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

  const handleSelectExercise = (exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
    setSearchResults(searchResults.filter(e => e.id !== exercise.id));
  };

  const handleAddSelectedExercises = async () => {
    const idsList = selectedExercises.map(e => e.id)
    const { success, message, data } = await fetchAddExerciseToPlan(authenticated, { planId, exercisesIds: idsList });
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
      Alert.alert('Exercises added successfully');
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

  const handleDeleteExercise = async (exercise) => {
    setSelectedExercises(selectedExercises.filter(e => e.id !== exercise.id));
    setSearchResults([...searchResults, exercise]);
  };


  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <Stack.Screen options={{ headerShown: true, title: `${title} - Exercises` }} />
          <ScrollView style={{ flex: 1, width: '100%' }}>
            {exercises.map((ex) => (
              <View
                key={ex.plans_exercises.id}
                style={{ padding: 15, marginBottom: 10, backgroundColor: Colors.light.background, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{ex.exercises.name}</Text>
                {
                  ex.exercises.primarymuscles?.length > 0 && (
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Primary Muscles :</Text>
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>{ex.exercises.primarymuscles.join(", ")}</Text>
                    </View>
                  )
                }
                {
                  ex.exercises.secondarymuscles?.length > 0 && (
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Secondary Muscles :</Text>
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>{ex.exercises.secondarymuscles.join(", ")}</Text>
                    </View>
                  )
                }
                {
                  ex.exercises.equipment && (
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Equipment : </Text>
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>{ex.exercises.equipment}</Text>
                    </View>
                  )
                }

              </View>
            ))}
            <TouchableOpacity style={{ backgroundColor: Colors.light.tint, borderRadius: 8, padding: 16, marginHorizontal: 16, marginTop: 16, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, }} onPress={() => setModalVisible(true)}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Add New Exercise</Text>
            </TouchableOpacity>
          </ScrollView>



          {/* Modal */}
          <Modal
            isVisible={modalVisible}
            animationIn="slideInUp"
            animationOut="zoomOut"
            swipeDirection="down"
            onSwipeComplete={() => setModalVisible(false)}
            style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.05)', }}
          >
            <View style={{ height: "75%", justifyContent: 'center', padding: 20, backgroundColor: Colors.light.background, borderRadius: 10 }}>
              <Text style={{ fontSize: 20 }}>Search Exercise</Text>
              <TextInput
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  handleSearchExercise(text);
                }}
                placeholder="Search for exercises"
                style={{
                  height: 40,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              />



              {/* Search Results */}
              {
                count > 0 && (
                  <Text>Found Exercises Count : {count}</Text>
                )
              }

              <ScrollView style={{ flex: 1, marginVertical: 10 }}>
                {searchResults && searchResults.map((exercise) => (
                  <View>
                    <TouchableOpacity
                      key={exercise.id}
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        backgroundColor: selectedExercises.some(e => e.id === exercise.id) ? '#e6f7ff' : 'transparent'
                      }}
                      onPress={() => handleSelectExercise(exercise)}
                    >
                      <Text>{exercise.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Selected Exercises */}
                {
                  selectedExercises.length > 0 && (
                    <View style={{ marginVertical: 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Selected Exercises:</Text>
                      {selectedExercises.map((exercise) => (
                        <TouchableOpacity onPress={() => handleDeleteExercise(exercise)}>
                          <View key={exercise.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                            <Text>{exercise.name}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )
                }


                < TouchableOpacity
                  style={{
                    backgroundColor: Colors.light.tint,
                    borderRadius: 8,
                    padding: 16,
                    marginHorizontal: 16,
                    marginTop: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                  disabled={limit >= count}
                  onPress={() => {
                    handleLimitChanged(limit + 5)
                  }}>
                  <Text>Load More</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.light.tint,
                    borderRadius: 8,
                    padding: 16,
                    marginHorizontal: 16,
                    marginTop: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                  onPress={handleAddSelectedExercises}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Add Selected Exercises</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.light.tint,
                    borderRadius: 8,
                    padding: 16,
                    marginHorizontal: 16,
                    marginTop: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};
``
export default Exercises;
