import React, { useMemo } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import useThemeContext from "@/context/themeContext";

export default function EditProfileModal({
  visible,
  onClose,
  onSave,
  loadingSaving,
  username,
  setUsername,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) {
  const { colors } = useThemeContext();

  const styles = useMemo(() => {
    return StyleSheet.create({
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
      modalContent: {
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 25,
        maxHeight: '80%',
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.tint,
      },
      closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "transparent",
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeButtonText: {
        fontSize: 20,
        color: "red",
        fontWeight: '500',
      },
      inputContainer: {
        marginBottom: 20,
      },
      inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.tint,
        marginBottom: 8,
      },
      input: {
        borderWidth: 1,
        borderColor: colors.tint,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.text,
        backgroundColor: 'transparent',
      },
      modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 15,
      },
      cancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f8f8f8',
      },
      cancelButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
      },
      saveButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.tint,
      },
      saveButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: colors.background,
      },
    });
  }, [colors]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              {!loadingSaving ? (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              ) : (
                <View>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.saveButtonText}>Saving...</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
