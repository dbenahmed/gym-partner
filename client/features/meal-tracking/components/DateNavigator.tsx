import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useThemeContext from "@/context/themeContext";

export default function DateNavigator({ currentDate, onPreviousDay, onNextDay }: any) {
  const { colors } = useThemeContext();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(currentDate);
  selectedDate.setHours(0, 0, 0, 0);

  const diffDays = Math.round((today.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24));

  let dateText = "";
  if (diffDays === 0) {
    dateText = "Today's meals";
  } else if (diffDays === 1) {
    dateText = "Yesterday's meals";
  } else if (diffDays === 2) {
    dateText = "Day before yesterday";
  } else if (diffDays < 3) {
    dateText = `${diffDays} days ago`;
  } else {
    dateText = currentDate.toDateString();
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 16,
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
      <TouchableOpacity onPress={onPreviousDay}>
        <Text
          style={{
            color: colors.tint,
            fontWeight: "900",
            fontSize: 30,
          }}
        >
          &lt;
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
        {dateText}
      </Text>

      {selectedDate.getTime() < today.getTime() ? (
        <TouchableOpacity onPress={onNextDay}>
          <Text
            style={{
              color: colors.tint,
              fontWeight: "900",
              fontSize: 30,
            }}
          >
            &gt;
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 30 }} />
      )}
    </View>
  );
}
