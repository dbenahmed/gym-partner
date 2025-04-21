import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import Color from "@/constants/Colors.ts";
import { router } from "expo-router";


export default function Meal({ data, onDlate }) {
  console.log(data)
  let i
  return (
    <View style={style.parent}>
      <Text style={{ color: Color.light.text, fontSize: 20, fontWeight: 'bold' }}>{data.food.foodname}</Text>
      <Text style={{ color: Color.light.text, fontSize: 13, fontWeight: "700", paddingBottom: 10 }}>{data.food.description}</Text>
      <View style={{ gap: 0, color: Color.light.text }}>
        <View style={style.nutritionContainer}>
          <View style={style.nutritionCard}>
            <Text style={style.nutritionLabel}>Calories</Text>
            <Text style={style.nutritionValue}>{Math.round(data.food.calories * (data.servingsizeG / 100))} Cal</Text>
          </View>
          <View style={style.nutritionCard}>
            <Text style={style.nutritionLabel}>Protein</Text>
            <Text style={style.nutritionValue}>{Math.round(data.food.proteinper100g * (data.servingsizeG / 100))}g</Text>
          </View>
          <View style={style.nutritionCard}>
            <Text style={style.nutritionLabel}>Fat</Text>
            <Text style={style.nutritionValue}>{Math.round(data.food.fatper100g * (data.servingsizeG / 100))}g</Text>
          </View>
          <View style={style.nutritionCard}>
            <Text style={style.nutritionLabel}>Carbs</Text>
            <Text style={style.nutritionValue}>{Math.round(data.food.carbohydratesper100g * (data.servingsizeG / 100))}g</Text>
          </View>
        </View>
        <TouchableOpacity
          style={style.detailButton}
          onPress={() => {
            router.push(`/Explore/meals/${data.food.id}`);
          }}
        >
          <Text style={style.detailButtonText}>Show Detailed Food Info</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={() => {
        console.log('data', data)
        onDlate(data.id)
      }} style={{ position: 'absolute', top: 5, right: 10 }}>
        <Text style={{ color: 'red', fontWeight: '900', fontSize: 15 }}>X</Text>
      </Pressable>
    </View >
  );
}

const style = StyleSheet.create({
  parent: {
    backgroundColor: Color.light.background,
    marginVertical: 10,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  nutritionCard: {
    backgroundColor: Color.light.tint,
    borderRadius: 8,
    padding: 8,
    minWidth: 70,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  nutritionLabel: {
    color: Color.light.background,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  nutritionValue: {
    color: Color.light.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: Color.light.background,
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  detailButtonText: {
    color: Color.light.tint,
    fontSize: 14,
    fontWeight: 'bold',
  }
});