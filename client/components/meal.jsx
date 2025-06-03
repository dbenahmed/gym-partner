import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal, TextInput, ActivityIndicator } from "react-native";
import React from "react";
import Color from "@/constants/Colors.ts";
import { router } from "expo-router";
import { useState } from "react";
import useAuth from "@/context/authContext";



export default function Meal({ data, onDelete, onUpdate }) {
  console.log(data);


  const { userId } = useAuth();


  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updatedServingSize, setUpdatedServingSize] = useState(data.servingsizeG.toString());
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleUpdateMeal = () => {
    const newServingSize = parseFloat(updatedServingSize);

    if (isNaN(newServingSize) || newServingSize <= 0) {
      alert("Please enter a valid serving size.");
      return;
    }
    if (newServingSize === data.servingsizeG) {
      alert("No changes made to the serving size.");
      setUpdateModalVisible(false);
      return;
    }
    if (newServingSize > 1000) {
      alert("Serving size cannot exceed 1000g.");
      return;
    }
    if (newServingSize < 1) {
      alert("Serving size cannot be less than 1g.");
      return;
    }

    setUpdateLoading(true);
    onUpdate(data.id, {
      servingsizeG: newServingSize,
    }).finally(() => {
      setUpdateLoading(false);
      setUpdateModalVisible(false);
    });
  };

  const handleDelete = () => {
    setDeleting(true);
    onDelete(data.id)
      .then(() => setDeleting(false))
      .catch((err) => {
        console.log(err);
        setDeleting(false);
      });
  };

  const calculateNutrient = (valuePer100g, servingSize) => {
    return ((valuePer100g * servingSize) / 100).toFixed(1);
  };

  const calculateCalories = (caloriesPer100g, servingSize) => {
    return Math.round((caloriesPer100g * servingSize) / 100);
  };

  if (deleting) {
    return (
      <View style={[styles.parent, styles.loadingContainer]}>
        <ActivityIndicator size="small" color={Color.light.tint} />
        <Text style={styles.loadingText}>Deleting...</Text>
      </View>
    );
  }

  return (
    <>
      {/* Update Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle} numberOfLines={2}>
                  {data.food.foodname}
                </Text>
                <Text style={styles.modalSubtitle}>Update Serving Size</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setUpdateModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Food Description */}
            {data.food.description && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {data.food.description}
                </Text>
              </View>
            )}

            {/* Serving Size Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Serving Size (g):</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter serving size"
                keyboardType="numeric"
                value={updatedServingSize}
                onChangeText={setUpdatedServingSize}
                selectTextOnFocus
              />
            </View>

            {/* Nutrition Preview */}
            <View style={styles.nutritionPreviewContainer}>
              <Text style={styles.nutritionPreviewTitle}>
                Nutrition Preview
              </Text>

              <View style={styles.nutritionTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Nutrient</Text>
                  <Text style={styles.tableHeaderText}>Per 100g</Text>
                  <Text style={[styles.tableHeaderText, styles.totalColumn]}>Total</Text>
                </View>

                <View style={styles.tableDivider} />

                {[
                  {
                    name: 'Calories',
                    per100g: `${data.food.calories} kcal`,
                    total: `${updatedServingSize ? calculateCalories(data.food.calories, updatedServingSize) : 0} kcal`
                  },
                  {
                    name: 'Protein',
                    per100g: `${data.food.proteinper100g}g`,
                    total: `${updatedServingSize ? calculateNutrient(data.food.proteinper100g, updatedServingSize) : 0}g`
                  },
                  {
                    name: 'Carbs',
                    per100g: `${data.food.carbohydratesper100g}g`,
                    total: `${updatedServingSize ? calculateNutrient(data.food.carbohydratesper100g, updatedServingSize) : 0}g`
                  },
                  {
                    name: 'Fat',
                    per100g: `${data.food.fatper100g}g`,
                    total: `${updatedServingSize ? calculateNutrient(data.food.fatper100g, updatedServingSize) : 0}g`
                  }
                ].map((nutrient, index) => (
                  <View key={nutrient.name}>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>{nutrient.name}</Text>
                      <Text style={styles.tableCellCenter}>{nutrient.per100g}</Text>
                      <Text style={[styles.tableCellRight, styles.totalValue]}>
                        {nutrient.total}
                      </Text>
                    </View>
                    {index < 3 && <View style={styles.tableRowDivider} />}
                  </View>
                ))}
              </View>
            </View>

            {/* Update Button */}
            <TouchableOpacity
              style={[styles.updateButton, updateLoading && styles.updateButtonDisabled]}
              onPress={handleUpdateMeal}
              disabled={updateLoading}
            >
              {updateLoading ? (
                <ActivityIndicator size="small" color={Color.light.background} />
              ) : (
                <Text style={styles.updateButtonText}>Update Meal</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Main Meal Card */}
      <View style={styles.parent}>
        {/* Delete Button */}
        <Pressable
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </Pressable>

        {/* Food Info */}
        <View style={styles.foodInfo}>
          <Text style={styles.foodName} numberOfLines={2}>
            {data.food.foodname}
          </Text>
          {data.food.description && (
            <Text style={styles.foodDescription} numberOfLines={2}>
              {data.food.description}
            </Text>
          )}
          <View>
            <Text style={styles.servingSize}>
              Serving: {data.servingsizeG}g
            </Text>
            {data.food.createBy === userId && (
              <Text style={styles.servingSize}>
                Serving: {data.servingsizeG}g
              </Text>
            )}
          </View>
        </View>


        {/* Nutrition Cards */}
        <View style={styles.nutritionContainer}>
          {[
            {
              label: 'Protein',
              value: `${calculateNutrient(data.food.proteinper100g, data.servingsizeG)}`,
              unit: 'g',
              color: '#4ECDC4'
            },
            {
              label: 'Calories',
              value: `${calculateCalories(data.food.calories, data.servingsizeG)}`,
              unit: 'Cal',
              color: '#FF6B6B'
            },

            {
              label: 'Carbs',
              value: `${calculateNutrient(data.food.carbohydratesper100g, data.servingsizeG)}`,
              unit: 'g',
              color: '#45B7D1'
            },
            {
              label: 'Fat',
              value: `${calculateNutrient(data.food.fatper100g, data.servingsizeG)}`,
              unit: 'g',
              color: '#FFA07A'
            }
          ].map((nutrition) => (
            <View key={nutrition.label} style={[styles.nutritionCard, { backgroundColor: nutrition.color }]}>
              <Text style={styles.nutritionLabel}>{nutrition.label}</Text>
              <Text style={styles.nutritionValue}>
                {nutrition.value}
                <Text style={styles.nutritionUnit}>{nutrition.unit}</Text>
              </Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.detailButton]}
            onPress={() => {
              router.push(`/Explore/meals/${data.food.id}`);
            }}
          >
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.updateMealButton]}
            onPress={() => setUpdateModalVisible(true)}
          >
            <Text style={styles.updateMealButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Color.light.background,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },

  loadingText: {
    marginLeft: 8,
    color: Color.light.text,
    fontSize: 14,
    fontWeight: '500',
  },

  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  deleteButtonText: {
    color: '#FF4757',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
  },

  foodInfo: {
    marginBottom: 16,
    paddingRight: 32,
  },

  foodName: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.light.text,
    marginBottom: 4,
    lineHeight: 24,
  },

  foodDescription: {
    fontSize: 13,
    color: Color.light.text,
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 18,
  },

  servingSize: {
    fontSize: 12,
    fontWeight: '600',
    color: Color.light.tint,
    backgroundColor: Color.light.tintLighter || 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },

  nutritionCard: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  nutritionLabel: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },

  nutritionValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  nutritionUnit: {
    fontSize: 10,
    fontWeight: '500',
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Color.light.tint,
  },

  updateMealButton: {
    backgroundColor: Color.light.tint,
  },

  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Color.light.tint,
  },
  updateMealButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Color.light.background,

  },

  // Modal Styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Color.light.background,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  modalTitleContainer: {
    flex: 1,
    paddingRight: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.light.text,
    marginBottom: 4,
    lineHeight: 24,
  },

  modalSubtitle: {
    fontSize: 14,
    color: Color.light.text,
    opacity: 0.7,
    fontWeight: '500',
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonText: {
    fontSize: 24,
    color: Color.light.text,
    fontWeight: '300',
    lineHeight: 24,
  },

  descriptionContainer: {
    backgroundColor: Color.light.tintLighter || 'rgba(0, 0, 0, 0.05)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  descriptionText: {
    fontSize: 12,
    color: Color.light.text,
    opacity: 0.8,
    lineHeight: 16,
  },

  inputContainer: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.light.text,
    marginBottom: 8,
  },

  textInput: {
    borderWidth: 1,
    borderColor: Color.light.tint,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Color.light.text,
    backgroundColor: 'transparent',
  },

  nutritionPreviewContainer: {
    marginBottom: 20,
  },

  nutritionPreviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.light.text,
    marginBottom: 12,
  },

  nutritionTable: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  tableHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666666',
    flex: 1,
    textAlign: 'left',
  },

  totalColumn: {
    textAlign: 'right',
    color: Color.light.tint,
  },

  tableDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 8,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  tableRowDivider: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginVertical: 2,
  },

  tableCell: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.light.text,
    flex: 1,
  },

  tableCellCenter: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    flex: 1,
    textAlign: 'center',
  },

  tableCellRight: {
    fontSize: 12,
    flex: 1,
    textAlign: 'right',
  },

  totalValue: {
    fontWeight: '700',
    color: Color.light.tint,
  },

  updateButton: {
    backgroundColor: Color.light.tint,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateButtonDisabled: {
    opacity: 0.7,
  },

  updateButtonText: {
    color: Color.light.background,
    fontSize: 16,
    fontWeight: '600',
  },
});