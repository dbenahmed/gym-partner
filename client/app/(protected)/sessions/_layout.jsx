

import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';



export default function SessionsLayout() {

    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.light.background,
                },
                headerTintColor: Colors.light.tint,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: Colors.light.background,
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Sessions",
                }}
            />
            <Stack.Screen
                name="newSession"
                options={{
                    title: "New Session",
                    presentation: "card",
                    headerLeft: () => (
                        <Pressable
                            onPress={() =>
                                Alert.alert('Confirm', 'Are you sure you want to go back? You will Lose All your Session Details!', [
                                    { text: 'Cancel', style: 'cancel' },
                                    { text: 'Yes', onPress: () => router.back() },
                                ])
                            }
                        >
                            <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                        </Pressable>
                    ),
                }}
            />
        </Stack>
    );

}
