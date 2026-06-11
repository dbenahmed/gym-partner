import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import ModalSlideUp from "@/components/ui/ModalSlideUp";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SplashScreen from "@/components/ui/SplashScreen";
import useThemeContext from "@/context/themeContext";
import useAuth from "@/context/authContext";
import { fetchCreateCustomMeal } from "@/features/meal-tracking/api/foodsApi";
import { validateName, validateAllNutrition } from "@/utils/validation.ts";

export default function CustomFoodModal({ isVisible, onClose, onFoodCreated }) {
  const { colors } = useThemeContext();
  const { authenticated } = useAuth();

  const [createFoodLoading, setCreateFoodLoading] = useState(false);

  const [nameFood, setNameFood] = useState("");
  const [nbKcal, setNbKcal] = useState("");
  const [nbProt, setNbProt] = useState("");
  const [nbFat, setNbFat] = useState("");
  const [nbCarbs, setNbCarbs] = useState("");

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
      if (onFoodCreated) onFoodCreated();
    } else {
      Alert.alert("Error", message);
    }
    setCreateFoodLoading(false);
    setNameFood("");
    setNbCarbs("");
    setNbFat("");
    setNbProt("");
    setNbKcal("");
  };

  return (
    <ModalSlideUp
      isVisible={isVisible}
      onClose={onClose}
      props={{ title: "Create Custom Food" }}
    >
      <View style={{ flex: 1 }}>
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
                value={nameFood}
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
              onPress={onClose}
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
      </View>
    </ModalSlideUp>
  );
}
