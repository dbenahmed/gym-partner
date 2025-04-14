import React from 'react';
import { View, Text } from 'react-native';
import useAuth from '@/app/contex/authcontex';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';


const Plans = () => {



  const { authenticated } = useAuth();

  const {
    collectionId,
    title,
    description,
  } = useLocalSearchParams();

  return (

    <View>

      <Stack.Screen
        options={{
          headerShown: true,
          title: title,
        }}
      />
      <Text>the collection page</Text>
      <Text>{collectionId}</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default Plans; 