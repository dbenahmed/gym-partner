import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { useState, useContext } from "react";
import Color from "@/constants/Colors.ts";
import { defaultUrl } from "@/constants/constants.ts";
import { validateEmail, validateUsername, validateName } from "@/utils/validation.ts";
import SplashScreen from "@/components/SplashScreen";
import useAuth from "@/context/authContext";
import useThemeContext from "@/context/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import routesLinks from "@/constants/routes.ts";

function PageButton({ onPress = () => { console.warn("PageButton onPress not defined") }, title = "No Title", icon = null }) {
  const { colors, deviceTheme, theme } = useThemeContext();


  const styles = useMemo(() => {
    return StyleSheet.create({
      editButton: {
        backgroundColor: colors.tint,
        width: '100%',
        height: 45,
        paddingHorizontal: 25,
        alignItems: 'center',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'start',
        borderRadius: 25,
      },
      editButtonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: '500',
      },
    });
  }, [colors]);
  console.warn(deviceTheme)
  console.warn(theme)
  console.warn(colors)
  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}>
      {icon && <MaterialCommunityIcons
        name={icon}
        size={24}
        color={colors.background}
        style={{ marginRight: 10 }}
      />}
      <Text style={styles.editButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}



export default function Profile() {
  const { colors, theme, toggleTheme, deviceTheme } = useThemeContext();

  const handleThemeChange = (theTheme) => {
    toggleTheme(theTheme);
  }

  const router = useRouter();

  const [visibleThemeMenu, setVisibleThemeMenu] = useState(false);

  const toggleThemeMenu = () => {
    setVisibleThemeMenu(prev => !prev);
  }

  const styles = useMemo(() => {
    return StyleSheet.create({

      changeThemeButton: {
        backgroundColor: theme === "device" ? deviceTheme === "dark" ? colors.tint : colors.tintLighter : theme === "dark" ? colors.tint : colors.tintLighter,

      },
      container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: 50,
      },
      headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.tint,
        letterSpacing: 1,
      },
      smallButton: {
        paddingHorizontal: 15,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
      },
      logoutButton: {
        backgroundColor: colors.red,
      },
      logoutText: {
        color: "white",
        fontSize: 14,
        fontWeight: '600',
      },
      profileCard: {
        backgroundColor: theme === "dark" ? colors.tintLighter : colors.background,
        margin: 20,
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      },
      userInitials: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.tint,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
      },
      initialsText: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.background,
      },
      userName: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.tint,
        marginBottom: 5,
      },
      userHandle: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 30,
      },
      infoSection: {
        width: '100%',
        marginBottom: 30,
      },
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      },
      infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.tint,
        flex: 1,
      },
      infoValue: {
        fontSize: 16,
        color: colors.text,
        flex: 2,
        textAlign: 'right',
      },
      editButton: {
        backgroundColor: colors.tint,
        width: '100%',
        height: 45,
        paddingHorizontal: 30,
        alignItems: 'left',
        justifyContent: 'center',
        borderRadius: 25,
      },
      editButtonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: '600',
      },
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
    })
  }, [colors]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingSaving, setLoadingSaving] = useState(false);

  const { authenticated, userId, logout } = useAuth();

  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });



  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${defaultUrl}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authenticated}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        console.log('here')
        const { success, data, message } = await response.json();
        if (success) {
          console.log("data", data)
          setUserInfo({
            username: data.username,
            firstName: data.firstname,
            lastName: data.lastname,
          });
        } else {
          Alert.alert("Error", message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error);
        // Handle error (e.g., show an alert or set an error state)
        Alert.alert("Error", "Failed to fetch user profile");
        setLoading(false);
      }
    };
    // Fetch user profile data
    fetchUserProfile();
  }, []);



  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSaveChanges = async () => {
    try {
      setLoadingSaving(true);
      if (!validateUsername(username).success || !validateName(firstName).success || !validateName(lastName).success) {
        Alert.alert("Error", "Please enter valid information");
        return;
      }


      const response = await fetch(`${defaultUrl}/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticated}`,
        },
        body: JSON.stringify({
          username,
          firstname: firstName,
          lastname: lastName,
        }),
      });

      if (!response.ok) {
        Alert.alert("Error", "Failed to update profile");
        return;
      }
      const { success, message } = await response.json();
      if (!success) {
        Alert.alert("Error", message);
        return;
      }

      Alert.alert("Success", "Profile updated successfully");
      // Update the userInfo state with the new values
      setUserInfo({
        username: username.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      setVisible(false);
    } finally {
      setLoadingSaving(false);
    }
  };

  const openEditModal = () => {
    setUsername(userInfo.username);
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setVisible(true);
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <SplashScreen />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.tint, fontSize: 20 }}>Error</Text>
        <Text style={{ color: colors.tint, fontSize: 20 }}>{error.message}</Text>
        <TouchableOpacity style={{
          ...styles.logoutButton, ...styles.smallButton
        }} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={{ color: colors.tint, fontSize: 20 }}>Please try again later</Text>
        <Text style={{ color: colors.tint, fontSize: 20 }}>Or contact support</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { position: "relative" }]}>
          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity
            style={[styles.changeThemeButton, styles.smallButton]}
            onPress={toggleThemeMenu}
          >
            <MaterialCommunityIcons
              name={theme === "dark" ? "weather-night" : theme === "light" ? "white-balance-sunny" : "theme-light-dark"}
              size={24}
              color={theme === "device" ? deviceTheme === "dark" ? colors.background : colors.tint : theme === "dark" ? colors.background : colors.tint}
            />
          </TouchableOpacity>
          {
            visibleThemeMenu && (
              <View style={{
                borderRadius: 16,
                position: 'absolute', backgroundColor: colors.tintLighter, top: 110, left: 45, right: 45, padding: 10, zIndex: 1000,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                //drop shadow
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
              }}>

                <TouchableOpacity
                  style={[styles.smallButton]}
                  onPress={() => {
                    handleThemeChange("dark");
                  }}
                >
                  <MaterialCommunityIcons
                    name="weather-night"
                    size={24}
                    color={theme === "device" ? deviceTheme === "dark" ? colors.tint : colors.text : theme === "dark" ? colors.tint : colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.smallButton]}
                  onPress={() => {
                    handleThemeChange("light");
                  }}
                >
                  <MaterialCommunityIcons
                    name="white-balance-sunny"
                    size={24}
                    color={theme === "device" ? deviceTheme === "dark" ? colors.tint : colors.text : theme === "dark" ? colors.tint : colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.smallButton]}
                  onPress={() => {
                    handleThemeChange("device");
                  }}
                >
                  <MaterialCommunityIcons
                    name="theme-light-dark"
                    size={24}
                    color={theme === "device" ? deviceTheme === "dark" ? colors.tint : colors.text : theme === "dark" ? colors.tint : colors.text}
                  />
                </TouchableOpacity>

              </View>
            )

          }
          <TouchableOpacity style={[styles.logoutButton, styles.smallButton]} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/*  <View style={styles.userInitials}>
            <Text style={styles.initialsText}>
              {userInfo.firstName ? userInfo.firstName : ""} {userInfo.lastName ? userInfo.lastName : ""}
            </Text>
          </View> */}

          <Text style={styles.userName}>
            {userInfo.firstName || userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : "User"}
          </Text>
          <Text style={styles.userHandle}>@{userInfo.username}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoValue}>{userInfo.username}</Text>
            </View>
            {/* 
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>First Name</Text>
              <Text style={styles.infoValue}>{userInfo.firstName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Name</Text>
              <Text style={styles.infoValue}>{userInfo.lastName}</Text>
            </View>
 */}
            {/* <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userInfo.email ? userInfo.email : "None"}</Text>
            </View>
            */}
          </View>
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ gap: 10 }}
          >
            <PageButton icon="pen" title={"Edit Profile"} onPress={openEditModal} />
            <PageButton icon="scale-bathroom" title={"Track Body Weight"} onPress={() => {
              router.push(
                {
                  pathname: `${routesLinks.PROTECTED_PROFILE_BODY_WEIGHT_TRACKING}`,
                }
              );
            }} />

          </ScrollView>
          <View>
            <Text style={{ color: colors.tint, fontSize: 16, textAlign: 'center', marginTop: 20 }}>
              You can edit your profile information by clicking the "Edit Profile" button above.
            </Text>
          </View>

        </View>

      </View>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
              >
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

            {/* <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View> */}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}
              >
                {
                  !loadingSaving ? (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  ) : (
                    <View>
                      <ActivityIndicator size="small" color="#fff" />
                      <Text style={styles.saveButtonText}>Saving...</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
