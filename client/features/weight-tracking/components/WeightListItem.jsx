import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "@/components/ui/Button";

export default function WeightListItem({ item, colors, onUpdate, onDelete }) {
  return (
    <View style={[styles.listItem, { backgroundColor: colors.tintLighter, alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }]}>
      <View style={{ flexDirection: 'column', gap: 4 }}>
        <Text style={[styles.listItemText, { color: colors.text }]}>
          Date: {new Date(item.creationdate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </Text>
        <Text style={[styles.listItemText, { color: colors.text }]}>
          Weight: {item.weight} {item.unit}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button
          onClick={() => onUpdate(item)}
          icon="pencil"
          styles={{ width: 30, height: 30, padding: 0, margin: 0 }}
        />
        <Button
          onClick={() => onDelete(item.id)}
          icon="delete"
          styles={{ width: 30, height: 30, padding: 0, margin: 0 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
  listItemText: {
    fontSize: 16,
  },
});
