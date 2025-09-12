import React, { ReactNode } from 'react';
import { View, Platform } from 'react-native';
import {Stack} from "expo-router";

interface WrapperProps {
    children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps):React.JSX.Element {
    return (
        <View
            style={{
                flex: 1,
                paddingTop: Platform.OS !== 'web' ? 5 : 0,
                paddingBottom: Platform.OS !== 'web' ? 5 : 0,
                width: '100%',
                height: '100%',
            }}
        >
            {children}
            <Stack
                screenOptions={{
                    headerShown: false, // Header komplett ausblenden
                }}
            />
        </View>
    );
}
