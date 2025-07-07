import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   FlatList,
   TextInput, /* Modal,  */
   StyleSheet,
   ScrollView,
   Alert,
   Touchable,
   Platform
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SessionExerciseContainer from '@/components/sessionExerciseContainer';
import { defaultUrl } from '@/constants/constants';
import useAuth from '@/context/authContext';
import { ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { validateName, validateString, validateNumber } from '@/utils/validation';
import Button from '@/components/ui/Button';
import ModalSlideUp from '@/components/ui/ModalSlideUp';
import { Stack } from "expo-router";
import Spinner from '@/components/Spinner';
import useThemeContext from '@/context/themeContext';
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sortable from 'react-native-sortables';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';


export default function StartSession() {


   const { colors, theme, deviceTheme } = useThemeContext();


   const styles = useMemo(() => StyleSheet.create({
      container: {
         width: '100%',
         backgroundColor: colors.background,
         padding: 16,
         marginBottom: 16,
      },
      textInput: {
         flex: 1,
         borderWidth: 1,
         borderColor: colors.tint,
         borderRadius: 8,
         padding: 12,
         fontSize: 12,
         color: colors.text,
         backgroundColor: 'transparent',
         marginBottom: 16,
      },
      textInputLabel: {
         fontSize: 14,
         fontWeight: '500',
         marginBottom: 6,
         color: colors.text,
      },
      textArea: {
         borderWidth: 1,
         borderColor: '#e0e0e0',
         borderRadius: 8,
         padding: 12,
         fontSize: 16,
         backgroundColor: '#fff',
         marginBottom: 16,
         textAlignVertical: 'top',
         minHeight: 100,
      },
      header: {
         marginBottom: 20,
      },
      title: {
         fontSize: 24,
         fontWeight: 'bold',
      },
      buttonsScrollStyles: {
         gap: 10,
         flex: 1,
      },
      searchButton: {
         flex: 1,
         backgroundColor: colors.tint,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
         padding: 12,
         borderRadius: 8,
         marginBottom: 20,
      },
      searchButtonText: {
         color: '#fff',
         fontWeight: 'bold',
         marginLeft: 8,
      },
      emptyState: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         padding: 20,
      },
      emptyStateText: {
         textAlign: 'center',
         color: colors.text,
         fontSize: 16,
      },
      flatListStyle: {
         flex: 1,
      },
      saveButton: {
         backgroundColor: colors.tint,
         padding: 16,
         borderRadius: 8,
         alignItems: 'center',
         marginVertical: 16,
      },
      saveButtonText: {
         color: '#fff',
         fontWeight: 'bold',
         fontSize: 16,
      },
      exerciseCard: {
         backgroundColor: '#fff',
         borderRadius: 8,
         padding: 16,
         marginBottom: 12,
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.1,
         shadowRadius: 4,
         elevation: 2,
      },
      exerciseHeader: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginBottom: 4,
      },
      exerciseName: {
         fontSize: 18,
         fontWeight: 'bold',
      },
      exerciseCategory: {
         fontSize: 14,
         color: '#666',
         marginBottom: 12,
      },
      inputRow: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'flex-end',
         height: 60,
      },
      inputContainer: {
         marginHorizontal: 4,
         flex: 1,
         justifyContent: 'flex-end',
      },
      inputLabel: {
         fontSize: 14,
         color: colors.text,
         marginBottom: 4,
      },
      input: {
         backgroundColor: '#f1f3f5',
         borderRadius: 4,
         padding: 6,
         fontSize: 8,
         height: 36,
      },
      setNumber: {
         width: 24,
         textAlign: 'center',
         fontWeight: 'bold',
         fontSize: 14,
         color: '#555',
         alignSelf: 'flex-end',
         marginBottom: 8,
      },
      removeSetButton: {
         padding: 8,
         alignSelf: 'flex-end',
         marginBottom: 4,
      },
      addSetButton: {
         alignItems: 'center',
         justifyContent: 'center',
         width: 36,
         height: 36,
         borderRadius: 18,
         backgroundColor: colors.tint,
         alignSelf: 'center',
         marginTop: 8,
      },
      previousRepsContainer: {
         flexDirection: 'row',
         marginTop: 8,
         marginBottom: 12,
         alignItems: 'center',
         height: 30,
      },
      previousRepsLabel: {
         fontSize: 12,
         color: '#666',
         marginRight: 6,
      },
      previousRepBox: {
         backgroundColor: '#e9ecef',
         paddingVertical: 2,
         paddingHorizontal: 6,
         borderRadius: 4,
         marginRight: 4,
         flexDirection: 'row',
         width: '30%',
         justifyContent: 'space-around',
         alignItems: 'center',
         height: 24,
      },
      previousRepText: {
         fontSize: 12,
         color: '#495057',
         textAlign: 'center',
      },
      setRow: {
         flexDirection: 'row',
         alignItems: 'flex-end',
         marginBottom: 8,
         backgroundColor: '#f9f9f9',
         borderRadius: 6,
         padding: 8,
         height: 76,
      },
      setInputsContainer: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'flex-end',
         height: 60,
      },
      setInputGroup: {
         flex: 1,
         marginHorizontal: 4,
         height: 60,
         justifyContent: 'flex-end',
      },
      setInputLabel: {
         fontSize: 12,
         color: '#666',
         marginBottom: 2,
      },
      setInput: {
         backgroundColor: '#fff',
         borderRadius: 4,
         padding: 6,
         fontSize: 14,
         height: 36,
         borderWidth: 1,
         borderColor: '#e0e0e0',
      },
      modalContainer: {
         margin: 0,
         justifyContent: 'flex-end',
      },
      modalContent: {
         backgroundColor: colors.background,
         borderTopLeftRadius: 20,
         borderTopRightRadius: 20,
         padding: 16,
         height: "80%",
         shadowColor: "#000",
         shadowOffset: { width: 0, height: -3 },
         shadowOpacity: 0.2,
         shadowRadius: 5,
         elevation: 5,
      },
      modalHeader: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         padding: 16,
         borderBottomWidth: 1,
         borderBottomColor: '#eee',
      },
      searchInput: {
         backgroundColor: "transparent",
         padding: 12,
         borderWidth: 1,
         borderColor: colors.tint,
         color: colors.text,
         borderRadius: 8,
         margin: 16,
         fontSize: 16,
      },
      searchResultItem: {
         borderRadius: 8,
         padding: 16,
         borderBottomWidth: 1,
         borderBottomColor: colors.tintLighter,
      },
      searchResultItemSelected: {
         borderLeftWidth: 4,
         borderColor: colors.tint,
      },
      searchResultName: {
         fontSize: 16,
         fontWeight: 'bold',
         color: colors.text,
      },
      searchResultCategory: {
         fontSize: 14,
         color: colors.text,
         marginTop: 4,
      },
      emptySearchText: {
         textAlign: 'center',
         padding: 20,
         color: '#666',
      },
      loadingContainer: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         padding: 20,
      },
      loadingText: {
         marginTop: 10,
         fontSize: 16,
         color: '#666',
      },
      categoryPicker: {
         backgroundColor: '#f1f3f5',
         borderRadius: 8,
         marginVertical: 8,
      },
      pickerContainer: {
         borderWidth: 1,
         borderColor: '#e0e0e0',
         borderRadius: 8,
         overflow: 'hidden',
      },
      previousSetInfo: {
         flexDirection: 'row',
         alignItems: 'center',
         marginTop: 4,
         height: 20,
      },
      previousSetLabel: {
         fontSize: 11,
         color: '#888',
         marginRight: 4,
      },
      previousSetValue: {
         fontSize: 11,
         color: '#555',
         fontWeight: '500',
      },
   }), [colors]);

   const [modalVisible, setModalVisible] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedCategory, setSelectedCategory] = useState(null);

   // SESSION DATA STATES
   const [sessionName, setSessionName] = useState('');
   const [sessionNotes, setSessionNotes] = useState('');
   const startTime = useRef(new Date())
   const [rating, setRating] = useState(1);
   const [duration, setDuration] = useState(null) // Duration as a date;
   const [exercises, setExercises] = useState([]);


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

   const renderItem = useCallback(
      ({ item }) => (
         <SessionExerciseContainer
            key={String(item.id)}
            item={item}
            removeExercise={removeExercise}
            updateExerciseData={updateExerciseData}
         />
      ),
      []
   );


   // GATHER THE DRAFT SESSION DATA FROM ASYNC STORAGE
   useEffect(() => {
      const run = async () => {
         try {
            const draftSessionData = await AsyncStorage.getItem(`session-data-${userId}`);
            if (draftSessionData) {
               const extractedData = JSON.parse(draftSessionData)
               if (extractedData.exercises.length === 0) return
               Alert.alert(
                  'Draft session found',
                  'Would you like to import your previous unsaved session?',
                  [
                     {
                        text: 'Cancel',
                        style: 'cancel',
                     },
                     {
                        text: 'Yes',
                        onPress: () => {
                           // Draft session data exists => fill the items
                           setSessionName(extractedData.sessionName)
                           setSessionNotes(extractedData.sessionNotes)
                           startTime.current = new Date(extractedData.startTime)
                           setRating(extractedData.rating)
                           setExercises(extractedData.exercises)
                           console.log("imported Exercises", extractedData.exercises)
                           console.log("----------------------------")
                           const newDuration = new Date() - new Date(extractedData.startTime)
                           console.log("new duration imported", newDuration)
                           setDuration(newDuration)
                        }
                     }
                  ]
               )

            }
         } catch (error) {
            console.error('Error retrieving draft session data:', error);
         }
      }
      run();
   }, []);


   const didMount = useRef(false);
   // AUTO SAVING FUNCTIONALITY
   useEffect(() => {
      const run = async () => {
         try {
            setAutoSaveLoading(true)
            sessionData.current = {
               sessionName: sessionName,
               sessionNotes: sessionNotes,
               startTime: startTime.current.toISOString(),
               rating: rating,
               exercises: exercises,
            }
            setTimeout(() => setAutoSaveLoading(false), 1000);
            await AsyncStorage.setItem(`session-data-${userId}`, JSON.stringify(sessionData.current));
            console.log('Session data saved.');
         } catch (error) {
            console.error('Error saving session data:', error);
         }
      }
      if (didMount.current) {
         run();
      } else {
         didMount.current = true
      }
   }, [sessionName, sessionNotes, startTime, rating, exercises])


   // TIMER FUNCTIONALITY FEATURE
   useEffect(() => {
      // THE DURATION INTERVAL
      setInterval(() => {
         const newDuration = new Date() - startTime.current;
         setDuration(newDuration);
      }, 1000);
   }, [])

   // The current session data
   const sessionData = useRef(null)
   // For display the auto save session data every interval loading state
   const [autoSaveLoading, setAutoSaveLoading] = useState(false)


   const [importFromCollectionModalVisible, setImportFromCollectionModalVisible] = useState(false);

   const [isLoadingSearchExercises, setIsLoadingSearchExercises] = useState(false);


   const [filteredExercises, setFilteredExercises] = useState([]);


   const { authenticated, userId } = useAuth();

   // Mock exercise data for search results
   const [planExercises, setPlanExercises] = useState([]);
   const [isLoadingPlanExercises, setIsLoadingPlanExercises] = useState(false)

   const [collections, setCollections] = useState([]);
   const [selectedCollection, setSelectedCollection] = useState(null);
   const handleCollectionSelect = async (collection) => {
      if (collection.collectionId === selectedCollection?.collectionId) {
         // If the same collection is selected, reset the state
         setSelectedCollection(null);
         setSelectedPlan(null);
         return;
      }
      setSelectedCollection(collection);
      setIsLoadingPlans(true);
      // fetch the plans for the selected collection
      try {
         const res = await fetch(`${defaultUrl}/workout/plans/${collection.collectionId}`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${authenticated}`
            }
         });
         if (!res.ok) {
            console.error('response not ok');
            throw (new Error('Failed to fetch plans'));
            return;
         }
         const { success, message, data } = await res.json();
         if (!success) {
            throw new Error(message);
         }
         setPlans(data);
         setIsLoadingPlans(false);
      } catch (error) {
         console.error('Error fetching plans:', error);
         setSelectedPlan(null);
         Alert.alert('Error', 'Failed to fetch plans');
         setIsLoadingPlans(false);
      }
   }


   const fetchExercisesPreview = async (planId) => {
      try {
         const res = await fetch(`${defaultUrl}/workout/plans/${planId}/exercises`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${authenticated}`
            }
         });
         if (!res.ok) {
            console.error('Error fetching exercises preview');
            throw new Error('Failed to fetch exercises preview');
         }
         const { success, message, data } = await res.json();
         if (!success) {
            console.error('Error fetching exercises preview:', message);
            throw new Error(message);
         }
         return { success: true, data };
      } catch (error) {
         console.error('Error fetching exercises preview:', error);
         Alert.alert('Error', 'Failed to fetch exercises preview');
         return { success: false, message: error.message };
      }
   }
   const [plans, setPlans] = useState([]);
   const [selectedPlan, setSelectedPlan] = useState(null);

   const handlePlanSelect = async (plan) => {
      if (plan.id === selectedPlan?.id) {
         // If the same plan is selected, reset the state
         // WHICH MEANS UNSELECT THAT PLAN
         console.log('S[PPPPPP', selectedPlan)
         setSelectedPlan(null)
         return;
      }
      console.log('plan selected', plan)
      setSelectedPlan(plan);
      console.log("plano", selectedPlan)

      setIsLoadingPlanExercises(true);

      const response = await fetchExercisesPreview(plan.id);
      console.log('response', response)
      if (response.success) {
         setPlanExercises(response.data);
      } else {
         Alert.alert('Error', response.message);
         setPlanExercises([]);
      }
      console.log('planExercises', planExercises)
      console.log('selectedPlan', selectedPlan)
      setIsLoadingPlanExercises(false);
   }


   const [isLoadingCollections, setIsLoadingCollections] = useState(false);
   const [isLoadingPlans, setIsLoadingPlans] = useState(false);

   const navigation = useNavigation();
   const importCollectionsButtonPressed = async () => {
      setSelectedPlan([]);
      setSelectedCollection([]);
      setPlans([]);
      setPlanExercises([]);
      setSelectedCollection(null);
      setIsLoadingCollections(true);
      setImportFromCollectionModalVisible(true);
      try {
         const res = await fetch(`${defaultUrl}/workout/collections`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${authenticated}`
            }
         });
         if (!res.ok) {
            console.error('Error fetching collections');
            setIsLoadingCollections(false);
            setCollections([]);
            throw new Error('Failed to fetch collections');
         }
         const { success, message, data } = await res.json();
         console.log('data', data)
         if (!success) {
            console.error('Error fetching collections:', message);
            throw new Error(message);
         }
         setCollections(data);
         setIsLoadingCollections(false);
      } catch (error) {
         console.error('Error fetching collections:', error);
         Alert.alert('Error', 'Failed to fetch collections');
         setIsLoadingCollections(false);
      }
   }


   const addManyExercisesToSession = (exercisesArray) => {
      const newExercises = exercisesArray.map(exercise => ({
         id: exercise.exercises.id,
         name: exercise.exercises.name,
         category: exercise.exercises.category,
         sets: []
      }));
      // Check if any of the exercises already exist in the session
      const existingExerciseIds = exercises.map(exercise => exercise.id);
      const filteredExercises = newExercises.filter(exercise => !existingExerciseIds.includes(exercise.id));
      if (filteredExercises.length === 0) {
         Alert.alert(
            "Exercises Already Added",
            "All selected exercises are already in your session.",
            [{ text: "OK" }]
         );
         return;
      }

      setExercises([...exercises, ...filteredExercises]);
   };

   const addExerciseToSession = async (exercise) => {
      try {

         // Check if the exercise already exists in the session
         const exerciseExists = exercises.some(existingExercise => existingExercise.id === exercise.id);

         if (exerciseExists) {
            Alert.alert(
               "Exercise Already Added",
               "This exercise is already in your session.",
               [{ text: "OK" }]
            );
            return;
         }


         const response = await fetch(`${defaultUrl}/exercise/statistics/${exercise.id}`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${authenticated}`
            }
         })
         if (!response.ok) {
            throw new Error('Failed to fetch exercise statistics');
         }
         const { success, message, data } = await response.json();
         if (!success) {
            throw new Error(message);
         }

         console.log('latest data ', data)
         // now data contains all the previous sets of this exercise
         // we need to filter the latest session only
         let filtered;
         if (Array.isArray(data) & data.length > 0) {

            console.log('entered')

            filtered = data.sort((a, b) => new Date(b.creationdate) - new Date(a.creationdate))
            const latest = data[0]
            console.log("latest", latest)
            filtered = filtered.filter(item => {
               const ses = latest.sessionId;
               return item.sessionId === ses
            }).sort((a, b) => (a.order - b.order))
         } else {
            filtered = []
         }

         console.log("filtered", filtered)

         const exerciseDetails = {
            id: exercise.id,
            name: exercise.name,
            category: exercise.category,
            sets: [],
            "statistics": filtered
         }

         console.log('detaile', exerciseDetails)

         console.log("settings exercise")
         setExercises(prev => {
            return [...prev, exerciseDetails]
         });
         setModalVisible(false);
      } catch (error) {
         console.error('Error fetching exercise statistics:', error);
         Alert.alert('Error', error.message);
      }
   };


   const saveSession = async () => {
      const io = async () => {

         setLoading(true);
         // verify session name available
         if (validateName(sessionName).success === false) {
            console.log('session name not valid')
            Alert.alert('Error', validateName(sessionName).message);
            return;
         }
         // verify session Note available
         if (validateString(sessionNotes).success === false) {
            console.log('session notes not valid')
            Alert.alert('Error', validateName(sessionNotes).message);
            return;
         }


         // verify exercises infos are available
         if (exercises.length === 0) {
            console.log('No exercises added');
            Alert.alert('Error', 'Please add at least one exercise to the session');
            return;
         }


         // verify exercises infos are available
         let exercisesSetsMissing = false;

         for (const exercise of exercises) {
            if (!exercise.sets || exercise.sets.length === 0) {
               console.log('No sets added for exercise', exercise.name);
               Alert.alert('Error', `Please add at least one set for the exercise: ${exercise.name}`);
               exercisesSetsMissing = true;
               break;
            }

            for (const set of exercise.sets) {
               if (!set.reps || !set.weight || set.reps <= 0 || set.weight <= 0 || !["kg", "lbs"].includes(set.unit)) {
                  console.log('No reps or weight added for this set');
                  Alert.alert('Error', `Please add reps and weight for the set`);
                  exercisesSetsMissing = true;
                  break;
               }
            }

            if (exercisesSetsMissing) break;
         }


         if (exercisesSetsMissing) {
            return;
         }
         const exercisesArray = exercises.map((exercise, index) => ({
            ...exercise,
            order: index
         }));
         const endTime = new Date();
         console.log('fetching session')
         console.log("def", defaultUrl)
         const res = await fetch(`${defaultUrl}/workout/sessions`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${authenticated}`
            },
            body: JSON.stringify({
               planId: null,
               name: sessionName,
               startTime: startTime.current.toISOString(),
               endTime: endTime.toISOString(),
               note: sessionNotes,
               rating: rating ? rating : null,
               exercisesArray: exercisesArray
            })
         });
         const { success, message, data } = await res.json();
         if (success !== undefined && success !== null) {
            if (!success) {
               console.log('error', message)
               Alert.alert('Error', message);
               return;
            }
            await AsyncStorage.removeItem(`session-data-${userId}`);
            console.log('Session saved successfully');
            console.log("data", data);
         } else {
            if (!res.ok) {
               Alert.alert("error", "server error")
            }
         }
         router.back()
      }
      io().finally(() => {
         setLoading(false);
      });
   }

   const updateExerciseData = (id, field, value) => {
      console.log("exos", exercises)
      console.log(id)
      console.log(value, field)
      setExercises(prev => {
         console.log('previous exercises', prev)
         const updatedExercises = prev.map(exercise =>
            exercise.id === id ? { ...exercise, [field]: value } : exercise
         );
         console.log('UPDATED EXOS', updatedExercises)
         return updatedExercises;
      });
   };

   const removeExercise = (id) => {
      console.log('removing exercise')
      setExercises(prev => {
         console.log('previous exercises', prev)
         const newExercises = prev.filter(exercise => exercise.id !== id);
         console.log('newExercises', newExercises)
         return newExercises;
      });
   };

   const searchExercises = async (query) => {
      setSearchQuery(query);
      if (query.length === 0) {
         setFilteredExercises([]);
         setIsLoadingSearchExercises(false);
         return;
      }
      setIsLoadingSearchExercises(true);
      const res = await fetch(`${defaultUrl}/explore/exercises?name=${query}&sets=true`, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authenticated}`
         }
      });
      if (!res.ok) {
         console.log('Error fetching exercises');
         Alert.alert('Error', 'Failed to fetch exercises');
         return;
      }
      const { success, message, data } = await res.json();
      if (!success) {
         Alert.alert('Error', message);
         return;
      }

      setFilteredExercises(data.exercises);
      setIsLoadingSearchExercises(false);
   };

   const [visibleDatePicker, setVisibleDatePicker] = useState(false);
   const defaultStyles = useDefaultStyles(theme === "device" ? deviceTheme : theme);
   const today = new Date();
   const [selected, setSelected] = useState(today);


   const [loading, setLoading] = useState(false);

   if (loading) {
      return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.tint} />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
         </View>
      );

   }


   return (
      <View style={{ flex: 1 }}>
         <Stack.Screen
            options={{
               headerRight: () => (
                  <Spinner size={"small"} visible={autoSaveLoading} />
               )
            }}
         />
         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>


            <ScrollView contentContainerStyle={styles.container}>
               {/* Session Name Input */}

               <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Session Name</Text>
                  <TextInput
                     style={styles.textInput}
                     placeholder="Enter session name"
                     value={sessionName}
                     onChangeText={setSessionName}
                  />
               </View>

               {/* Session Notes Input */}
               <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Notes (optional)</Text>
                  <TextInput
                     style={[styles.textInput]}
                     placeholder="Add notes about this session"
                     value={sessionNotes}
                     onChangeText={setSessionNotes}
                     multiline={true}
                     numberOfLines={3}
                  />
               </View>

               {/*// display two of this input container in a row each one takes 50% of thw screen
                 */}

               <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Session Date</Text>
                  <Button
                     text={`${selected.toDateString()}`}
                     icon="calendar"
                     type="secondary"
                     onClick={() => setVisibleDatePicker((p) => !p)}
                     styles={{
                        gap: 10
                     }}
                  />
                  {visibleDatePicker && (
                     <DateTimePicker
                        mode="single"
                        date={selected}
                        minDate={today}
                        onChange={({ date }) => setSelected(date)}
                        timePicker={false}
                        styles={{
                           ...defaultStyles,
                           today: {
                              backgroundColor: colors.tintLighter,
                           },
                           selected: {
                              backgroundColor: colors.tint,
                           },
                           selected_label: {
                              color: colors.text,
                           },

                        }}
                     />
                  )}
               </View>
               <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Duration</Text>
                  <Text style={[styles.textInput, styles.inputLabel, {
                     paddingVertical: 10,
                     fontSize: 18,
                     fontWeight: "bold",
                     marginBottom: 10,
                     borderColor: colors.tintLighter,
                     textAlign: "center"
                  }]}>
                     {`${Math.floor(duration / 3600000)
                        .toString()
                        .padStart(2, '0')}:${Math.floor((duration / 60000) % 60)
                           .toString()
                           .padStart(2, '0')}:${Math.floor((duration / 1000) % 60)
                              .toString()
                              .padStart(2, '0')}`}
                  </Text>
               </View>
               <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Rating</Text>
                  <View className="flex-row gap-2 align-center justify-center mb-4">
                     {
                        [1, 2, 3, 4, 5].map((star) => (
                           <TouchableOpacity
                              key={star}
                              hitSlop={10}
                              onPress={() => setRating(star)}
                           >
                              <MaterialCommunityIcons
                                 name={star <= rating ? "star" : "star-outline"}
                                 size={24}
                                 color={star <= rating ? colors.tint : colors.tintLighter}
                              />
                           </TouchableOpacity>
                        ))
                     }
                  </View>
               </View>
               <View style={{
                  height: 40,
                  marginBottom: 16,
               }}>

                  <ScrollView
                     contentContainerStyle={styles.buttonsScrollStyles}
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     styles={{
                        height: "100%"
                     }}
                  >
                     <Button
                        text="Add Exercises"
                        icon="magnify"
                        type="primary"
                        onClick={() => setModalVisible(true)}
                     />
                     <Button
                        text="Import Collection"
                        icon="folder-download"
                        type="primary"
                        onClick={() => importCollectionsButtonPressed()}
                     />

                  </ScrollView>
               </View>

               {exercises.length === 0 ? (
                  <View style={styles.emptyState}>
                     <Text style={styles.emptyStateText}>
                        No exercises added yet. Search and add exercises to your session.
                     </Text>
                  </View>
               ) : (


                  // Draggable list of exercises
                  <GestureHandlerRootView style={{ flex: 1 }}>
                     <Sortable.Grid
                        onDragEnd={handleDragEnd}
                        columns={1} // Single column = full width items
                        columnGap={0}
                        data={exercises}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={renderItem}
                        rowGap={15} // Space between items
                     />
                  </GestureHandlerRootView>
               )}

               {exercises.length > 0 && (
                  <Button
                     text="Save Session"
                     onClick={() => saveSession()}
                     styles={{ marginTop: 20 }}
                     type="primary"
                     disabled={exercises.length === 0}
                  />
               )}


            </ScrollView>
            {/* Exercise Search Modal */}
            <ModalSlideUp
               isVisible={modalVisible}
               onClose={() => setModalVisible(false)}
               props={{
                  title: 'Add Exercises',
               }}
               styles={{
                  backgroundColor: colors.background,
               }}
            >
               <TextInput
                  style={styles.searchInput}
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChangeText={searchExercises}
               />

               {isLoadingSearchExercises ? (
                  <View style={styles.loadingContainer}>
                     <ActivityIndicator size="large" color={colors.tint} />
                     <Text style={styles.loadingText}>Loading exercises...</Text>
                  </View>
               ) : (
                  <FlatList
                     data={filteredExercises}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => (
                        <TouchableOpacity
                           style={styles.searchResultItem}
                           onPress={() => addExerciseToSession(item)}
                        >
                           <Text style={styles.searchResultName}>{item.name}</Text>
                           <Text style={styles.searchResultCategory}>{item.category}</Text>
                        </TouchableOpacity>
                     )}
                     ListEmptyComponent={
                        <Text style={styles.emptySearchText}>No exercises found</Text>
                     }
                  />
               )}

            </ModalSlideUp>


            {/* Modal for Importing from Collection */}
            <ModalSlideUp
               isVisible={importFromCollectionModalVisible}
               onClose={() => setImportFromCollectionModalVisible(false)}
               props={{
                  title: 'Import from Collection',
               }}
            >
               <View style={{ padding: 16 }}>
                  <View>
                     <Text style={styles.inputLabel}>Collections</Text>
                     {isLoadingCollections ? (
                        <ActivityIndicator size="large" color={colors.tint} />
                     ) : (
                        <FlatList
                           data={collections}
                           keyExtractor={(item) => item.collectionId}
                           renderItem={({ item }) => (

                              <TouchableOpacity
                                 style={item.collectionId === selectedCollection?.collectionId ? { ...styles.searchResultItemSelected, ...styles.searchResultItem } : styles.searchResultItem}
                                 onPress={() => handleCollectionSelect(item)}
                              >
                                 <Text style={styles.searchResultName}>{item.title}</Text>
                              </TouchableOpacity>
                           )}
                           ListEmptyComponent={
                              <Text style={styles.emptySearchText}>No collections found</Text>
                           }
                        />
                     )}

                     {selectedCollection && (
                        <View>
                           <Text style={[styles.inputLabel, { marginTop: 20 }]}>Plans</Text>

                           {isLoadingPlans ? (
                              <ActivityIndicator size="large" color={colors.tint} />
                           ) : (
                              <FlatList
                                 data={plans}
                                 keyExtractor={(item) => item.id}
                                 renderItem={({ item }) => (
                                    <TouchableOpacity
                                       style={item.id === selectedPlan?.id ? { ...styles.searchResultItemSelected, ...styles.searchResultItem } : styles.searchResultItem}
                                       onPress={() => handlePlanSelect(item)}
                                    >
                                       <Text style={styles.searchResultName}>{item.title}</Text>

                                    </TouchableOpacity>
                                 )}
                                 ListEmptyComponent={
                                    <Text style={styles.emptySearchText}>No plans found</Text>
                                 }
                              />
                           )}
                        </View>
                     )}

                     {selectedPlan && (
                        <View>
                           <Text style={[styles.inputLabel, { marginTop: 20 }]}>Exercises Preview</Text>
                           {isLoadingPlanExercises ? (
                              <ActivityIndicator size="large" color={colors.tint} />
                           ) : (
                              <FlatList
                                 data={planExercises}
                                 keyExtractor={(item) => item.exercises.id}
                                 renderItem={({ item }) => (
                                    <TouchableOpacity
                                       style={styles.searchResultItem}
                                       onPress={() => {
                                       }}
                                    >
                                       {console.log('item', item)}
                                       <Text style={styles.searchResultName}>{item.exercises.name}</Text>

                                    </TouchableOpacity>
                                 )}
                                 ListEmptyComponent={
                                    <Text style={styles.emptySearchText}>No Exercises found</Text>
                                 }
                              />
                           )}
                        </View>
                     )}
                  </View>
                  {
                     selectedPlan && planExercises.length > 0 && (
                        <TouchableOpacity
                           style={styles.saveButton}
                           onPress={() => {
                              addManyExercisesToSession(planExercises);
                              setSelectedPlan(null);
                              setSelectedCollection(null);
                              setPlans([]);
                              setPlanExercises([]);
                              setImportFromCollectionModalVisible(false);
                           }}
                        >
                           <Text style={styles.saveButtonText}>Add Exercises</Text>
                        </TouchableOpacity>
                     )
                  }

               </View>
            </ModalSlideUp>

         </KeyboardAvoidingView>
      </View>
   );
}