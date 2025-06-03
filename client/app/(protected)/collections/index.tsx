import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { fetchGetUserCollections, fetchCreateCollection } from "@/lib/api";
import useAuth from "@/app/contex/authcontex";
import { ActivityIndicator } from "react-native";
import Colors from "@/constants/Colors";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { validateName } from "@/utils/validation";

type Collection = {
  collectionId: number;
  title: string;
  description: string;
};

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const { authenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  const handleCreateCollection = async () => {
    if (validateName(collectionTitle).success === false) {
      Alert.alert("Invalid title", validateName(collectionTitle).message);
      return;
    }

    if (validateName(collectionDescription).success === false) {
      Alert.alert(
        "Invalid description",
        validateName(collectionDescription).message
      );
      return;
    }
    const { success, message, data } = await fetchCreateCollection(
      authenticated,
      {
        title: collectionTitle,
        description: collectionDescription,
      }
    );
    if (success) {
      Alert.alert("Collection created successfully");
      setIsModalVisible(false);
      setLoading(true);
      setCollectionTitle("");
      setCollectionDescription("");
      renderUserCollections();
      setLoading(false);
    } else {
      Alert.alert("Error creating collection", message);
      setIsModalVisible(false);
    }
  };

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const navigation = useNavigation();

  const renderUserCollections = async () => {
    const { success, collections, message } = await fetchGetUserCollections(
      authenticated
    );
    if (success) {
      setCollections(collections);
    } else {
      console.log("error getting collections", message);
      Alert.alert("Error getting collections", message);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      renderUserCollections();
    }, [])
  );

  return (
    <View style={{ height: "100%" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ height: "100%", paddingBottom: 16 }}>
          <FlatList
            style={{ flex: 1 }}
            data={collections}
            keyExtractor={(item) => item.collectionId.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                  console.log("item.collectionId", item.collectionId);
                  router.push(
                    {
                      pathname: `./${item.collectionId}`,
                      params: {
                        ...item,
                      },
                    },
                    {
                      relativeToDirectory: true,
                    }
                  );
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              toggleModal();
            }}
          >
            <Text style={styles.buttonText}>Create Collection</Text>
          </TouchableOpacity>

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  marginTop: 50,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  Create Collection
                </Text>

                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}
                >
                  Title
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                    fontSize: 16,
                  }}
                  placeholder="Enter collection title"
                  value={collectionTitle}
                  onChangeText={setCollectionTitle}
                />

                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}
                >
                  Description
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 24,
                    fontSize: 16,
                    textAlignVertical: "top",
                  }}
                  placeholder="Enter collection description"
                  value={collectionDescription}
                  onChangeText={setCollectionDescription}
                  multiline
                  numberOfLines={4}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ccc",
                      borderRadius: 8,
                      padding: 16,
                      flex: 1,
                      marginRight: 8,
                      alignItems: "center",
                    }}
                    onPress={toggleModal}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.light.tint,
                      borderRadius: 8,
                      padding: 16,
                      flex: 1,
                      marginLeft: 8,
                      alignItems: "center",
                    }}
                    onPress={handleCreateCollection}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      Create Collection
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: Colors.light.text,
    letterSpacing: 0.3,
  },
  cardDescription: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    opacity: 0.8,
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Collections;
