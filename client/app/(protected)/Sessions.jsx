import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Sessions() {
    const [message, setMessage] = useState('Welcome to React Native!');

    const handlePress = () => {
        setMessage('You clicked the button!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{message}</Text>
            <Button title="Click Me" onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});
