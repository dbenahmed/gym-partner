import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import SplashScreen from "@/components/ui/SplashScreen";
import useAuth from "@/context/authContext";
import useThemeContext from "@/context/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import routesLinks from "@/constants/routes.ts";
import { validateUsername, validateName } from "@/utils/validation.ts";

import PageButton from "@/features/profile/components/PageButton";
import EditProfileModal from "@/features/profile/components/EditProfileModal";
import { fetchUserProfile, fetchUpdateProfile } from "@/features/profile/api/profileApi";

export default function Profile() {
  const { colors, theme, toggleTheme, deviceTheme } = useThemeContext();

  const handleThemeChange = (theTheme) => {
    toggleTheme(theTheme);
  };

  const router = useRouter();

  const [visibleThemeMenu, setVisibleThemeMenu] = useState(false);

  const toggleThemeMenu = () => {
    setVisibleThemeMenu(prev => !prev);
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      changeThemeButton: {
        backgroundColor: theme === "device" ? deviceTheme === "dark" ? colors.tint : colors.tintLighter : theme === "dark" ? colors.tint : colors.tintLighter,
      },
      container: {
        flex: 1,
        backgroundColor: "transparent",
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
      themeMenuContainer: {
        borderRadius: 16,
        position: 'absolute', 
        backgroundColor: colors.tintLighter, 
        top: 110, 
        left: 45, 
        right: 45, 
        padding: 10, 
        zIndex: 1000,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
      }
    });
  }, [colors, theme, deviceTheme]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingSaving, setLoadingSaving] = useState(false);

  const { authenticated, logout } = useAuth();

  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const { success, data, message } = await fetchUserProfile(authenticated);
      if (success) {
        setUserInfo({
          username: data.username,
          firstName: data.firstname,
          lastName: data.lastname,
        });
      } else {
        Alert.alert("Error", message || "Failed to fetch user profile");
        setError(new Error(message));
      }
      setLoading(false);
    };
    loadProfile();
  }, [authenticated]);

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

      const body = {
        username,
        firstname: firstName,
        lastname: lastName,
      };

      const { success, message } = await fetchUpdateProfile(authenticated, body);

      if (!success) {
        Alert.alert("Error", message || "Failed to update profile");
        return;
      }

      Alert.alert("Success", "Profile updated successfully");
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
        <TouchableOpacity style={[styles.logoutButton, styles.smallButton]} onPress={logout}>
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
              <View style={styles.themeMenuContainer}>
                <TouchableOpacity
                  style={[styles.smallButton]}
                  onPress={() => handleThemeChange("dark")}
                >
                  <MaterialCommunityIcons
                    name="weather-night"
                    size={24}
                    color={theme === "device" ? deviceTheme === "dark" ? colors.tint : colors.text : theme === "dark" ? colors.tint : colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.smallButton]}
                  onPress={() => handleThemeChange("light")}
                >
                  <MaterialCommunityIcons
                    name="white-balance-sunny"
                    size={24}
                    color={theme === "device" ? deviceTheme === "dark" ? colors.tint : colors.text : theme === "dark" ? colors.tint : colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.smallButton]}
                  onPress={() => handleThemeChange("device")}
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

        <View style={styles.profileCard}>
          <Text style={styles.userName}>
            {userInfo.firstName || userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : "User"}
          </Text>
          <Text style={styles.userHandle}>@{userInfo.username}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoValue}>{userInfo.username}</Text>
            </View>
          </View>
          
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ gap: 10 }}
          >
            <PageButton icon="pen" title={"Edit Profile"} onPress={openEditModal} />
            <PageButton icon="scale-bathroom" title={"Track Body Weight"} onPress={() => {
              router.push({
                pathname: `${routesLinks.PROTECTED_PROFILE_BODY_WEIGHT_TRACKING}`,
              });
            }} />
          </ScrollView>
          <View>
            <Text style={{ color: colors.tint, fontSize: 16, textAlign: 'center', marginTop: 20 }}>
              You can edit your profile information by clicking the "Edit Profile" button above.
            </Text>
          </View>
        </View>
      </View>

      <EditProfileModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleSaveChanges}
        loadingSaving={loadingSaving}
        username={username}
        setUsername={setUsername}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
    </>
  );
}
