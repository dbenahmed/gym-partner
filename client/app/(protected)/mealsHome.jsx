import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Color from "@/constants/Colors.ts";
import { useState, useEffect, useContext } from "react";
import Meal from "@/components/meal";
import { defaultUrl } from "@/constants/constants.ts"
import { fetchSearchFood, fetchAddFoodToUser, fetchCreateCustomMeal } from "@/lib/api";
import useAuth from "@/app/contex/authcontex";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default function mealsHome() {
  const [meals, setMeals] = useState([]);

  const { authenticated, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)



  const [customFoodModalVisible, setCustomFoodModalVisible] = useState(false)

  const [currentDate, setCurrentDate] = useState(new Date());

  const renderUserMealsOnDate = async () => {
    try {
      setLoading(true);
      const token = authenticated
      const dateStr = new Date(currentDate).toISOString().split('T')[0]
      console.log('defatul', defaultUrl)
      const url = `${defaultUrl}/meals?date=${dateStr}`
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      if (!res.ok) {
        Alert.alert("Error", "Failed to fetch meals")
        return;
      }
      console.log('1')
      const json = await res.json()
      console.log(json)
      if (!json.success) {
        Alert.alert("Error", json.message)
        return;
      }
      console.log('2')
      setMeals(json.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meals:', error);
      Alert.alert('Error', 'Failed to fetch meals');
      setLoading(false);
      setError(true)
    }
  }

  useEffect(() => {
    const run = async () => {
      await renderUserMealsOnDate();
    }
    run()
  }, [currentDate]);

  const [addFoodLoading, setAddFoodLoading] = useState(false)
  const [foods, setFoods] = useState([]);

  //the content of vitamine in meals of this day
  const prot = 0;
  const kcal = meals ? parseFloat(
    meals
      .reduce((sum, meal) => {
        return sum + (meal.servingsizeG * meal.food.calories / 100);
      }, 0)
      .toFixed(0)
  ) : 0;
  const carb = meals ? parseFloat(
    meals
      .reduce((sum, meal) => {
        return sum + (meal.servingsizeG * meal.food.carbohydratesper100g / 100);
      }, 0)
      .toFixed(0)
  ) : 0;
  const fats = meals ? parseFloat(
    meals
      .reduce((sum, meal) => {
        return sum + (meal.servingsizeG * meal.food.fatper100g / 100);
      }, 0)
      .toFixed(0)
  ) : 0;
  let nbMeals = 5;
  let nbFood = 10;
  //time

  /* 
    useEffect(() => {
      const date = new Date();
      setCurrentDate(date);
    }, []); */

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleFood, setModalVisibleFood] = useState(false);
  const [search, setSearch] = useState("");
  const [searchForFoodLoading, setSearchForFoodLoading] = useState(false)
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
    if (
      nameFood.length == 0 ||
      nbFat == 0 ||
      nbKcal == 0 ||
      nbProt == 0 ||
      nbCarbs == 0
    ) {
      Alert.alert("there are a empty input");
    } else {
      setModalVisibleFood(false);
      const res = await fetchCreateCustomMeal(authenticated, {
        foodname: nameFood,
        calories: nbKcal,
        proteinper100g: nbProt,
        carbohydratesper100g: nbCarbs,
        fatper100g: nbFat,
      });
      if (res.success) {
        Alert.alert("Success", res.message);
        setCustomFoodModalVisible(false)
        console.log('added')
      } else {
        Alert.alert("Error", res.message);
      }
      setNameFood("");
      setNbCarbs(0);
      setNbFat(0);
      setNbProt(0);
      setNbKcal(0);
    }
  };
  const [servingSize, setServingSize] = useState(0)
  const delateMeal = async (id) => {
    console.log(id)
    const token = authenticated
    const url = `${defaultUrl}/meals/${id}`
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    const json = await res.json()
    console.log(json)
    setMeals(meals.filter((meal) => meal.id !== id))
  };

  const [additionModalVisible, setAdditionModalVisible] = useState(false)
  const [selectedAdditionFoodItem, setSelectedAdditionFoodItem] = useState(null)
  const toggleAdditionModal = (item) => {
    setAdditionModalVisible((prev) => {
      if (prev) {
        setSelectedAdditionFoodItem(null)
      } else {
        setSelectedAdditionFoodItem(item)
      }
      return !prev
    })
  }
  const addFoodToUser = async () => {
    // REQUEST

    setAddFoodLoading(true)

    const res = await fetchAddFoodToUser(currentDate.toISOString().split('T')[0], selectedAdditionFoodItem.id, selectedAdditionFoodItem.description, servingSize, authenticated)
    if (res.success) {
      Alert.alert("Food added successfully")
      renderUserMealsOnDate()
      toggleAdditionModal()
    } else {
      Alert.alert("Error", res.message)
    }
    setAddFoodLoading(false)
    // Close the modal

  }
  const renderFoodAdditionModal = () => {
    if (additionModalVisible) {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={additionModalVisible}
          onRequestClose={() => setAdditionModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modeleContent}>
              <Text style={{ fontWeight: "700", color: Color.light.tint }}>Addition Modal</Text>
              <TouchableOpacity style={styles.button} onPress={() => setAdditionModalVisible(false)}>
                <Text style={{ fontWeight: "700", color: Color.light.text }}>Close</Text>
              </TouchableOpacity>
              <View style={styles.servingSizeContainer}>
                <Text style={styles.servingSizeLabel}>Serving Size (g):</Text>
                <TextInput
                  style={[styles.servingSizeInput, {
                    borderWidth: 1,
                    borderColor: Color.light.tint,
                    borderRadius: 8,
                    padding: 10,
                    color: Color.light.text,
                    backgroundColor: 'transparent',
                    placeholderTextColor: 'rgba(255, 255, 255, 0.7)'
                  }]}
                  placeholder="Enter serving size"
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    setServingSize(value)
                  }}
                />
              </View>

              <View style={styles.nutritionInfoContainer}>
                <View style={styles.nutritionBox}>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                  <Text style={styles.nutritionValue}>{selectedAdditionFoodItem.calories}</Text>
                </View>

                <View style={styles.nutritionBox}>
                  <Text style={styles.nutritionLabel}>Protein (g)</Text>
                  <Text style={styles.nutritionValue}>{selectedAdditionFoodItem.proteinper100g}</Text>
                </View>

                <View style={styles.nutritionBox}>
                  <Text style={styles.nutritionLabel}>Carbs (g)</Text>
                  <Text style={styles.nutritionValue}>{selectedAdditionFoodItem.carbohydratesper100g}</Text>
                </View>

                <View style={styles.nutritionBox}>
                  <Text style={styles.nutritionLabel}>Fat (g)</Text>
                  <Text style={styles.nutritionValue}>{selectedAdditionFoodItem.fatper100g}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Color.light.background,
                padding: 12,

                borderRadius: 8,
                marginTop: 15,
                alignSelf: 'center',
                width: '100%',
              }}
              onPress={() => {
                // Add the food item with the specified serving size
                if (servingSize) {
                  addFoodToUser()
                } else {
                  // Alert if no serving size is entered
                  Alert.alert("Please enter a serving size");
                }
              }}
            >
              <Text style={{
                color: Color.light.text,
                fontWeight: '700',
                fontSize: 16,
                textAlign: 'center'
              }}>
                {!addFoodLoading ? "Add" :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                  </View>}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal >
      )
    }
  }
  const searchForFood = async (e) => {
    setSearchForFoodLoading(true);
    const text = e
    const res = await fetchSearchFood(authenticated, { name: text });
    if (res.success) {
      setFoods(res.meals);
    } else {
      Alert.alert("Error", res.error);
      setModalVisible(false)
    }
    setSearchForFoodLoading(false);
  }
  return (
    <>
      {
        error ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error</Text>
        </View> :
          <View style={{ flex: 1, paddingBottom: 10 }}>


            <View style={styles.header}>

              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    marginBottom: 3,
                    color: Color.light.tint,
                  }}
                >
                  Daily nutritional intake
                </Text>
                <Text style={{ fontWeight: "500", color: Color.light.tint }}>
                  {`${currentDate.toDateString()}`}
                </Text>
              </View>
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: 5,
                    color: Color.light.tint,
                  }}
                >
                  TODAY’S TOTAL
                </Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <View style={styles.vitamine}>
                    <Text style={{ fontWeight: "bold", fontSize: 8 }}>{prot}</Text>
                  </View>
                  <View style={styles.vitamine}>
                    <Text style={{ fontWeight: "bold", fontSize: 8 }}>{kcal}</Text>
                  </View>
                  <View style={styles.vitamine}>
                    <Text style={{ fontWeight: "bold", fontSize: 8 }}>{carb}</Text>
                  </View>
                  <View style={styles.vitamine}>
                    <Text style={{ fontWeight: "bold", fontSize: 8 }}>{fats}</Text>
                  </View>
                </View>

                <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Text style={{ color: Color.light.tint, fontSize: 10 }}>prot</Text>
                  <Text style={{ color: Color.light.tint, fontSize: 10 }}>kcal</Text>
                  <Text style={{ color: Color.light.tint, fontSize: 10 }}>carb</Text>
                  <Text style={{ color: Color.light.tint, fontSize: 10 }}>fats</Text>
                </View>
              </View>
            </View>


            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{ color: Color.light.tint, fontWeight: "900", fontSize: 30 }}
                  onPress={goToPreviousDay}
                >
                  &lt;
                </Text>
              </TouchableOpacity>
              {currentDate.getDate() == new Date().getDate() ? (
                <Text style={{ fontSize: 15, fontWeight: "700" }}>Today meals</Text>
              ) : (
                <Text style={{ fontSize: 15, fontWeight: "700" }}>
                  Your menu for day : {currentDate.toDateString()}
                </Text>
              )}
              <TouchableOpacity>
                <Text
                  style={{ color: Color.light.tint, fontWeight: "900", fontSize: 30 }}
                  onPress={goToNextDay}
                >
                  &gt;
                </Text>
              </TouchableOpacity>
            </View>



            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                  {meals ? meals.map((e) => (
                    <Meal key={e.id} data={e} onDlate={delateMeal} />
                  )) : <View></View>}
                </ScrollView>



                <TouchableOpacity
                  style={{ ...styles.button }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={{ fontWeight: "700", color: Color.light.tint }}>
                    Add a new meal
                  </Text>
                </TouchableOpacity>
              </View>)}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={{ ...styles.modeleContent, height: "80%" }}>
                  <TextInput
                    placeholder="Search for food"
                    style={{
                      backgroundColor: Color.light.tint,
                      borderRadius: 5,
                      marginBottom: 30,
                      padding: 10,
                      color: Color.light.background,
                      borderRadius: 10,
                    }}
                    onChangeText={(e) => {
                      searchForFood(e)
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      borderColor: Color.light.tint,
                      borderRadius: 50,
                      margin: 5,
                    }}
                    onPress={() => setModalVisibleFood(true)}
                  >
                  </TouchableOpacity>

                  {
                    searchForFoodLoading ?
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" />
                      </View> :
                      <FlatList
                        data={foods}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        style={{ height: "100%" }}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        renderItem={({ item }) => (
                          <View style={{
                            position: 'relative',
                            backgroundColor: Color.light.tint,
                            paddingVertical: 6,
                            paddingHorizontal: 10,
                            borderRadius: 10

                          }}>
                            <TouchableOpacity onPress={
                              () => {
                                toggleAdditionModal(item)
                                console.log(item)
                              }
                            }>
                              <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                                  <Text style={{ fontWeight: '800', width: "100", ...styles.car }}>{item.foodname}</Text>
                                  <Text style={{ fontWeight: '800', width: "100", ...styles.car }}>
                                    {
                                      item.status === 'verified' ? (
                                        <MaterialIcons name="verified" size={18} color="orange" />
                                      ) : item?.status === 'pending' ? (
                                        <MaterialIcons name="verified" size={18} color="gray" />
                                      ) : item.createdBy === userId ? (
                                        <MaterialIcons name="person" size={18} color="red" />
                                      ) : (
                                        <MaterialIcons name="gpp-maybe" size={18} color="red" />
                                      )
                                    }
                                  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexGrow: 1, padding: 10 }}>
                                  <View style={styles.box}>
                                    <Text style={styles.car}>Protein</Text>
                                    <Text style={styles.car}>{item.proteinper100g}</Text>
                                  </View>
                                  <View style={styles.box}>
                                    <Text style={styles.car}>Kcal</Text>
                                    <Text style={styles.car}>{item.calories}</Text>
                                  </View>
                                  <View style={styles.box}>
                                    <Text style={styles.car}>Carbs</Text>
                                    <Text style={styles.car}>{item.carbohydratesper100g}</Text>
                                  </View>
                                  <View style={styles.box}>
                                    <Text style={styles.car}>Fats</Text>
                                    <Text style={styles.car}>{item.fatper100g}</Text>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>

                        )}
                      />
                  }


                  <TouchableOpacity style={{ ...styles.button, backgroundColor: Color.light.tint, color: Color.light.text, margin: 0 }}
                    onPress={() => {
                      setCustomFoodModalVisible(true)
                    }}
                  >
                    <Text style={{ fontWeight: "700", color: Color.light.text }}>
                      Create custom food
                    </Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: Color.light.tint, color: Color.light.background, margin: 0 }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{ fontWeight: "700", color: Color.light.text }}>
                      Close
                    </Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
              style={[
                styles.foodItem,
                { marginTop: 20, backgroundColor: Color.light.background },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: 600,
                  color: Color.light.tint,
                  borderColor: Color.light.tint,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  if (0 == 0) {
                    Alert.alert("select a food !");
                  } else {
                    createMeal();
                  }
                }}
              >
                create a meals
              </Text>
            </TouchableOpacity> */}
                  {
                    renderFoodAdditionModal()
                  }

                </View>
              </View>
            </Modal>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisibleFood}
              onRequestClose={() => setModalVisibleFood(false)}
            >
              <View
                style={[
                  styles.modalBackground,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <View
                  style={{
                    backgroundColor: Color.light.background,
                    padding: 10,
                    width: "90%",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 25,
                      color: Color.light.tint,
                      fontWeight: "600",
                      letterSpacing: 2,
                    }}
                  >
                    NEW FOOD
                  </Text>
                  <TextInput
                    placeholder="Name of Food"
                    style={styles.FoodInput}
                    value={nameFood}
                    onChangeText={(e) => setNameFood(e)}
                  />
                  <View
                    style={{ flexDirection: "row", justifyContent: "space-between" }}
                  >
                    <TextInput
                      style={styles.foodVitamineInput}
                      placeholder="kcal"
                      value={nbKcal}
                      onChangeText={(e) => setNbKcal(e)}
                    />
                    <TextInput
                      style={styles.foodVitamineInput}
                      placeholder="protein (g)"
                      value={nbProt}
                      onChangeText={(e) => setNbProt(e)}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.foodVitamineInput}
                      placeholder="fats(g)"
                      value={nbFat}
                      onChangeText={(e) => setNbFat(e)}
                    />
                    <TextInput
                      style={styles.foodVitamineInput}
                      placeholder="carb(g)"
                      value={nbCarbs}
                      onChangeText={(e) => setNbCarbs(e)}
                    />
                  </View>
                  <TouchableOpacity style={styles.button} onPress={() => AddFood()}>
                    <Text
                      style={{
                        fontWeight: "700",
                        borderRadius: 5,
                        borderColor: Color.light.tint,
                        borderWidth: 2,
                        padding: 10,
                      }}
                    >
                      Add Food
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={customFoodModalVisible}
              onRequestClose={() => setCustomFoodModalVisible(false)}
            >
              <View style={{ ...styles.modalBackground, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ ...styles.modeleContent, backgroundColor: Color.light.background }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: Color.light.tint }}>Add Custom Food</Text>
                    <TouchableOpacity onPress={() => setCustomFoodModalVisible(false)}>
                      <MaterialIcons name="close" size={24} color={Color.light.tint} />
                    </TouchableOpacity>
                  </View>

                  <TextInput
                    placeholder="Food Name"
                    style={styles.FoodInput}
                    value={nameFood}
                    onChangeText={(e) => setNameFood(e)}
                  />

                  <View style={{ marginVertical: 10 }}>
                    <TextInput
                      style={styles.foodVitamineInput}
                      placeholder="Calories (per 100g)"
                      keyboardType="numeric"
                      value={nbKcal.toString()}
                      onChangeText={(e) => setNbKcal(e)}
                    />

                    <TextInput
                      style={styles.foodVitamineInput}
                      placeholder="Protein (g per 100g)"
                      keyboardType="numeric"
                      value={nbProt.toString()}
                      onChangeText={(e) => setNbProt(e)}
                    />

                    <TextInput
                      style={styles.foodVitamineInput}
                      placeholder="Carbs (g per 100g)"
                      keyboardType="numeric"
                      value={nbCarbs.toString()}
                      onChangeText={(e) => setNbCarbs(e)}
                    />

                    <TextInput
                      style={styles.foodVitamineInput}
                      placeholder="Fat (g per 100g)"
                      keyboardType="numeric"
                      value={nbFat.toString()}
                      onChangeText={(e) => setNbFat(e)}
                    />
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity
                      style={[styles.button, { flex: 1, marginRight: 5 }]}
                      onPress={() => setCustomFoodModalVisible(false)}
                    >
                      <Text style={{
                        fontWeight: "700",
                        color: Color.light.tint,
                        textAlign: 'center',
                        borderRadius: 5,
                        borderColor: Color.light.tint,
                        borderWidth: 2,
                        padding: 10,
                      }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, { flex: 1, marginLeft: 5 }]}
                      onPress={() => {
                        console.log('Adding custom food:', {
                          name: nameFood,
                          calories: nbKcal,
                          protein: nbProt,
                          carbs: nbCarbs,
                          fat: nbFat
                        });
                        AddFood()
                      }}
                    >
                      <Text style={{
                        fontWeight: "700",
                        color: Color.light.tint,
                        textAlign: 'center',
                        borderRadius: 5,
                        borderColor: Color.light.tint,
                        borderWidth: 2,
                        padding: 10,
                      }}>
                        Add Food
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    height: "fit",
    backgroundColor: Color.light.background,
    padding: 20,
  },
  vitamine: {
    backgroundColor: Color.light.tint,
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    color: Color.light.tint,
    backgroundColor: Color.light.background,
    margin: "auto",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: Color.light.tintLowOpacity,
    padding: (70, 30),
  },
  modeleContent: {
    padding: 20,
    backgroundColor: Color.light.background,
    borderRadius: 20,
  },
  foodItem: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    margin: 5,
    width: '95%',
    borderRadius: 10
  },
  selectedFood: {
    backgroundColor: "#ffa726", // تغيير اللون عند التحديد
  },
  FoodInput: {
    backgroundColor: Color.light.tint,
    marginTop: 10,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  foodVitamineInput: {
    backgroundColor: Color.light.tint,
    width: "23%",
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  car: {
    fontSize: 12,
    color: Color.dark,
    textAlign: 'center',
    fontWeight: "700",
  },
  box: {
    backgroundColor: Color.light.background,
    margin: 2,
    padding: 4,
    borderRadius: 5,
    fontWeight: "800",
    width: 56,
  }
});
