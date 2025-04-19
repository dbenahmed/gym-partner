

import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function SessionsLayout() {
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
                }}
            />
        </Stack>
    );
}
