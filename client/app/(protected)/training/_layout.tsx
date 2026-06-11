

import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import useThemeContext from '@/context/themeContext';

export default function Layout() {


    const { colors } = useThemeContext();

    const router = useRouter();


    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.tint,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: colors.background,
                },
            }}
        >
            {/* ROOT SCREEN */}
            <Stack.Screen name="index"
                options={{
                    title: "Gym Tracking",
                }} />
            {/* Collections SCREEN */}
            <Stack.Screen name="collections/index"
                options={{
                    title: "My Collections",
                }} />
            {/* Collections SCREEN */}
            <Stack.Screen name="collections/[collectionId]/index"
                options={{
                    title: "Collection",
                }} />
            {/* Collections SCREEN */}
            <Stack.Screen name="collections/[collectionId]/[planId]/index"
                options={{
                    title: "Plan",
                }} />
            {/* Sessions SCREEN */}
            <Stack.Screen
                name="sessions/index"
                options={{
                    title: "Sessions",
                }} />

            <Stack.Screen
                name="sessions/newSession"
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
                            <Ionicons name="arrow-back" size={24} color={colors.tint} />
                        </Pressable>
                    ),
                }}
            />

        </Stack>
    );
}