import React, { ReactNode } from 'react';
import { View, Platform } from 'react-native';
import {Stack} from "expo-router";
import {screenbackground} from "@/constants/Colors";

interface WrapperProps {
    children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps):React.JSX.Element {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor:screenbackground
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
