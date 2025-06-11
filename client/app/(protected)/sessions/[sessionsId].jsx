import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "@/context/authContext";
import Colors from "@/constants/Colors";
import { defaultUrl } from "@/constants/constants";
import { router } from "expo-router";
import { Stack } from "expo-router";
import useThemeContext from "@/context/themeContext";

export default function SessionDetails() {

  const { colors, theme } = useThemeContext();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text,
    },
    sessionHeader: {
      marginBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
      paddingBottom: 16,
    },
    sessionName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    sessionDate: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 8,
    },
    sessionNote: {
      fontSize: 14,
      color: colors.text,
      fontStyle: "italic",
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
      backgroundColor: colors.tintLighter,
      borderEndWidth: 2,
      borderStartWidth: 2,
      borderColor: colors.tint,
      shadowColor: "#000",
      borderRadius: 8,
      padding: 16,
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.text,
      marginTop: 2,
    },
    exercisesContainer: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    emptyMessage: {
      fontSize: 16,
      color: "#666",
      fontStyle: "italic",
      textAlign: "center",
      padding: 24,
    },
    exerciseCard: {
      backgroundColor: colors.tintLighter,
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      borderLeftWidth: 4,
      borderLeftColor: colors.tint,
    },
    exerciseName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12,
    },
    setsContainer: {
      marginTop: 8,
    },
    setRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    setNumber: {
      width: 60,
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
    },
    setDetail: {
      fontSize: 16,
      color: colors.text,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 32,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 8,
    },
    primaryButton: {
      backgroundColor: colors.tint,
    },
    dangerButton: {
      backgroundColor: colors.red,
    },
    actionButtonText: {
      color: "#fff",
      fontWeight: "bold",
      marginLeft: 8,
    },
  }), [colors]);

  const { sessionsId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [exercises, setExercises] = useState([]);
  const { authenticated } = useAuth();

  const deleteSession = async (sessionId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${defaultUrl}/workout/sessions/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authenticated}`,
          },
        }
      );

      if (!response.ok) {
        Alert.alert("Error", "Failed to delete session");
        setLoading(false);
        return;
      }
      const { success, message } = await response.json();
      if (!success) {
        Alert.alert("Error", message);
        setLoading(false);
        return;
      }
      router.back();
      setLoading(false);
      Alert.alert("Success", "Session deleted successfully");
    } catch (error) {
      console.error("Error deleting session:", error);
      Alert.alert("Error", "Failed to delete session");
    }
  };

  useEffect(() => {
    // In a real app, you would fetch the session data from the API
    // For now, we'll use mock data
    const fetchSessionDetails = async () => {
      setLoading(true);
      try {
        // In a real app, you would use something like:
        const response = await fetch(
          `${defaultUrl}/workout/sessions/${sessionsId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authenticated}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch session details");
        }

        const { success, message, session, exercises } = await response.json();
        console.log(session, exercises);
        if (!success) {
          Alert.alert("Error", message);
          setLoading(false);
          return;
        }
        console.log(exercises[0]);
        setSession(session);
        setExercises(exercises);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session details:", error);
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionsId]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen
          options={{
            title: "Session Details",
          }}
        />
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={styles.loadingText}>Loading session details...</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            title: "Session Details",
          }}
        />
        <ScrollView style={styles.container}>
          {/* Session Header */}
          <View style={styles.sessionHeader}>
            <Text style={styles.sessionName}>{session.name}</Text>
            <Text style={styles.sessionDate}>
              {formatDate(session.duedate)}
            </Text>
            {session.note && (
              <Text style={styles.sessionNote}>Note: {session.note}</Text>
            )}
          </View>

          {/* Session Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="dumbbell"
                size={24}
                color={colors.tint}
              />
              <Text style={styles.statValue}>{exercises.length}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>

            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={24}
                color={colors.tint}
              />
              <Text style={styles.statValue}>
                {session.starttime && session.endtime
                  ? `${new Date(session.endtime) - new Date(session.starttime)
                  }min`
                  : "N/A"}
              </Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>

            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="star"
                size={24}
                color={colors.tint}
              />
              <Text style={styles.statValue}>{session.rating || "N/A"}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Exercises List */}
          <View style={styles.exercisesContainer}>
            <Text style={styles.sectionTitle}>Exercises</Text>

            {exercises.length === 0 ? (
              <Text style={styles.emptyMessage}>
                No exercises recorded for this session
              </Text>
            ) : (
              exercises.map((exercise, index) => (
                <View key={exercise.id} style={styles.exerciseCard}>
                  <Text style={styles.exerciseName}>
                    {exercise.exercise.name}
                  </Text>

                  <View style={styles.setsContainer}>
                    {exercise.weight.map((weight, setIndex) => (
                      <View key={setIndex} style={styles.setRow}>
                        <Text style={styles.setNumber}>Set {setIndex + 1}</Text>
                        <Text style={styles.setDetail}>
                          {weight} {exercise.unit[setIndex]} ×{" "}
                          {exercise.reps[setIndex]} reps
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {/*  <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Edit Session</Text>
                    </TouchableOpacity>
 */}
            <TouchableOpacity
              style={[styles.actionButton, styles.dangerButton]}
              onPress={() => {
                // Handle delete session action
                deleteSession(session.id);
              }}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
