import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import {
    fetchWeights,
    fetchLogWeight,
    fetchUpdateWeight,
    fetchDeleteWeight,
} from "../api/weightApi";
import useAuth from "@/context/authContext";

export function useWeightData() {
    const { authenticated } = useAuth();
    const [weights, setWeights] = useState<any[]>([]);

    const loadWeights = useCallback(async () => {
        const { success, data, message } = await fetchWeights(authenticated);
        if (success) {
            setWeights(data);
        } else {
            Alert.alert('Error', message || 'Failed to fetch weights');
        }
    }, [authenticated]);

    useEffect(() => {
        loadWeights();
    }, [loadWeights]);

    const updateWeight = async (id: string, weight: string, unit: string) => {
        const { success, message } = await fetchUpdateWeight(authenticated, id, weight, unit);
        if (success) {
            Alert.alert('Success', 'Weight updated successfully');
            await loadWeights();
            return true;
        } else {
            Alert.alert('Error', message || 'Failed to update weight');
            return false;
        }
    };

    const deleteWeight = async (id: string) => {
        const { success, message } = await fetchDeleteWeight(authenticated, id);
        if (success) {
            Alert.alert('Success', 'Weight deleted successfully');
            await loadWeights();
            return true;
        } else {
            Alert.alert('Error', message || 'Failed to delete weight');
            return false;
        }
    };

    const logNewWeight = async (weight: string, unit: string) => {
        const { success, message } = await fetchLogWeight(authenticated, weight, unit);
        if (success) {
            Alert.alert('Success', 'Weight logged successfully');
            await loadWeights();
            return true;
        } else {
            Alert.alert('Error', message || 'Failed to log weight');
            return false;
        }
    };

    return {
        weights,
        updateWeight,
        deleteWeight,
        logNewWeight,
    };
}
