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
} from "react-native";
import React from "react";
import food from "@/components/Food";
import Color from "@/constants/Color";
import { useState, useEffect } from "react";
import Meal from "../../../components/Meal";

const fetchUri = 'http://192.168.94.215:3232'

export default function mealsHome() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODQsImlhdCI6MTc0NDM2Mjg0NiwiZXhwIjoxNzQ0NDQ5MjQ2fQ.IXm3R9gYZSIOnIiTk4q34RIvyncQw7uE7RZJGGiIDL8'
  const [meals, setMeals] = useState([]/* [
    {
      "id": 53,
      "foodId": 81,
      "userId": 84,
      "creationdate": "2025-04-06 14:45:34.325628+00",
      "updateddate": "2025-04-06 14:45:34.325628+00",
      "description": null,
      "servingsizeG": 50,
      "date": "2025-06-04",
      "food": {
        "id": 81,
        "foodname": "Food Item 1",
        "description": "This is a description for food item 1",
        "calories": 100,
        "proteinper100g": 5,
        "carbohydratesper100g": 20,
        "fatper100g": 3,
        "saturatedfatper100g": 1,
        "transfat": 0,
        "fiber": 1,
        "sugar": 5,
        "sodium": 50,
        "cholesterol": 30,
        "brand": "Brand 1",
        "custom": true,
        "createdBy": 84,
        "creationdate": "2025-04-06 14:37:32.154+00",
        "updationdate": "2025-04-06 14:37:32.154+00",
        "likes": 1,
        "dislikes": 3,
        "status": "refused"
      }
    },
    {
      "id": 54,
      "foodId": 81,
      "userId": 84,
      "creationdate": "2025-04-06 14:46:03.327181+00",
      "updateddate": "2025-04-06 14:46:03.327181+00",
      "description": null,
      "servingsizeG": 120,
      "date": "2025-06-04",
      "food": {
        "id": 81,
        "foodname": "Food Item 1",
        "description": "This is a description for food item 1",
        "calories": 100,
        "proteinper100g": 5,
        "carbohydratesper100g": 20,
        "fatper100g": 3,
        "saturatedfatper100g": 1,
        "transfat": 0,
        "fiber": 1,
        "sugar": 5,
        "sodium": 50,
        "cholesterol": 30,
        "brand": "Brand 1",
        "custom": true,
        "createdBy": 84,
        "creationdate": "2025-04-06 14:37:32.154+00",
        "updationdate": "2025-04-06 14:37:32.154+00",
        "likes": 1,
        "dislikes": 3,
        "status": "refused"
      }
    },
    {
      "id": 55,
      "foodId": 81,
      "userId": 84,
      "creationdate": "2025-04-06 14:47:01.049899+00",
      "updateddate": "2025-04-06 14:47:01.049899+00",
      "description": null,
      "servingsizeG": 120,
      "date": "2025-06-04",
      "food": {
        "id": 81,
        "foodname": "Food Item 1",
        "description": "This is a description for food item 1",
        "calories": 100,
        "proteinper100g": 5,
        "carbohydratesper100g": 20,
        "fatper100g": 3,
        "saturatedfatper100g": 1,
        "transfat": 0,
        "fiber": 1,
        "sugar": 5,
        "sodium": 50,
        "cholesterol": 30,
        "brand": "Brand 1",
        "custom": true,
        "createdBy": 84,
        "creationdate": "2025-04-06 14:37:32.154+00",
        "updationdate": "2025-04-06 14:37:32.154+00",
        "likes": 1,
        "dislikes": 3,
        "status": "refused"
      }
    },
    {
      "id": 56,
      "foodId": 81,
      "userId": 84,
      "creationdate": "2025-04-06 14:47:11.916949+00",
      "updateddate": "2025-04-06 14:47:11.916949+00",
      "description": "the added mea2222332",
      "servingsizeG": 120,
      "date": "2025-06-04",
      "food": {
        "id": 81,
        "foodname": "Food Item 1",
        "description": "This is a description for food item 1",
        "calories": 100,
        "proteinper100g": 5,
        "carbohydratesper100g": 20,
        "fatper100g": 3,
        "saturatedfatper100g": 1,
        "transfat": 0,
        "fiber": 1,
        "sugar": 5,
        "sodium": 50,
        "cholesterol": 30,
        "brand": "Brand 1",
        "custom": true,
        "createdBy": 84,
        "creationdate": "2025-04-06 14:37:32.154+00",
        "updationdate": "2025-04-06 14:37:32.154+00",
        "likes": 1,
        "dislikes": 3,
        "status": "refused"
      }
    },
    {
      "id": 59,
      "foodId": 81,
      "userId": 84,
      "creationdate": "2025-04-09 12:54:50.363356+00",
      "updateddate": "2025-04-09 12:54:50.363356+00",
      "description": "the added mealsssssssss",
      "servingsizeG": 120,
      "date": "2025-06-04",
      "food": {
        "id": 81,
        "foodname": "Food Item 1",
        "description": "This is a description for food item 1",
        "calories": 100,
        "proteinper100g": 5,
        "carbohydratesper100g": 20,
        "fatper100g": 3,
        "saturatedfatper100g": 1,
        "transfat": 0,
        "fiber": 1,
        "sugar": 5,
        "sodium": 50,
        "cholesterol": 30,
        "brand": "Brand 1",
        "custom": true,
        "createdBy": 84,
        "creationdate": "2025-04-06 14:37:32.154+00",
        "updationdate": "2025-04-06 14:37:32.154+00",
        "likes": 1,
        "dislikes": 3,
        "status": "refused"
      }
    }
  ] */);


  useEffect(() => {
    console.log('starting')
    const run = async () => {
      const dateStr = new Date('2025-06-04').toISOString().split('T')[0]
      const url = `${fetchUri}/meals?date=${dateStr}`
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const json = await res.json()
      console.log(json)
      setMeals(json.data)
    }
    run()
  }, []);


  const [foods, setFoods] = useState([
    {
      "id": 81,
      "foodname": "Food Item 1",
      "description": "This is a description for food item 1",
      "calories": 100,
      "proteinper100g": 5,
      "carbohydratesper100g": 20,
      "fatper100g": 3,
      "saturatedfatper100g": 1,
      "transfat": 0,
      "fiber": 1,
      "sugar": 5,
      "sodium": 50,
      "cholesterol": 30,
      "brand": "Brand 1",
      "custom": true,
      "createdBy": 84,
      "creationdate": "2025-04-06 14:37:32.154+00",
      "updationdate": "2025-04-06 14:37:32.154+00",
      "likes": 1,
      "dislikes": 3,
      "status": "refused"
    },
    {
      "id": 82,
      "foodname": "Food Item 2",
      "description": "This is a description for food item 2",
      "calories": 110,
      "proteinper100g": 6,
      "carbohydratesper100g": 22,
      "fatper100g": 4,
      "saturatedfatper100g": 2,
      "transfat": 1,
      "fiber": 2,
      "sugar": 7,
      "sodium": 55,
      "cholesterol": 31,
      "brand": "Brand 2",
      "custom": false,
      "createdBy": null,
      "creationdate": "2025-04-06 14:37:32.154+00",
      "updationdate": "2025-04-06 14:37:32.154+00",
      "likes": 6,
      "dislikes": 0,
      "status": "pending"
    },
    {
      "id": 83,
      "foodname": "Food Item 3",
      "description": "This is a description for food item 3",
      "calories": 120,
      "proteinper100g": 7,
      "carbohydratesper100g": 24,
      "fatper100g": 5,
      "saturatedfatper100g": 3,
      "transfat": 2,
      "fiber": 3,
      "sugar": 9,
      "sodium": 60,
      "cholesterol": 32,
      "brand": "Brand 3",
      "custom": true,
      "createdBy": 86,
      "creationdate": "2025-04-06 14:37:32.154+00",
      "updationdate": "2025-04-06 14:37:32.154+00",
      "likes": 1,
      "dislikes": 2,
      "status": "verified"
    },
    {
      "id": 84,
      "foodname": "Food Item 4",
      "description": "This is a description for food item 4",
      "calories": 130,
      "proteinper100g": 8,
      "carbohydratesper100g": 26,
      "fatper100g": 6,
      "saturatedfatper100g": 4,
      "transfat": 3,
      "fiber": 4,
      "sugar": 11,
      "sodium": 65,
      "cholesterol": 33,
      "brand": "Brand 4",
      "custom": false,
      "createdBy": null,
      "creationdate": "2025-04-06 14:37:32.154+00",
      "updationdate": "2025-04-06 14:37:32.154+00",
      "likes": 8,
      "dislikes": 8,
      "status": "refused"
    },
    {
      "id": 85,
      "foodname": "Food Item 5",
      "description": "This is a description for food item 5",
      "calories": 140,
      "proteinper100g": 9,
      "carbohydratesper100g": 28,
      "fatper100g": 7,
      "saturatedfatper100g": 5,
      "transfat": 4,
      "fiber": 5,
      "sugar": 13,
      "sodium": 70,
      "cholesterol": 34,
      "brand": "Brand 5",
      "custom": true,
      "createdBy": 88,
      "creationdate": "2025-04-06 14:37:32.154+00",
      "updationdate": "2025-04-06 14:37:32.154+00",
      "likes": 5,
      "dislikes": 2,
      "status": "pending"
    },
    {
      "id": 86,
      "foodname": "Food Item 6",
      "description": "This is a description for food item 6",
      "calories": 150,
      "proteinper100g": 10,
      "carbohydratesper100g": 30,
      "fatper100g": 8,
      "saturatedfatper100g": 6,
      "transfat": 5,
      "fiber": 6,
      "sugar": 15,
      "sodium": 75,
      "cholesterol": 35,
      "brand": "Brand 6",
      "custom": false,
      "createdBy": null,
      "creationdate": "2025-04-06 14:37:32.154+00",
      "updationdate": "2025-04-06 14:37:32.154+00",
      "likes": 3,
      "dislikes": 1,
      "status": "verified"
    }
  ]);

  //the content of vitamine in meals of this day
  const prot = 100;
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

  const [currentDate, setCurrentDate] = useState(new Date());
  /* 
    useEffect(() => {
      const date = new Date();
      setCurrentDate(date);
    }, []); */

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleFood, setModalVisibleFood] = useState(false);
  const [search, setSearch] = useState("");

  const [nameFood, setNameFood] = useState("");
  const [nbKcal, setNbKcal] = useState(0);
  const [nbProt, setNbProt] = useState(0);
  const [nbFat, setNbFat] = useState(0);
  const [nabCarbs, setNbCarbs] = useState(0);


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


  const AddFood = () => {
    if (
      nameFood.length == 0 ||
      nbFat == 0 ||
      nbKcal == 0 ||
      nbProt == 0 ||
      nabCarbs == 0
    ) {
      Alert.alert("there are a empty input");
    } else {
      setModalVisibleFood(false);
      nbFood++;
      const food = {
        id: nbFood,
        name: nameFood,
        kcal: nbKcal,
        protein: nbProt,
        fat: nbFat,
        carbs: nabCarbs,
      };
      setFoods([...foods, food]);
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

    const url = `${fetchUri}/meals/${id}`
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
  const delateFood = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
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


    // Close the modal
    toggleAdditionModal()
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
              <Text style={{ fontWeight: "700", color: Color.first }}>Addition Modal</Text>
              <TouchableOpacity style={styles.button} onPress={() => setAdditionModalVisible(false)}>
                <Text style={{ fontWeight: "700", color: Color.first }}>Close</Text>
              </TouchableOpacity>
              <View style={styles.servingSizeContainer}>
                <Text style={styles.servingSizeLabel}>Serving Size (g):</Text>
                <TextInput
                  style={[styles.servingSizeInput, {
                    borderWidth: 1,
                    borderColor: Color.first,
                    borderRadius: 8,
                    padding: 10,
                    color: '#fff',
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
                backgroundColor: Color.first,
                padding: 12,
                borderRadius: 8,
                marginTop: 15,
                alignSelf: 'center',
                width: '80%',
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
                color: Color.second,
                fontWeight: '700',
                fontSize: 16,
                textAlign: 'center'
              }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )
    }
  }
  const searchForFood = async () => {
    
  }
  return (
    <>
      <View style={styles.header}>

        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              marginBottom: 3,
              color: Color.first,
            }}
          >
            Daily nutritional intake
          </Text>
          <Text style={{ fontWeight: "500", color: Color.first }}>
            {`${currentDate.toDateString()}`}
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 5,
              color: Color.first,
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
            <Text style={{ color: Color.first, fontSize: 10 }}>prot</Text>
            <Text style={{ color: Color.first, fontSize: 10 }}>kcal</Text>
            <Text style={{ color: Color.first, fontSize: 10 }}>carb</Text>
            <Text style={{ color: Color.first, fontSize: 10 }}>fats</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        {meals ? meals.map((e) => (
          <Meal key={e.id} data={e} onDlate={delateMeal} />
        )) : <View></View>}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontWeight: "700", color: Color.first }}>
          Add a new meal
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modeleContent}>
            <TextInput
              placeholder="Search for food"
              style={{
                backgroundColor: Color.first,
                borderRadius: 5,
                marginBottom: 30,
              }}
              value={search}
              onChangeText={(e) => {
                searchForFood()
              }}
            />

            <TouchableOpacity
              style={{
                borderColor: Color.first,
                borderRadius: 50,
                margin: 5,
              }}
              onPress={() => setModalVisibleFood(true)}
            >
              <Text style={{ fontWeight: "900", color: Color.first }}>
                add new food
              </Text>
            </TouchableOpacity>
            <FlatList
              data={foods}
              contentContainerStyle={{ paddingBottom: 20 }}
              style={{ maxHeight: 400 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', position: 'relative', }}>
                  <TouchableOpacity onPress={
                    () => {
                      toggleAdditionModal(item)
                      console.log(item)
                    }
                  }>
                    <Text style={{ fontWeight: '800', maxWidth: "40%" }}>{item.foodname}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                      <View style={styles.box}>
                        <Text style={styles.car}>prot</Text>
                        <Text style={styles.car}>{item.proteinper100g}</Text>
                      </View>
                      <View style={styles.box}>
                        <Text style={styles.car}>Kcal</Text>
                        <Text style={styles.car}>{item.calories}</Text>
                      </View>
                      <View style={styles.box}>
                        <Text style={styles.car}>carbs</Text>
                        <Text style={styles.car}>{item.carbohydratesper100g}</Text>
                      </View>
                      <View style={styles.box}>
                        <Text style={styles.car}>fats</Text>
                        <Text style={styles.car}>{item.fatper100g}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ position: 'absolute', right: `10`, top: '10', backgroundColor: 'red', borderRadius: 10, width: 15 }}>
                    <Text style={{ fontSize: 15, color: Color.first, fontWeight: '600', textAlign: 'center' }} onPress={() => delateFood(item.id)}>X</Text>
                  </TouchableOpacity>
                </View>

              )}
            />
            {/* <TouchableOpacity
              style={[
                styles.foodItem,
                { marginTop: 20, backgroundColor: Color.second },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: 600,
                  color: Color.first,
                  borderColor: Color.first,
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
              backgroundColor: Color.second,
              padding: 10,
              width: "90%",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: Color.first,
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
                value={nabCarbs}
                onChangeText={(e) => setNbCarbs(e)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => AddFood()}>
              <Text
                style={{
                  fontWeight: "700",
                  color: Color.first,
                  borderRadius: 5,
                  borderColor: Color.first,
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
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    height: "10%",
    backgroundColor: Color.second,
    padding: 20,
  },
  vitamine: {
    backgroundColor: Color.first,
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    color: Color.first,
    backgroundColor: Color.second,
    margin: "auto",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: (70, 30),
  },
  modeleContent: {
    padding: 20,
    backgroundColor: Color.second,
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
    backgroundColor: Color.first,
    marginTop: 10,
    borderRadius: 4,
  },
  foodVitamineInput: {
    backgroundColor: Color.first,
    width: "23%",
    marginTop: 10,
    borderRadius: 5,
  },
  car: {
    fontSize: 9,
    color: Color.first,
    textAlign: 'center'

  },
  box: {
    backgroundColor: Color.second,
    margin: 2,
    padding: 4,
    borderRadius: 5,



  }
});
