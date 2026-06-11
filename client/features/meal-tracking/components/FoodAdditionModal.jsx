import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import ModalSlideUp from "@/components/ui/ModalSlideUp";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useThemeContext from "@/context/themeContext";
import useAuth from "@/context/authContext";
import { fetchAddFoodToUser } from "@/features/meal-tracking/api/mealsApi";

export default function FoodAdditionModal({
  isVisible,
  onClose,
  foodItem,
  currentDate,
  onFoodAdded,
}) {
  const { colors } = useThemeContext();
  const { authenticated } = useAuth();

  const [servingSize, setServingSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const addFoodToUser = async () => {
    if (!foodItem) {
      Alert.alert("Please select a food item");
      return;
    }

    if (isNaN(parseInt(servingSize))) {
      Alert.alert("Please enter a valid serving size");
      return;
    }

    if (parseInt(servingSize) <= 0 || servingSize.length === 0) {
      Alert.alert("Please enter a serving size");
      return;
    }

    if (parseInt(servingSize) > 1000) {
      Alert.alert("Serving size too large");
      return;
    }

    setLoading(true);

    const res = await fetchAddFoodToUser(
      currentDate.toISOString().split("T")[0],
      foodItem.id,
      foodItem.description,
      parseInt(servingSize),
      authenticated
    );

    if (res.success) {
      Alert.alert("Food added successfully");
      setServingSize(0);
      onFoodAdded(); // This will close the modal and refresh meals
    } else {
      Alert.alert("Error", res.message);
    }
    setLoading(false);
  };

  if (!foodItem) return null;

  return (
    <ModalSlideUp
      isVisible={isVisible}
      onClose={onClose}
      props={{ title: foodItem.foodname }}
    >
      <View style={{ flex: 1 }}>
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
            {foodItem.description || "No description available"}
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
              fontSize: 13,
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
            value={servingSize ? servingSize.toString() : ""}
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

            {[
              { label: "Calories", per100: foodItem.calories, unit: "kcal" },
              { label: "Protein", per100: foodItem.proteinper100g, unit: "g" },
              { label: "Carbs", per100: foodItem.carbohydratesper100g, unit: "g" },
              { label: "Fat", per100: foodItem.fatper100g, unit: "g" },
            ].map((nutrient) => (
              <View key={nutrient.label}>
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
                    {nutrient.label}
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
                    {nutrient.per100}{nutrient.unit}
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
                      ? Math.round((nutrient.per100 * servingSize) / 100).toFixed(1)
                      : 0}
                    {nutrient.unit}
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.tintLighter,
                    marginVertical: 3,
                  }}
                />
              </View>
            ))}
          </View>

          {foodItem.brand && (
            <View style={{ marginTop: 6 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "500", color: colors.text }}>
                  Brand
                </Text>
                <Text style={{ fontWeight: "700", color: colors.tint }}>
                  {foodItem.brand}
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
            onPress={addFoodToUser}
            disabled={loading}
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
              {!loading ? "Add Food" : "Adding..."}
            </Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={{ marginTop: 16, alignItems: "center" }}>
            <ActivityIndicator size="small" color={colors.tint} />
          </View>
        )}
      </View>
    </ModalSlideUp>
  );
}
