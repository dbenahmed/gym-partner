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

export default function FoodSearchModal({ isVisible, onClose, onFoodSelect, onCustomFoodPress }) {
  const { colors } = useThemeContext();
  const { authenticated, userId } = useAuth();

  const [searchForFoodLoading, setSearchForFoodLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [mine, setMine] = useState(false);



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



  return (
    <ModalSlideUp
      isVisible={isVisible}
      onClose={onClose}
      props={{
        title: "Add Food",
      }}
    >
      <View style={{ flex: 1 }}>
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
                onPress={onCustomFoodPress}
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
      </View>
    </ModalSlideUp>
  );
}
