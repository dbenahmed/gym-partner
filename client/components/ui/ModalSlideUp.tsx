import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useThemeContext from "@/context/themeContext";

interface SlideDownModalProps {
  children?: React.ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  props: any;
}

export default function ModalSlideUp({
  children = null,
  isVisible,
  onClose,
  props,
}: SlideDownModalProps) {
  const { colors } = useThemeContext();

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end", // Anchor to bottom
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            width: "100%",
            height: "90%", // Take up 90% of screen height exactly like before
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                color: colors.tint,
                fontSize: 20,
              }}
            >
              {props.title ? props.title : "Test Modal"}
            </Text>
            {onClose && (
              <TouchableOpacity onPress={() => onClose()}>
                <MaterialIcons name="close" size={24} color={colors.red} />
              </TouchableOpacity>
            )}
          </View>

          {/* Content */}
          {children}
        </View>
      </View>
    </Modal>
  );
}
