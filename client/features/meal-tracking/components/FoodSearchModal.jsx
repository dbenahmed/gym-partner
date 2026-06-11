import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import ModalSlideUp from "@/components/ui/ModalSlideUp";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SplashScreen from "@/components/ui/SplashScreen";
import useThemeContext from "@/context/themeContext";
import useAuth from "@/context/authContext";
import { fetchSearchFood, fetchCreateCustomMeal } from "@/features/meal-tracking/api/foodsApi";
import { validateName, validateAllNutrition } from "@/utils/validation.ts";

export default function FoodSearchModal({ isVisible, onClose, onFoodSelect }) {
  const { colors } = useThemeContext();
  const { authenticated, userId } = useAuth();

  const [searchForFoodLoading, setSearchForFoodLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [mine, setMine] = useState(false);

  const [customFoodModalVisible, setCustomFoodModalVisible] = useState(false);
  const [createFoodLoading, setCreateFoodLoading] = useState(false);

  const [nameFood, setNameFood] = useState("");
  const [nbKcal, setNbKcal] = useState(0);
  const [nbProt, setNbProt] = useState(0);
  const [nbFat, setNbFat] = useState(0);
  const [nbCarbs, setNbCarbs] = useState(0);

  const searchForFood = async (text) => {
    setSearchForFoodLoading(true);
    const { success, meals, message } = await fetchSearchFood(authenticated, {
      name: text,
    });
    if (success) {
      const nonRefusedMeals = meals.filter(
        (meal) => meal.status !== "refused" || meal.createdBy === userId
      );
      setFoods(nonRefusedMeals);
    } else {
      Alert.alert("Error", message);
      onClose();
    }
    setSearchForFoodLoading(false);
  };

  const addCustomFood = async () => {
    const validName = validateName(nameFood);
    if (!validName.success) {
      Alert.alert("Error", validName.message);
      return;
    }
    const valid = validateAllNutrition(nbFat, nbKcal, nbProt, nbCarbs);
    if (!valid.success) {
      Alert.alert("Error", valid.message);
      return;
    }
    setCreateFoodLoading(true);
    const { success, message } = await fetchCreateCustomMeal(authenticated, {
      foodname: nameFood,
      calories: parseInt(nbKcal),
      proteinper100g: parseInt(nbProt),
      carbohydratesper100g: parseInt(nbCarbs),
      fatper100g: parseInt(nbFat),
    });
    if (success) {
      Alert.alert("Success", message);
      setCustomFoodModalVisible(false);
    } else {
      Alert.alert("Error", message);
    }
    setCreateFoodLoading(false);
    setNameFood("");
    setNbCarbs(0);
    setNbFat(0);
    setNbProt(0);
    setNbKcal(0);
  };

  return (
    <ModalSlideUp
      isVisible={isVisible}
      onClose={() => {
        onClose();
        setCustomFoodModalVisible(false);
      }}
      props={{
        title: customFoodModalVisible ? "Create Custom Food" : "Add Food",
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        {customFoodModalVisible ? (
          <>
            {createFoodLoading ? (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: 20,
                    padding: 20,
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SplashScreen />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.text,
                      marginTop: 15,
                    }}
                  >
                    Creating your food...
                  </Text>
                </View>
              </View>
            ) : (
              <ScrollView style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.tintLighter,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    marginBottom: 12,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="restaurant"
                    size={20}
                    color={colors.tint}
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    placeholder="Food Name"
                    placeholderTextColor={colors.tabIconDefault}
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: colors.text,
                      paddingVertical: 8,
                    }}
                    onChangeText={setNameFood}
                  />
                </View>

                <View style={{ marginVertical: 8 }}>
                  <View
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: colors.tintLighter,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      marginBottom: 12,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="local-fire-department"
                      size={20}
                      color="#FF6B6B"
                      style={{ marginRight: 8 }}
                    />
                    <TextInput
                      placeholder="Calories per 100g"
                      placeholderTextColor={colors.tabIconDefault}
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: colors.text,
                        paddingVertical: 8,
                      }}
                      keyboardType="numeric"
                      onChangeText={setNbKcal}
                      value={nbKcal.toString()}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: colors.tintLighter,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      marginBottom: 12,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="egg"
                      size={20}
                      color="#4CAF50"
                      style={{ marginRight: 8 }}
                    />
                    <TextInput
                      placeholder="Protein per 100g"
                      placeholderTextColor={colors.tabIconDefault}
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: colors.text,
                        paddingVertical: 8,
                      }}
                      keyboardType="numeric"
                      onChangeText={setNbProt}
                      value={nbProt.toString()}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: colors.tintLighter,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      marginBottom: 12,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="bakery-dining"
                      size={20}
                      color="#FF9800"
                      style={{ marginRight: 8 }}
                    />
                    <TextInput
                      placeholder="Carbs per 100g"
                      placeholderTextColor={colors.tabIconDefault}
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: colors.text,
                        paddingVertical: 8,
                      }}
                      keyboardType="numeric"
                      onChangeText={setNbCarbs}
                      value={nbCarbs.toString()}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: colors.tintLighter,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      marginBottom: 12,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="water-drop"
                      size={20}
                      color="#FFC107"
                      style={{ marginRight: 8 }}
                    />
                    <TextInput
                      placeholder="Fat per 100g"
                      placeholderTextColor={colors.tabIconDefault}
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: colors.text,
                        paddingVertical: 8,
                      }}
                      keyboardType="numeric"
                      onChangeText={setNbFat}
                      value={nbFat.toString()}
                    />
                  </View>
                </View>
              </ScrollView>
            )}

            {!createFoodLoading && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginRight: 8,
                    backgroundColor: colors.background,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.tint,
                    padding: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                  onPress={() => setCustomFoodModalVisible(false)}
                >
                  <MaterialIcons
                    name="arrow-back"
                    size={18}
                    color={colors.tint}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={{
                      fontWeight: "700",
                      color: colors.tint,
                      fontSize: 14,
                    }}
                  >
                    Back
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    backgroundColor: colors.tint,
                    borderRadius: 10,
                    padding: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                  onPress={addCustomFood}
                >
                  <MaterialIcons
                    name="add-circle"
                    size={18}
                    color="white"
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    Create Food
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.background,
                borderRadius: 12,
                paddingHorizontal: 12,
                marginBottom: 16,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.tint,
              }}
            >
              <MaterialIcons name="search" size={20} color={colors.tint} />
              <TextInput
                placeholder="Search for food"
                placeholderTextColor={colors.tabIconDefault}
                style={{
                  flex: 1,
                  padding: 12,
                  color: colors.text,
                  fontWeight: "500",
                  marginLeft: 8,
                }}
                onChangeText={searchForFood}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  color: colors.tint,
                  fontSize: 16,
                }}
              >
                Food Results
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: verifiedOnly ? colors.background : colors.tintLighter,
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                      marginRight: 8,
                    }}
                    onPress={() => setVerifiedOnly(!verifiedOnly)}
                  >
                    <MaterialIcons
                      name="verified"
                      size={16}
                      color={verifiedOnly ? colors.green : colors.tabIconDefault}
                    />
                    <Text
                      style={{
                        color: verifiedOnly ? colors.green : colors.tabIconDefault,
                        fontWeight: "600",
                        fontSize: 14,
                        marginLeft: 4,
                      }}
                    >
                      Verified Only
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: mine ? colors.tint : colors.tintLighter,
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                      marginRight: 8,
                    }}
                    onPress={() => setMine(!mine)}
                  >
                    <MaterialIcons
                      name="person"
                      size={16}
                      color={mine ? "#ffffff" : colors.tabIconDefault}
                    />
                    <Text
                      style={{
                        color: mine ? "#ffffff" : colors.tabIconDefault,
                        fontWeight: "600",
                        fontSize: 14,
                        marginLeft: 4,
                      }}
                    >
                      Mine
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: colors.tintLighter,
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                    }}
                    onPress={() => setCustomFoodModalVisible(true)}
                  >
                    <MaterialIcons name="add" size={16} color={colors.tint} />
                    <Text
                      style={{
                        color: colors.tint,
                        fontWeight: "600",
                        fontSize: 14,
                        marginLeft: 4,
                      }}
                    >
                      Custom Food
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            {searchForFoodLoading ? (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: 20,
                    padding: 20,
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SplashScreen />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.text,
                      marginTop: 15,
                    }}
                  >
                    Searching for foods...
                  </Text>
                </View>
              </View>
            ) : (
              <FlatList
                data={
                  verifiedOnly
                    ? foods.filter((item) => item.status === "verified")
                    : mine
                      ? foods.filter((item) => item.createdBy === userId)
                      : foods
                }
                contentContainerStyle={{ paddingBottom: 10 }}
                style={{ flex: 1 }}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.background,
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: 10,
                      elevation: 2,
                      shadowColor: colors.tint,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      borderWidth: 0.5,
                      borderColor: colors.tint,
                    }}
                    onPress={() => onFoodSelect(item)}
                  >
                    <View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontWeight: "700", fontSize: 15, color: colors.text }} numberOfLines={1}>
                          {item.foodname}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          backgroundColor: colors.tintLighter,
                          borderRadius: 8,
                          padding: 6,
                          marginTop: 8,
                        }}
                      >
                        <Text style={{ color: colors.text, fontSize: 12 }}>
                          <Text style={{ fontWeight: "700", color: colors.tint }}>Protein: </Text>{item.proteinper100g}g
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 12 }}>
                          <Text style={{ fontWeight: "700", color: colors.tint }}>Carbs: </Text>{item.carbohydratesper100g}g
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 12 }}>
                          <Text style={{ fontWeight: "700", color: colors.tint }}>Fat: </Text>{item.fatper100g}g
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 12 }}>
                          <Text style={{ fontWeight: "700", color: colors.tint }}>Cal: </Text>{item.calories}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </>
        )}
      </ScrollView>
    </ModalSlideUp>
  );
}
