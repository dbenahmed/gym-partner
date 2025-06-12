import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import useAuth from '@/context/authContext';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { validateName } from '@/utils/validation';
import { fetchGetPlanExercises, fetchAddExerciseToPlan, fetchSearchExercises, fetchDeleteCollection } from '@/lib/api';
import useThemeContext from '@/context/themeContext';
import Button from '@/components/ui/Button';
import ModalSlideUp from '@/components/ui/ModalSlideUp';
import { fetchGetUserPlans, fetchCreatePlan } from '@/lib/api';



const Plans = () => {

  const { theme, colors } = useThemeContext();

  const styles = useMemo(() => StyleSheet.create({
    listContainer: {
      flex: 1,
    },
    planItem: {
      backgroundColor: colors.tintLighter,
      borderRadius: 12,
      padding: 20,
      marginHorizontal: 16,
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.05)",
    },
    planTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 10,
      color: colors.text,
      letterSpacing: 0.3,
    },
    buttonContainer: {
      backgroundColor: colors.tint,
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
  }), [theme]);


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
              <Text style={{ color: colors.tint }}>Delete</Text>
            </TouchableOpacity>
          ),
        }}
      />
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <View style={{ height: '100%', paddingBottom: 16, paddingHorizontal: 16, paddingTop: 16 }}>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>Description</Text>
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

          <Button
            text="Create New Plan"
            onClick={() => {
              setModalVisible(true)
            }}
            styles={{
              marginHorizontal: 16,
              marginTop: 16,
            }}
          />
          {/* Modal for creating a new plan */}
          <ModalSlideUp
            isVisible={modalVisible}
            onClose={() => {
              setModalVisible(false)
            }}
            props={{ title: "Create New Plan" }}
          >
            <View style={{
              flex: 1,
              marginTop: 25,
            }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                Title
              </Text>


              <TextInput
                value={addPlanTitle}
                onChangeText={setAddPlanTitle}
                placeholder="Enter plan title"
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  text="Create Plan"
                  onClick={handleCreatePlan}
                  styles={{
                    height: 50,
                  }}
                />
              </View>
            </View>
          </ModalSlideUp>
        </View>
      )}
    </View>
  );
};

export default Plans;

