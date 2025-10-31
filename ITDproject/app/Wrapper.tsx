import React, { ReactNode } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { screenbackground } from "@/constants/Colors"; // z. B. "#FFA500"

interface WrapperProps {
    children?: ReactNode;
}

export default function Wrapper({ children }: WrapperProps): React.JSX.Element {
    return (
        <SafeAreaProvider>
            {/* Äußere View gibt den Grundhintergrund für alles */}
            <View style={{ flex: 1, backgroundColor: screenbackground }}>
                {/* SafeArea sorgt dafür, dass der Bereich unter der Dynamic Island eingefärbt ist */}
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: screenbackground }}
                    edges={["top", "left", "right", "bottom"]}
                >
                    {/* Statusleiste - iOS transparent, damit Hintergrund durchscheint */}
                    <StatusBar style="dark" translucent backgroundColor={screenbackground} />

                    {/* Deine eigenen Inhalte (z. B. globaler Header, Toasts, Overlays etc.) */}
                    {children}

                    {/* Expo Router Stack für Navigation */}
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: screenbackground },
                        }}
                    />
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    );
}
