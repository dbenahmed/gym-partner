import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import useAuth from '@/context/authContext';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { validateName } from '@/utils/validation';
import { fetchGetPlanExercises, fetchAddExerciseToPlan, fetchSearchExercises, fetchDeleteCollection } from '@/lib/api'; // Replace with real path
import useThemeContext from '@/context/themeContext'; // Replace with real path


import { fetchGetUserPlans, fetchCreatePlan } from '@/lib/api';
const { colors } = useThemeContext();

const styles = useMemo(() => StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  planItem: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    letterSpacing: 0.3,
  },
  buttonContainer: {
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
}), [colors]);
const Plans = () => {
  const { authenticated } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [addPlanTitle, setAddPlanTitle] = useState('');
  const { collectionId, title, description } = useLocalSearchParams();
  const router = useRouter(); // For navigation

  const fetchPlans = async () => {
    const { plans, success, message } = await fetchGetUserPlans(authenticated, { collectionId });
    if (success) {
      setPlans(plans);
    } else {
      Alert.alert(message);
    }
  };
  const run = async () => {
    setLoading(true);
    await fetchPlans();
    setLoading(false);
  }


  useFocusEffect(
    useCallback(() => {
      run()
    }, [])
  );
  const handlePlanPress = (plan) => {
    // Navigate to the specific plan's page
    router.push({
      pathname: `./${plan.id}`,
      params: {
        collectionId: plan.collectionId,
        planId: plan.id,
        title: plan.title,
        description: plan.description,
      },
    },
      {
        relativeToDirectory: true
      });
  };

  const handleCreatePlan = async () => {

    if (validateName(addPlanTitle).success === false) {
      Alert.alert(validateName(addPlanTitle).message);
      return;
    }

    if (addPlanTitle.trim()) {
      // Make request to create a new plan
      const { data, success, message } = await fetchCreatePlan(authenticated, { collectionId, title: addPlanTitle });
      if (!success) {
        Alert.alert(message);
      } else {
        setModalVisible(false); // Close the modal after creating the plan
        setLoading(true);
        setAddPlanTitle(''); // Clear input field
        // Refetch plans after creation
        fetchPlans();
        setLoading(false);
      }
    } else {
      Alert.alert('Please enter a plan title');
    }
  };


  const deleteCollection = async (collectionId) => {
    Alert.alert(
      'Delete Collection',
      'Are you sure you want to delete this collection?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            console.log("running")
            // Call your delete collection API here
            const { success, message } = await fetchDeleteCollection(authenticated, collectionId);
            console.log('Delete collection response:', success, message);
            if (success) {
              router.back();
              // Optionally, you can show a success message or refresh the collection list
            } else {
              Alert.alert(message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <View style={{ height: '100%' }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: title === undefined ? 'Plan' : title,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => deleteCollection(collectionId)}
              style={{ padding: 10 }}
            >
              <Text style={{ color: Colors.light.tint }}>Delete</Text>
            </TouchableOpacity>
          ),
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ height: '100%', paddingBottom: 16, paddingHorizontal: 16 }}>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.light.text }}>Description</Text>
            <Text>{description}</Text>
          </View>

          {/* <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: 'bold' }}>Plans:</Text> */}
          <FlatList
            style={styles.listContainer}
            data={plans}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.planItem}
                onPress={() => handlePlanPress(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.planTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
          />

          <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Add New Plan</Text>
          </TouchableOpacity>

          {/* Modal for creating a new plan */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
              <Text style={{ fontSize: 20 }}>Create New Plan</Text>
              <TextInput
                value={addPlanTitle}
                onChangeText={setAddPlanTitle}
                placeholder="Enter plan title"
                style={{
                  height: 40,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              />
              <TouchableOpacity style={{ backgroundColor: Colors.light.tint, borderRadius: 8, padding: 16, marginHorizontal: 16, marginTop: 16, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, }} onPress={handleCreatePlan}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Create Plan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: Colors.light.tint, borderRadius: 8, padding: 16, marginHorizontal: 16, marginTop: 16, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, }} onPress={() => setModalVisible(false)}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default Plans;

