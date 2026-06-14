import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/features/explore/components/ButtonGroup";
import useThemeContext from "@/context/themeContext";

export default function ExerciseFilterModal({
  visible,
  onClose,
  onReset,
  onApply,
  filters,
  setFilters,
}: any) {
  const { colors } = useThemeContext();

  const handleSelect = (key: any, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.tint }]}>Search Preferences</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.red} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterScrollView} keyboardShouldPersistTaps="handled">
            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle, { color: colors.text }]}>Force</Text>
              <ButtonGroup
                options={[
                  { label: "Any", value: "any" },
                  { label: "Static", value: "static" },
                  { label: "Pull", value: "pull" },
                  { label: "Push", value: "push" },
                ]}
                selectedValue={filters.force}
                onSelect={(val: any) => handleSelect("force", val)}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle, { color: colors.text }]}>Level</Text>
              <ButtonGroup
                options={[
                  { label: "Any", value: "any" },
                  { label: "Beginner", value: "beginner" },
                  { label: "Intermediate", value: "intermediate" },
                  { label: "Expert", value: "expert" },
                ]}
                selectedValue={filters.level}
                onSelect={(val: any) => handleSelect("level", val)}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle, { color: colors.text }]}>Mechanic</Text>
              <ButtonGroup
                options={[
                  { label: "Any", value: "any" },
                  { label: "Isolation", value: "isolation" },
                  { label: "Compound", value: "compound" },
                ]}
                selectedValue={filters.mechanic}
                onSelect={(val: any) => handleSelect("mechanic", val)}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle, { color: colors.text }]}>Equipment</Text>
              <ButtonGroup
                options={[
                  { label: "Any", value: "any" },
                  { label: "Medicine Ball", value: "medicine ball" },
                  { label: "Dumbbell", value: "dumbbell" },
                  { label: "Body Only", value: "body only" },
                  { label: "Bands", value: "bands" },
                  { label: "Kettlebells", value: "kettlebells" },
                  { label: "Foam Roll", value: "foam roll" },
                  { label: "Cable", value: "cable" },
                  { label: "Machine", value: "machine" },
                  { label: "Barbell", value: "barbell" },
                  { label: "Exercise Ball", value: "exercise ball" },
                  { label: "E-Z Curl Bar", value: "e-z curl bar" },
                  { label: "Other", value: "other" },
                ]}
                selectedValue={filters.equipment}
                onSelect={(val: any) => handleSelect("equipment", val)}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle, { color: colors.text }]}>Primary Muscles</Text>
              <ButtonGroup
                options={[
                  { label: "Any", value: "any" },
                  { label: "Abdominals", value: "abdominals" },
                  { label: "Abductors", value: "abductors" },
                  { label: "Adductors", value: "adductors" },
                  { label: "Biceps", value: "biceps" },
                  { label: "Calves", value: "calves" },
                  { label: "Chest", value: "chest" },
                  { label: "Forearms", value: "forearms" },
                  { label: "Glutes", value: "glutes" },
                  { label: "Hamstrings", value: "hamstrings" },
                  { label: "Lats", value: "lats" },
                  { label: "Lower Back", value: "lower back" },
                  { label: "Middle Back", value: "middle back" },
                  { label: "Neck", value: "neck" },
                  { label: "Quadriceps", value: "quadriceps" },
                  { label: "Shoulders", value: "shoulders" },
                  { label: "Traps", value: "traps" },
                  { label: "Triceps", value: "triceps" },
                ]}
                selectedValue={filters.primaryMuscle}
                onSelect={(val: any) => handleSelect("primaryMuscle", val)}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle, { color: colors.text }]}>Secondary Muscles</Text>
              <ButtonGroup
                options={[
                  { label: "Any", value: "any" },
                  { label: "Abdominals", value: "abdominals" },
                  { label: "Abductors", value: "abductors" },
                  { label: "Adductors", value: "adductors" },
                  { label: "Biceps", value: "biceps" },
                  { label: "Calves", value: "calves" },
                  { label: "Chest", value: "chest" },
                  { label: "Forearms", value: "forearms" },
                  { label: "Glutes", value: "glutes" },
                  { label: "Hamstrings", value: "hamstrings" },
                  { label: "Lats", value: "lats" },
                  { label: "Lower Back", value: "lower back" },
                  { label: "Middle Back", value: "middle back" },
                  { label: "Neck", value: "neck" },
                  { label: "Quadriceps", value: "quadriceps" },
                  { label: "Shoulders", value: "shoulders" },
                  { label: "Traps", value: "traps" },
                  { label: "Triceps", value: "triceps" },
                ]}
                selectedValue={filters.secondaryMuscle}
                onSelect={(val: any) => handleSelect("secondaryMuscle", val)}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle, { color: colors.text }]}>Category</Text>
              <ButtonGroup
                options={[
                  { label: "Any", value: "any" },
                  { label: "Powerlifting", value: "powerlifting" },
                  { label: "Strength", value: "strength" },
                  { label: "Stretching", value: "stretching" },
                  { label: "Cardio", value: "cardio" },
                  { label: "Olympic Weightlifting", value: "olympic weightlifting" },
                  { label: "Strongman", value: "strongman" },
                  { label: "Plyometrics", value: "plyometrics" },
                ]}
                selectedValue={filters.category}
                onSelect={(val: any) => handleSelect("category", val)}
              />
            </View>
          </ScrollView>

          <View style={[styles.modalFooter, { borderTopColor: colors.tintLighter }]}>
            <Button text="Reset" type="secondary" onClick={onReset} />
            <Button text="Apply" type="primary" onClick={onApply} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filterScrollView: {
    maxHeight: 350,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
  },
});
