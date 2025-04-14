import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import ROUTES from "@/constants/routes";
import { router } from "expo-router";
import { fetchGetUserCollections } from "@/lib/api";
import useAuth from "@/app/contex/authcontex";
import { ActivityIndicator } from "react-native";
import Colors from "@/constants/Colors";


type Collection = {
  collectionId: number;
  title: string;
  description: string;
};

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const { authenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
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
    run();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(item) => item.collectionId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light.background,
                borderRadius: 8,
                padding: 16,
                marginHorizontal: 16,
                marginVertical: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
              onPress={() => Alert.alert(item.title)}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}
              >
                {item.title}
              </Text>
              <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Collections;
