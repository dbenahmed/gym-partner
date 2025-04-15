import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import useAuth from '@/app/contex/authcontex';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

import { fetchGetUserPlans, fetchCreatePlan } from '@/lib/api';


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
      alert(message);
    }
  };
  useEffect(() => {
    const run = async () => {
      setLoading(true);
      await fetchPlans();
      setLoading(false);
    }
    run();
  }, [collectionId]); // Refetch plans when collectionId changes

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
    if (addPlanTitle.trim()) {
      // Make request to create a new plan
      const { data, success, message } = await fetchCreatePlan(authenticated, { collectionId, title: addPlanTitle });
      if (!success) {
        alert(message);
      } else {
        setModalVisible(false); // Close the modal after creating the plan
        setLoading(true);
        setAddPlanTitle(''); // Clear input field
        // Refetch plans after creation
        fetchPlans();
        setLoading(false);
      }
    } else {
      alert('Please enter a plan title');
    }
  };

  return (
    <View style={{ padding: 20, height: '100%' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ height: '100%' }}>
          <Stack.Screen
            options={{
              headerShown: true,
              title: title,
            }}
          />
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Description</Text>
            <Text>{description}</Text>
          </View>

          {/* <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: 'bold' }}>Plans:</Text> */}
          <View style={{ marginVertical: 10, flex: 1 }}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                onPress={() => handlePlanPress(plan)}
                style={{
                  padding: 15,
                  marginBottom: 10,
                  backgroundColor: Colors.light.background,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 12,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{plan.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={{
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
          }} onPress={() => setModalVisible(true)}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.light.background }}>Add New Plan</Text>
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
