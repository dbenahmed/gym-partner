import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal, TextInput, ActivityIndicator, MaterialIcons } from "react-native";
import React from "react";
import Color from "@/constants/Colors.ts";
import { router } from "expo-router";
import { useState } from "react";


export default function Meal({ data, onDlate, onUpdate }) {
  console.log(data)

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updatedServingSize, setUpdatedServingSize] = useState(data.servingsizeG.toString());
  const [updateLoading, setUpdateLoading] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const handleUpdateMeal = () => {

    if (isNaN(parseInt(updatedServingSize)) || updatedServingSize <= 0) {
      alert("Please enter a valid serving size.");
      return;
    }
    if (parseInt(updatedServingSize) === data.servingsizeG) {
      alert("No changes made to the serving size.");
      setUpdateModalVisible(false);
      return;
    }
    if (parseInt(updatedServingSize) > 1000) {
      alert("Serving size cannot exceed 1000g.");
      return;
    }
    if (parseInt(updatedServingSize) < 1) {
      alert("Serving size cannot be less than 1g.");
      return;
    }

    setUpdateLoading(true);
    onUpdate(data.id, {
      servingsizeG: parseFloat(updatedServingSize),
    }).finally(() => {
      setUpdateLoading(false);
      setUpdateModalVisible(false);
    });
  };


  if (deleting) {
    return (
      <View style={style.parent}>
        <ActivityIndicator size="small" color={Color.light.tint} />
      </View>
    );
  }


  return (
    <View style={style.parent}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={style.modalBackground}>
          <View style={style.modeleContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontWeight: "800", fontSize: 19, color: Color.light.text }}>
                {data.food.foodname}
              </Text>
              <TouchableOpacity onPress={() => setUpdateModalVisible(false)}>
                <Text style={{ fontSize: 24, color: Color.light.tint }}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Color.light.tintLighter,
              padding: 10,
              borderRadius: 8,
              marginBottom: 16
            }}>
              <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400' }}>
                {data.food.description || 'No description available'}
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              justifyContent: 'space-between'
            }}>
              <Text style={{ fontWeight: '600', color: '#000000', fontSize: 13 }}>
                Serving Size (g):
              </Text>
              <TextInput
                style={{
                  borderWidth: 0.7,
                  borderColor: Color.light.tint,
                  borderRadius: 8,
                  padding: 10,
                  color: Color.light.text,
                  backgroundColor: 'transparent',
                  placeholderTextColor: 'rgba(0, 0, 0, 0.5)',
                  width: '50%',
                  marginLeft: 10
                }}
                placeholder="Enter serving size"
                keyboardType="numeric"
                value={updatedServingSize}
                onChangeText={(value) => setUpdatedServingSize(value)}
              />
            </View>

            <Text style={{ fontWeight: "700", fontSize: 16, color: '#000000', marginBottom: 12 }}>
              Nutrition Facts (per 100g)
            </Text>

            <View style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 14,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}>
              <View style={{ marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontWeight: '700', color: '#000000', fontSize: 13, width: '33%' }}>Nutrient</Text>
                  <Text style={{ fontWeight: '700', color: '#666666', fontSize: 13, width: '33%', textAlign: 'center' }}>Per 100g</Text>
                  <Text style={{ fontWeight: '700', color: Color.light.tint, fontSize: 13, width: '33%', textAlign: 'right' }}>Total</Text>
                </View>

                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 4 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                  <Text style={{ fontWeight: '500', color: '#000000', fontSize: 12, width: '33%' }}>Calories</Text>
                  <Text style={{ fontWeight: '600', color: '#666666', fontSize: 12, width: '33%', textAlign: 'center' }}>
                    {data.food.calories} kcal
                  </Text>
                  <Text style={{ fontWeight: '700', color: Color.light.tint, fontSize: 12, width: '33%', textAlign: 'right' }}>
                    {updatedServingSize ? Math.round((data.food.calories * updatedServingSize) / 100) : 0} kcal
                  </Text>
                </View>

                <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: 3 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                  <Text style={{ fontWeight: '500', color: '#000000', fontSize: 12, width: '33%' }}>Protein</Text>
                  <Text style={{ fontWeight: '600', color: '#666666', fontSize: 12, width: '33%', textAlign: 'center' }}>
                    {data.food.proteinper100g}g
                  </Text>
                  <Text style={{ fontWeight: '700', color: Color.light.tint, fontSize: 12, width: '33%', textAlign: 'right' }}>
                    {updatedServingSize ? ((data.food.proteinper100g * updatedServingSize) / 100).toFixed(1) : 0}g
                  </Text>
                </View>

                <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: 3 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                  <Text style={{ fontWeight: '500', color: '#000000', fontSize: 12, width: '33%' }}>Carbs</Text>
                  <Text style={{ fontWeight: '600', color: '#666666', fontSize: 12, width: '33%', textAlign: 'center' }}>
                    {data.food.carbohydratesper100g}g
                  </Text>
                  <Text style={{ fontWeight: '700', color: Color.light.tint, fontSize: 12, width: '33%', textAlign: 'right' }}>
                    {updatedServingSize ? ((data.food.carbohydratesper100g * updatedServingSize) / 100).toFixed(1) : 0}g
                  </Text>
                </View>

                <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: 3 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                  <Text style={{ fontWeight: '500', color: '#000000', fontSize: 12, width: '33%' }}>Fat</Text>
                  <Text style={{ fontWeight: '600', color: '#666666', fontSize: 12, width: '33%', textAlign: 'center' }}>
                    {data.food.fatper100g}g
                  </Text>
                  <Text style={{ fontWeight: '700', color: Color.light.tint, fontSize: 12, width: '33%', textAlign: 'right' }}>
                    {updatedServingSize ? ((data.food.fatper100g * updatedServingSize) / 100).toFixed(1) : 0}g
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Color.light.tint,
                  padding: 10,
                  borderRadius: 6,
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                onPress={handleUpdateMeal}
              >
                <Text style={{
                  color: Color.light.background,
                  fontWeight: '600',
                  fontSize: 14,
                  marginLeft: 6
                }}>
                  {!updateLoading ? "Update Meal" : "Updating..."}
                </Text>
              </TouchableOpacity>
            </View>

            {updateLoading && (
              <View style={{ marginTop: 16, alignItems: 'center' }}>
                <ActivityIndicator size="small" color={Color.light.tint} />
              </View>
            )}
          </View>
        </View>
      </Modal>






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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={[style.detailButton, { flex: 1, marginRight: 5 }]}
            onPress={() => {
              router.push(`/Explore/meals/${data.food.id}`);
            }}
          >
            <Text style={style.detailButtonText}>Show Detailed Food Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.detailButton, { flex: 1, marginLeft: 5 }]}
            onPress={() => {
              setUpdateModalVisible(true)
            }}
          >
            <Text style={style.detailButtonText}>Update Meal Data</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Pressable
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => {
          console.log('data', data)
          setDeleting(true)
          onDlate(data.id)
            .then(() => {
              setDeleting(false)
            })
            .catch((err) => {
              console.log(err)
              setDeleting(false)
            })
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
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeleContent: {
    width: '90%',
    backgroundColor: Color.light.background,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});