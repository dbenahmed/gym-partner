import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, FlatList } from 'react-native';

const Exercises = () => {
  const route = useRoute();
  const { collectionId } = route.params;
  const exercises = [
    { id: '1', name: 'Exercise 1' },
    { id: '2', name: 'Exercise 2' },
    { id: '3', name: 'Exercise 3' },
  ];

  const renderItem = ({ item }) => (
    <Text>{item.name}</Text>
  );

  return (
    <View>
      <Text>Exercises for Collection {collectionId}</Text>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Exercises; 