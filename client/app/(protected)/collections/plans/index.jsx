import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const Plans = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { planId } = route.params;
  const collections = [
    { id: '1', name: 'Collection A' },
    { id: '2', name: 'Collection B' },
    { id: '3', name: 'Collection C' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Exercises', { collectionId: item.id })}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Collections for Plan {planId}</Text>
      <FlatList
        data={collections}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Plans; 