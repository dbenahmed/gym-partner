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

import Meal from "@/components/meal";
import Color from "@/constants/Color";
import { useState, useEffect } from "react";
export default function mealsHome() {
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: "Breakfast Combo",
      foods: ["Eggs", "Milk", "Banana"],
      kcal: [155, 42, 89],
      protein: [13, 3.4, 1.1],
      fat: [11, 1, 0.3],
      carbs: [1.1, 5, 23],
    },
    {
      id: 2,
      name: "Chicken Rice Bowl",
      foods: ["Chicken", "Rice"],
      kcal: [165, 130],
      protein: [31, 2.7],
      fat: [3.6, 0.3],
      carbs: [0, 28],
    },
    {
      id: 3,
      name: "Burger Meal",
      foods: ["Burger", "Milk"],
      kcal: [295, 42],
      protein: [17, 3.4],
      fat: [14, 1],
      carbs: [30, 5],
    },
    {
      id: 4,
      name: "Pasta Delight",
      foods: ["Pasta", "Cheese"],
      kcal: [157, 402], // Assuming cheese has ~402 kcal
      protein: [5.8, 25],
      fat: [0.9, 33],
      carbs: [30, 1.3],
    },
    {
      id: 5,
      name: "Sweet Treat",
      foods: ["Chocolate", "Milk"],
      kcal: [546, 42],
      protein: [7.8, 3.4],
      fat: [31, 1],
      carbs: [61, 5],
    },
  ]);

  const [foods, setFoods] = useState([
    { id: 1, name: "Apple", kcal: 52, protein: 0.3, fat: 0.2, carbs: 14 },
    { id: 2, name: "Banana", kcal: 89, protein: 1.1, fat: 0.3, carbs: 23 },
    { id: 3, name: "Pizza", kcal: 266, protein: 11, fat: 10, carbs: 33 },
    { id: 4, name: "Burger", kcal: 295, protein: 17, fat: 14, carbs: 30 },
    { id: 5, name: "Rice", kcal: 130, protein: 2.7, fat: 0.3, carbs: 28 },
    { id: 6, name: "Chicken", kcal: 165, protein: 31, fat: 3.6, carbs: 0 },
    { id: 7, name: "Eggs", kcal: 155, protein: 13, fat: 11, carbs: 1.1 },
    { id: 8, name: "Milk", kcal: 42, protein: 3.4, fat: 1, carbs: 5 },
    { id: 9, name: "Chocolate", kcal: 546, protein: 7.8, fat: 31, carbs: 61 },
    { id: 10, name: "Pasta", kcal: 157, protein: 5.8, fat: 0.9, carbs: 30 },
  ]);

  //the content of vitamine in meals of this day
  const prot = parseFloat(
    meals
      .reduce((sum, meal) => {
        return sum + meal.protein.reduce((mealSum, kcal) => mealSum + kcal, 0);
      }, 0)
      .toFixed(1)
  );
  const kcal = parseFloat(
    meals
      .reduce((sum, meal) => {
        return sum + meal.kcal.reduce((mealSum, kcal) => mealSum + kcal, 0);
      }, 0)
      .toFixed(1)
  );
  const carb = parseFloat(
    meals
      .reduce((sum, meal) => {
        return sum + meal.carbs.reduce((mealSum, kcal) => mealSum + kcal, 0);
      }, 0)
      .toFixed(1)
  );
  const fats = parseFloat(
    meals
      .reduce((sum, meal) => {
        return sum + meal.fat.reduce((mealSum, kcal) => mealSum + kcal, 0);
      }, 0)
      .toFixed(1)
  );
  let nbMeals = 5;
  let nbFood = 10;
  //time

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Formats date based on device locale
    setCurrentDate(formattedDate);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleFood, setModalVisibleFood] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [search, setSearch] = useState("");

  const [nameFood, setNameFood] = useState("");
  const [nbKcal, setNbKcal] = useState(0);
  const [nbProt, setNbProt] = useState(0);
  const [nbFat, setNbFat] = useState(0);
  const [nabCarbs, setNbCarbs] = useState(0);

  const toggleFoodSelection = (food) => {
    setSelectedFoods(
      (prevSelected) =>
        prevSelected.includes(food)
          ? prevSelected.filter((item) => item !== food) // إزالة العنصر إذا كان موجودًا
          : [...prevSelected, food] // إضافة العنصر إذا لم يكن موجودًا
    );
  };
  const createMeal = () => {
    nbMeals++;
    setModalVisible(false);
    const newMeal = [...selectedFoods];
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

    setSelectedFoods([]);

    //meals.push(Meal);
    setMeals([...meals, Meal]);
  };

  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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

  const delateMeal = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };
  const delateFood = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };
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
            {currentDate}
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
        {meals.map((e) => (
          <Meal key={e.id} data={e} onDlate={delateMeal} />
        ))}
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
              onChangeText={(e) => setSearch(e)}
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
                + add new food
              </Text>
            </TouchableOpacity>
            <FlatList
              data={filteredFoods.length == 0 ? foods : filteredFoods}
              contentContainerStyle={{ paddingBottom: 20 }}
              style={{ maxHeight: 400 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{flexDirection:'row',position:'relative',}}>
                <TouchableOpacity
                  style={[
                    styles.foodItem,
                    selectedFoods.includes(item) && styles.selectedFood,
                    {flexDirection:'row',justifyContent:'space-between'}
                  ]}
                  onPress={() => toggleFoodSelection(item)}
                >
                  <Text style={{fontWeight:'800',maxWidth:"40%"}}>{item.name}</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                    <View style={styles.box}>
                      <Text style={styles.car}>prot</Text>
                      <Text style={styles.car}>{item.protein}</Text>
                    </View>
                    <View style={styles.box}>
                      <Text style={styles.car}>Kcal</Text>
                      <Text style={styles.car}>{item.kcal}</Text>
                    </View>
                    <View style={styles.box}>
                      <Text style={styles.car}>carbs</Text>
                      <Text style={styles.car}>{item.carbs}</Text>
                    </View>
                    <View style={styles.box}>
                      <Text style={styles.car}>fats</Text>
                      <Text style={styles.car}>{item.fat}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute',right:`10`,top:'10',backgroundColor:'red',borderRadius:10, width:15}}>
                  <Text style={{fontSize:15,color:Color.first,fontWeight:'600',textAlign:'center'}} onPress={()=>delateFood(item.id)}>X</Text>
                </TouchableOpacity>
                </View>
                
              )}
            />
            <TouchableOpacity
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
                  if (selectedFoods.length == 0) {
                    Alert.alert("select a food !");
                  } else {
                    createMeal();
                  }
                }}
              >
                create a meals
              </Text>
            </TouchableOpacity>
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
    width:'95%',
    borderRadius:10
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
  car:{
    fontSize:9,
    color:Color.first,
    textAlign:'center'

  },
  box:{
    backgroundColor: Color.second,
    margin:2,
    padding:4,
    borderRadius:5,
    
    

  }
});
