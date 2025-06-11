import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import React, { useMemo } from "react";
import Color from "@/constants/Colors.ts";
import { useState, useEffect } from "react";
import Meal from "@/components/meal";
import { defaultUrl } from "@/constants/constants.ts";
import {
  fetchSearchFood,
  fetchAddFoodToUser,
  fetchCreateCustomMeal,
} from "@/lib/api";

import {
  validateAllNutrition,
  validateNameWithNumbers,
  validateName,
} from "@/utils/validation.ts";
import useAuth from "@/context/authContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SplashScreen from "@/components/SplashScreen";
import useThemeContext from "@/context/themeContext";



export default function mealsHome() {


  const { colors, theme } = useThemeContext();

  const styles = useMemo(() => {
    return StyleSheet.create({
      header: {
        flexDirection: "row",
        shadowColor: colors.tint,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
        borderBottomWidth: 1,
        borderBottomColor: colors.tintLighter,
        backgroundColor: colors.background,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        height: "fit",
        backgroundColor: colors.background,
        padding: 20,
      },
      vitamine: {
        backgroundColor: colors.tint,
        padding: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      },
      button: {
        padding: 10,
        color: colors.tint,
        backgroundColor: colors.background,
        margin: "auto",
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
      },
      modalBackground: {
        flex: 1,
        padding: (10, 30),
      },
      modeleContent: {
        padding: 20,
        backgroundColor: colors.background,
        borderRadius: 20,
      },
      foodItem: {
        padding: 15,
        backgroundColor: "#f8f8f8",
        margin: 5,
        width: "95%",
        borderRadius: 10,
      },
      selectedFood: {
        backgroundColor: "#ffa726", // تغيير اللون عند التحديد
      },
      FoodInput: {
        backgroundColor: colors.tint,
        marginTop: 10,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
      foodVitamineInput: {
        backgroundColor: colors.tint,
        width: "23%",
        marginTop: 10,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
      car: {
        fontSize: 12,
        color: Color.dark,
        textAlign: "center",
        fontWeight: "700",
      },
      box: {
        backgroundColor: colors.background,
        margin: 2,
        padding: 4,
        borderRadius: 5,
        fontWeight: "800",
        width: 56,
      },
      addMealButton: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.tint,
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        transform: [{ scale: 1 }],
      },

      addMealButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      },

      addMealButtonIcon: {
        fontSize: 20,
        fontWeight: '300',
        color: colors.tint,
        lineHeight: 20,
      },

      addMealButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.tint,
        letterSpacing: 0.5,
      },

      // Header Styles
      header: {
        alignItems: 'flex-start',
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      },

      headerLeft: {
        flex: 1,
        paddingRight: 16,
      },

      headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
        lineHeight: 24,
      },

      headerDate: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
        opacity: 0.7,
      },

      headerRight: {
        alignItems: 'center',
        minWidth: 160,
      },

      totalLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        color: colors.text,
        opacity: 0.6,
        marginBottom: 12,
        textAlign: 'center',
      },

      nutritionSummary: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        justifyContent: 'center',
      },

      nutritionItem: {
        minWidth: 70,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },

      nutritionValue: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
        marginBottom: 2,
        textAlign: 'center',
      },

      nutritionLabel: {
        fontSize: 9,
        fontWeight: '600',
        color: 'white',
        opacity: 0.9,
        textAlign: 'center',
      },

      // Alternative compact header style
      headerCompact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
      },

      // Alternative button style - filled
      addMealButtonFilled: {
        backgroundColor: colors.tint,
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        shadowColor: colors.tint,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      },

      addMealButtonFilledText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.background,
        textAlign: 'center',
        letterSpacing: 0.5,
      },

      // Alternative button style - minimal
      addMealButtonMinimal: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },

      addMealButtonMinimalText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.tint,
        textAlign: 'center',
        textDecorationLine: 'underline',
      },
    })
  }, [colors])






  const [meals, setMeals] = useState([]);

  const { authenticated, userId } = useAuth();
  console.log("userId loading", userId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [createFoodLoading, setCreateFoodLoading] = useState(false);
  const [customFoodModalVisible, setCustomFoodModalVisible] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());

  const renderUserMealsOnDate = async () => {
    try {
      setLoading(true);
      const token = authenticated;
      const dateStr = new Date(currentDate).toISOString().split("T")[0];
      console.log("defatul", defaultUrl);
      const url = `${defaultUrl}/meals?date=${dateStr}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        Alert.alert("Error", "Failed to fetch meals");
        return;
      }
      console.log("1");
      const json = await res.json();
      console.log(json);
      if (!json.success) {
        Alert.alert("Error", json.message);
        return;
      }
      console.log("2");
      setMeals(json.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
      Alert.alert("Error", "Failed to fetch meals");
      setLoading(false);
      setError(true);
    }
  };

  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [mine, setMine] = useState(false);

  const toggleMine = () => {
    setMine((prev) => !prev);
  }

  const toggleVerifiedOnly = () => {
    setVerifiedOnly((prev) => !prev);
  };

  useEffect(() => {
    const run = async () => {
      await renderUserMealsOnDate();
    };
    run();
  }, [currentDate]);

  const [addFoodLoading, setAddFoodLoading] = useState(false);
  const [foods, setFoods] = useState([]);

  //the content of vitamine in meals of this day
  const prot = 0;
  const kcal = meals
    ? parseFloat(
      meals
        .reduce((sum, meal) => {
          return sum + (meal.servingsizeG * meal.food.calories) / 100;
        }, 0)
        .toFixed(0)
    )
    : 0;
  const carb = meals
    ? parseFloat(
      meals
        .reduce((sum, meal) => {
          return (
            sum + (meal.servingsizeG * meal.food.carbohydratesper100g) / 100
          );
        }, 0)
        .toFixed(0)
    )
    : 0;
  const fats = meals
    ? parseFloat(
      meals
        .reduce((sum, meal) => {
          return sum + (meal.servingsizeG * meal.food.fatper100g) / 100;
        }, 0)
        .toFixed(0)
    )
    : 0;
  let nbMeals = 5;
  let nbFood = 10;
  //time

  /* 
    useEffect(() => {
      const date = new Date();
      setCurrentDate(date);
    }, []); */

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleFood, setModalVisibleFood] = useState(true);
  const [search, setSearch] = useState("");
  const [searchForFoodLoading, setSearchForFoodLoading] = useState(false);
  const [nameFood, setNameFood] = useState("");
  const [nbKcal, setNbKcal] = useState(0);
  const [nbProt, setNbProt] = useState(0);
  const [nbFat, setNbFat] = useState(0);
  const [nbCarbs, setNbCarbs] = useState(0);

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);

    // Get today's date and set to midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Set the potential next date to midnight for accurate comparison
    const nextDateMidnight = new Date(newDate);
    nextDateMidnight.setHours(0, 0, 0, 0);

    // Check if the next date would be in the future compared to today
    if (nextDateMidnight.getTime() > today.getTime()) {
      Alert.alert(
        "Cannot view future dates",
        "You can only view today and past meals."
      );
      return;
    }

    // If we get here, the next date is either today or in the past
    setCurrentDate(newDate);
  };

  const createMeal = () => {
    nbMeals++;
    setModalVisible(false);
    const newMeal = [];
    const Meal = {
      id: nbMeals,
      foods: [],
      kcal: [],
      protein: [],
      fat: [],
      carbs: [],
    };
    newMeal.map((e) => {
      Meal.foods.push(e.name);
      Meal.kcal.push(e.kcal);
      Meal.carbs.push(e.carbs);
      Meal.protein.push(e.protein);
      Meal.fat.push(e.fat);
    });

    //meals.push(Meal);
    setMeals([...meals, Meal]);
  };

  const AddFood = async () => {

    console.log("AddFood called");
    console.log("nameFood", nameFood);



    const validName = validateName(nameFood);
    if (!(validName.success)) {
      Alert.alert("Error", validName.message);
      return;
    }
    const valid = validateAllNutrition(nbFat, nbKcal, nbProt, nbCarbs)
    console.log(valid)
    if (
      !valid.success
    ) {
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
      console.log("added");
    } else {
      Alert.alert("Error", message);
      console.error("Error:", message);
    }
    setCreateFoodLoading(false);
    setNameFood("");
    setNbCarbs(0);
    setNbFat(0);
    setNbProt(0);
    setNbKcal(0);
  };
  const [servingSize, setServingSize] = useState(0);

  const updateMeal = async (id, body) => {
    console.log(id);
    const token = authenticated;
    const url = `${defaultUrl}/meals/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      Alert.alert("Error", "Failed to update meal");
      return;
    }
    const { message, success } = await res.json();
    if (!success) {
      Alert.alert("Error", message);
      return;
    }
    renderUserMealsOnDate();
  };
  const delateMeal = async (id) => {
    console.log(id);
    const token = authenticated;
    const url = `${defaultUrl}/meals/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json);
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const [additionModalVisible, setAdditionModalVisible] = useState(false);
  const [selectedAdditionFoodItem, setSelectedAdditionFoodItem] =
    useState(null);
  const toggleAdditionModal = (item) => {
    setAdditionModalVisible((prev) => {
      if (prev) {
        setSelectedAdditionFoodItem(null);
      } else {
        setSelectedAdditionFoodItem(item);
      }
      return !prev;
    });
  };
  const addFoodToUser = async () => {
    // REQUEST
    // Check if the serving size is valid
    if (selectedAdditionFoodItem === null) {
      Alert.alert("Please select a food item");
      return;
    }

    /* // verify serving size does not contain letters or characters but just numbers 
    if (/^[0-9]*\.?[0-9]+$/.test(servingSize)) {
      Alert.alert("Please enter a valid serving size");
    } */

    if (isNaN(parseInt(servingSize))) {
      Alert.alert("Please enter a valid serving size");
      return;
    }

    if (parseInt(servingSize) <= 0 || servingSize.length == 0) {
      Alert.alert("Please enter a serving size");
      return;
    }

    if (parseInt(servingSize) > 1000) {
      Alert.alert("Serving size too large");
      return;
    }

    setAddFoodLoading(true);

    const res = await fetchAddFoodToUser(
      currentDate.toISOString().split("T")[0],
      selectedAdditionFoodItem.id,
      selectedAdditionFoodItem.description,
      parseInt(servingSize),
      authenticated
    );
    if (res.success) {
      Alert.alert("Food added successfully");
      renderUserMealsOnDate();
      toggleAdditionModal();
      setAddFoodLoading(false);
      setServingSize(0);
    } else {
      Alert.alert("Error", res.message);
    }
    // Close the modal
  };

  const renderFoodAdditionModal = () => {
    if (additionModalVisible) {
      return (
        <Modal
          animationType="slide"
          visible={additionModalVisible}
          propagateSwipe={false}
          onRequestClose={() => setAdditionModalVisible(false)}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            margin: 0,
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modeleContent}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 19,
                    color: colors.text,
                  }}
                >
                  {selectedAdditionFoodItem.foodname}
                </Text>
                <TouchableOpacity
                  onPress={() => setAdditionModalVisible(false)}
                >
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={colors.tint}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: colors.tintLighter,
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                <MaterialIcons
                  name="info-outline"
                  size={20}
                  color={colors.tint}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 12,
                    fontWeight: "400",
                    width: "90%",
                    textAlign: "left",
                    flexWrap: "wrap",
                  }}
                >
                  {selectedAdditionFoodItem.description ||
                    "No description available"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color: colors.text,
                    fontSize: 13
                  }}
                >
                  <MaterialIcons
                    name="restaurant"
                    size={16}
                    color={colors.tint}
                    style={{ marginRight: 4 }}
                  />
                  Serving Size (g):
                </Text>
                <TextInput
                  style={{
                    borderWidth: 0.7,
                    borderColor: colors.tint,
                    borderRadius: 8,
                    padding: 10,
                    color: colors.text,
                    backgroundColor: colors.background,
                    width: "50%",
                    marginLeft: 10,
                  }}
                  placeholder="Enter serving size"
                  placeholderTextColor={colors.tabIconDefault}
                  keyboardType="numeric"
                  
                  onChangeText={(value) => {
                    setServingSize(value);
                  }}
                />
              </View>

              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  color: colors.text,
                  marginBottom: 12,
                }}
              >
                <MaterialIcons
                  name="pie-chart"
                  size={16}
                  color={colors.tint}
                  style={{ marginRight: 4 }}
                />
                Nutrition Facts (per 100g)
              </Text>

              <View
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 16,
                  shadowColor: colors.tint,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                  borderWidth: 0.5,
                  borderColor: colors.tintLighter,
                }}
              >
                <View style={{ marginBottom: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: colors.text,
                        fontSize: 13,
                        width: "33%",
                      }}
                    >
                      Nutrient
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        color: colors.tabIconDefault,
                        fontSize: 13,
                        width: "33%",
                        textAlign: "center",
                      }}
                    >
                      Per 100g
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        color: colors.tint,
                        fontSize: 13,
                        width: "33%",
                        textAlign: "right",
                      }}
                    >
                      Total
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.tintLighter,
                      marginVertical: 4,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        color: colors.text,
                        fontSize: 12,
                        width: "33%",
                      }}
                    >
                      Calories
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: colors.tabIconDefault,
                        fontSize: 12,
                        width: "33%",
                        textAlign: "center",
                      }}
                    >
                      {selectedAdditionFoodItem.calories} kcal
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        color: colors.tint,
                        fontSize: 12,
                        width: "33%",
                        textAlign: "right",
                      }}
                    >
                      {servingSize
                        ? Math.round(
                          (selectedAdditionFoodItem.calories * servingSize) /
                          100
                        )
                        : 0}{" "}
                      kcal
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.tintLighter,
                      marginVertical: 3,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        color: colors.text,
                        fontSize: 12,
                        width: "33%",
                      }}
                    >
                      Protein
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: colors.tabIconDefault,
                        fontSize: 12,
                        width: "33%",
                        textAlign: "center",
                      }}
                    >
                      {selectedAdditionFoodItem.proteinper100g}g
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        color: colors.tint,
                        fontSize: 12,
                        width: "33%",
                        textAlign: "right",
                      }}
                    >
                      {servingSize
                        ? (
                          (selectedAdditionFoodItem.proteinper100g *
                            servingSize) /
                          100
                        ).toFixed(1)
                        : 0}
                      g
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.tintLighter,
                      marginVertical: 3,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        color: colors.text,
                        fontSize: 12,
                        width: "33%",
                      }}
                    >
                      Carbs
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: colors.tabIconDefault,
                        fontSize: 12,
                        width: "33%",
                        textAlign: "center",
                      }}
                    >
                      {selectedAdditionFoodItem.carbohydratesper100g}g
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        color: colors.tint,
                        fontSize: 12,
                        width: "33%",
                        textAlign: "right",
                      }}
                    >
                      {servingSize
                        ? (
                          (selectedAdditionFoodItem.carbohydratesper100g *
                            servingSize) /
                          100
                        ).toFixed(1)
                        : 0}
                      g
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.tintLighter,
                      marginVertical: 3,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        color: colors.text,
                        fontSize: 12,
                        width: "33%",
                      }}
                    >
                      Fat
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: colors.tabIconDefault,
                        fontSize: 12,
                        width: "33%",
                        textAlign: "center",
                      }}
                    >
                      {selectedAdditionFoodItem.fatper100g}g
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        color: colors.tint,
                        fontSize: 12,
                        width: "33%",
                        textAlign: "right",
                      }}
                    >
                      {servingSize
                        ? (
                          (selectedAdditionFoodItem.fatper100g *
                            servingSize) /
                          100
                        ).toFixed(1)
                        : 0}
                      g
                    </Text>
                  </View>
                </View>

                {selectedAdditionFoodItem.brand && (
                  <View style={{ marginTop: 6 }}>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.tintLighter,
                        marginVertical: 6,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{
                        fontWeight: "500",
                        color: colors.text
                      }}>
                        Brand
                      </Text>
                      <Text
                        style={{
                          fontWeight: "700",
                          color: colors.tint
                        }}
                      >
                        {selectedAdditionFoodItem.brand}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.tint,
                    padding: 10,
                    borderRadius: 6,
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    addFoodToUser();
                  }}
                >
                  <MaterialIcons name="add" size={16} color={colors.background} />
                  <Text
                    style={{
                      color: colors.background,
                      fontWeight: "600",
                      fontSize: 14,
                      marginLeft: 6,
                    }}
                  >
                    {!addFoodLoading ? "Add Food" : "Adding..."}
                  </Text>
                </TouchableOpacity>
              </View>

              {addFoodLoading && (
                <View style={{ marginTop: 16, alignItems: "center" }}>
                  <ActivityIndicator size="small" color={colors.tint} />
                </View>
              )}
            </View>
          </View>
        </Modal>
      );
    }
  };

  const searchForFood = async (e) => {
    setSearchForFoodLoading(true);
    const text = e;
    const { success, meals, message } = await fetchSearchFood(authenticated, {
      name: text,
    });
    if (success) {
      console.log("id", userId);
      console.log("meal", meals);
      const nonRefusedMeals = meals.filter(
        (meal) => meal.status !== "refused" || meal.createdBy === userId
      );
      setFoods(nonRefusedMeals);
    } else {
      Alert.alert("Error", message);
      setModalVisible(false);
    }
    setSearchForFoodLoading(false);
  };

  if (error) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Error</Text>
      </View>
    )
  }
  return (
    <>

      <View style={{ flex: 1, paddingBottom: 10, backgroundColor: colors.background }}>
        <View style={styles.header}>


          <View style={styles.headerRight}>
            <Text style={styles.totalLabel}>
              TODAY'S TOTAL
            </Text>

            <View style={styles.nutritionSummary}>
              {[
                { value: prot, label: 'Protein', unit: 'g', color: colors.proteinBg },
                { value: kcal, label: 'Calories', unit: '', color: colors.caloriesBg },
                { value: carb, label: 'Carbs', unit: 'g', color: colors.carbsBg },
                { value: fats, label: 'Fat', unit: 'g', color: colors.fatBg }
              ].map((nutrient, index) => (
                <View key={nutrient.label} style={[styles.nutritionItem, { backgroundColor: nutrient.color }]}>
                  <Text style={styles.nutritionValue}>
                    {nutrient.value}{nutrient.unit}
                  </Text>
                  <Text style={styles.nutritionLabel}>
                    {nutrient.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 6,
            paddingHorizontal: 16,
            // Add shadow to the rectangle of the whole date navigation view
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 6,
            elevation: 4,
            backgroundColor: colors.background,
            borderRadius: 10,
            marginHorizontal: 16,
            marginVertical: 8,
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                color: colors.tint,
                fontWeight: "900",
                fontSize: 30,
              }}
              onPress={goToPreviousDay}
            >
              &lt;
            </Text>
          </TouchableOpacity>
          {(() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(currentDate);
            selectedDate.setHours(0, 0, 0, 0);

            const diffDays = Math.round(
              (today - selectedDate) / (1000 * 60 * 60 * 24)
            );

            if (diffDays === 0) {
              return (
                <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
                  Today's meals
                </Text>
              );
            } else if (diffDays === 1) {
              return (
                <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
                  Yesterday's meals
                </Text>
              );
            } else if (diffDays === 2) {
              return (
                <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
                  Day before yesterday
                </Text>
              );
            } else if (diffDays < 3) {
              return (
                <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
                  {diffDays} days ago
                </Text>
              );
            } else {
              return (
                <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
                  {currentDate.toDateString()}
                </Text>
              );
            }
          })()}
          {currentDate.getTime() < new Date().setHours(0, 0, 0, 0) ? (
            <TouchableOpacity>
              <Text
                style={{
                  color: colors.tint,
                  fontWeight: "900",
                  fontSize: 30,
                }}
                onPress={goToNextDay}
              >
                &gt;
              </Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>

        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SplashScreen />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: "600",
                color: colors.text,
                marginTop: 15,
              }}
            >
              Loading your meals...
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              {meals ? (
                meals.map((e) => (
                  <Meal
                    key={e.id}
                    data={e}
                    onDelete={delateMeal}
                    onUpdate={updateMeal}
                  />
                ))
              ) : (
                <View></View>
              )}

              <TouchableOpacity
                style={styles.addMealButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
              >
                <View style={styles.addMealButtonContent}>
                  <Text style={styles.addMealButtonIcon}>+</Text>
                  <Text style={styles.addMealButtonText}>Add New Meal</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        <Modal
          isVisible={modalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => setModalVisible(false)}
          swipeDirection={additionModalVisible ? [] : ["down"]}
          propagateSwipe={false}
          onSwipeComplete={() => setModalVisible(false)}
          style={{ margin: 0 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: colors.background,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 16,
                height: "90%",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontWeight: "800",
                    color: colors.text,
                    fontSize: 20,
                  }}
                >
                  {customFoodModalVisible ? "Create Custom Food" : "Add Food"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setCustomFoodModalVisible(false);
                  }}
                >
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>

              {/* Content based on current view */}
              {customFoodModalVisible ? (
                // Custom Food Creation Form
                <>
                  {createFoodLoading ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
                            color: "#000000",
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
                          onChangeText={(e) => setNameFood(e)}
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
                            onChangeText={(e) => setNbKcal(e)}
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
                            onChangeText={(e) => setNbProt(e)}
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
                            onChangeText={(e) => setNbCarbs(e)}
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
                            onChangeText={(e) => setNbFat(e)}
                            value={nbFat.toString()}
                          />
                        </View>
                      </View>
                    </ScrollView>
                  )}

                  {/* Custom Food Buttons */}
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
                        onPress={() => {
                          AddFood();
                        }}
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
                // Food Search and List View
                <>
                  {/* Search Bar */}
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
                    <MaterialIcons
                      name="search"
                      size={20}
                      color={colors.tint}
                    />
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
                      onChangeText={(e) => {
                        searchForFood(e);
                      }}
                    />
                  </View>

                  {/* Filter Options */}
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
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                          onPress={() => {
                            toggleVerifiedOnly();
                          }}
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
                          onPress={() => {
                            toggleMine();
                          }}
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

                  {/* Food List or Loading */}
                  {searchForFoodLoading ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
                            color: "#000000",
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
                      ItemSeparatorComponent={() => (
                        <View style={{ height: 12 }} />
                      )}
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
                          onPress={() => {
                            toggleAdditionModal(item);
                            console.log(item);
                          }}
                        >
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: "700",
                                  fontSize: 15,
                                  color: colors.text,
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {item.foodname}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 6,
                                  }}
                                >
                                  {item.status === "verified" ? (
                                    <View
                                      style={{
                                        backgroundColor: "rgba(0, 128, 0, 0.2)",
                                        borderRadius: 4,
                                        paddingHorizontal: 6,
                                        paddingVertical: 3,
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <MaterialIcons
                                        name="verified"
                                        size={16}
                                        color="green"
                                      />
                                      <Text
                                        style={{
                                          color: "green",
                                          fontSize: 12,
                                          marginLeft: 4,
                                          fontWeight: "600",
                                        }}
                                      >
                                        Verified
                                      </Text>
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        backgroundColor:
                                          "rgba(128, 128, 128, 0.2)",
                                        borderRadius: 4,
                                        paddingHorizontal: 6,
                                        paddingVertical: 3,
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <MaterialIcons
                                        name="pending"
                                        size={16}
                                        color="gray"
                                      />
                                      <Text
                                        style={{
                                          color: "gray",
                                          fontSize: 12,
                                          marginLeft: 4,
                                          fontWeight: "600",
                                        }}
                                      >
                                        Pending
                                      </Text>
                                    </View>
                                  )}
                                  {item.createdBy === userId && (
                                    <View
                                      style={{
                                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                                        borderRadius: 4,
                                        paddingHorizontal: 6,
                                        paddingVertical: 3,
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <MaterialIcons
                                        name="person"
                                        size={16}
                                        color="red"
                                      />
                                      <Text
                                        style={{
                                          color: "red",
                                          fontSize: 12,
                                          marginLeft: 4,
                                          fontWeight: "600",
                                        }}
                                      >
                                        Mine
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
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
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <View
                                  style={{
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: colors.text,
                                      fontSize: 12,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontWeight: "700",
                                        color: colors.tint,
                                      }}
                                    >
                                      Protein:{" "}
                                    </Text>
                                    {item.proteinper100g}g
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: colors.text,
                                      fontSize: 12,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontWeight: "700",
                                        color: colors.tint,
                                      }}
                                    >
                                      Carbs:{" "}
                                    </Text>
                                    {item.carbohydratesper100g}g
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: colors.text,
                                      fontSize: 12,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontWeight: "700",
                                        color: colors.tint,
                                      }}
                                    >
                                      Fat:{" "}
                                    </Text>
                                    {item.fatper100g}g
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: colors.text,
                                      fontSize: 12,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontWeight: "700",
                                        color: colors.tint,
                                      }}
                                    >
                                      Cal:{" "}
                                    </Text>
                                    {item.calories}
                                  </Text>
                                </View>
                              </View>
                            </View>

                            <View
                              style={{
                                marginTop: 8,
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <View
                                style={{
                                  backgroundColor: colors.background,
                                  borderRadius: 6,
                                  padding: 4,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  flex: 1,
                                  marginRight: 4,
                                  borderWidth: 0.5,
                                  borderColor: colors.tint,
                                }}
                              >
                                <MaterialIcons
                                  name="person"
                                  size={14}
                                  color={colors.tint}
                                />
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: colors.text,
                                    marginLeft: 4,
                                    fontStyle: "italic",
                                  }}
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                >
                                  By: {item.creatorName || "Unknown"}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: colors.background,
                                  borderRadius: 6,
                                  padding: 4,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  flex: 1,
                                  marginLeft: 4,
                                  borderWidth: 0.5,
                                  borderColor: colors.tint,
                                }}
                              >
                                <MaterialIcons
                                  name="business"
                                  size={14}
                                  color={colors.tint}
                                />
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: colors.text,
                                    marginLeft: 4,
                                    fontStyle: "italic",
                                  }}
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                >
                                  Brand: {item.brand || "Generic"}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  )}

                  {/* Close Button for Search View */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 12,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.tint,
                        padding: 12,
                        borderRadius: 10,
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                      onPress={() => setModalVisible(false)}
                    >
                      <MaterialIcons name="close" size={18} color="#FFFFFF" />
                      <Text
                        style={{
                          fontWeight: "700",
                          color: "#FFFFFF",
                          marginLeft: 6,
                        }}
                      >
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* Food Addition Modal - Keep this if it's a separate modal for adding quantities */}
              {renderFoodAdditionModal()}
            </View>
          </View>
        </Modal>
      </View>

    </>
  );
}
