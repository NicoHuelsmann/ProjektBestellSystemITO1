import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // iOS → Header ausblenden
            }}
        />
    );
}
