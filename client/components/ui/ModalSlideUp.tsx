import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Color from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface SlideDownModalProps {
  children?: React.ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  customFoodModalVisible: boolean;
  props: any; // Add this line to include props
}

export default function ModalSlideUp({
  children,
  isVisible,
  onClose,
  props,
}: SlideDownModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose ? onClose : () => {}}
      swipeDirection="down"
      onSwipeComplete={onClose ? onClose : () => {}}
      style={{ margin: 0 }}
      avoidKeyboard={true}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: Color.light.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
            height: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.2,
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
                color: Color.light.text,
                fontSize: 20,
              }}
            >
              {props.title ? props.title : "Modal Has No Title"}
            </Text>
            {onClose && (
              <TouchableOpacity onPress={() => onClose()}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={Color.light.text}
                />
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
