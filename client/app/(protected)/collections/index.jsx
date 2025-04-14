import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Collections = () => {
  const plans = [
    { id: '1', name: 'Plan A' },
    { id: '2', name: 'Plan B' },
    { id: '3', name: 'Plan C' },
  ];
  const router = useRouter();
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: './(Plans)/index' })}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Plans</Text>
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Collections; 