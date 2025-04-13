import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import Color from "@/constants/Colors.ts";


export default function Meal({ data, onDlate }) {

  let i
  return (
    <View style={style.parent}>
      <Text style={{ color: Color.light.background, fontSize: 20, fontWeight: 'bold' }}>MEAL</Text>
      <View style={{ gap: 0 }}>
        <Text>{data.id}</Text>
        <Text>{data.food.foodname}</Text>
        <Text>{data.food.description}</Text>
        <Text>CAL : {data.food.calories}</Text>
        <Text>PROTEIN : {data.food.proteinper100g}</Text>
        <Text>FAT : {data.food.carbohydratesper100g}</Text>
        <Text>CARB : {data.food.carbohydratesper100g}</Text>
      </View>
      <Pressable onPress={() => {
        console.log('data', data)
        onDlate(data.id)
      }} style={{ position: 'absolute', top: 5, right: 10 }}>
        <Text style={{ color: 'red', fontWeight: '900', fontSize: 15 }}>X</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  parent: {
    backgroundColor: Color.light.tint,
    margin: (50, 30),
    padding: 15,
    borderRadius: 10,
    position: 'relative'
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});