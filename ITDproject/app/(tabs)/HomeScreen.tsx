import Kellner from "@/app/(tabs)/(RegistrierenViews)/Kellner";
import Koch from "@/app/(tabs)/(RegistrierenViews)/Koch";
import ThemeButton from "@/app/Themes/ThemeButton";
import Wrapper from "@/app/Wrapper";
import { screenbackground, warning } from "@/constants/Colors";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export default function HomeScreen(): React.JSX.Element {
    const [views, setViews] = useState<React.JSX.Element | null>(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const stored = await asyncStorage.getItem("user");

            const user = stored ? JSON.parse(stored) : null;

            if (!user) {
                return setViews(errorView());
            }

            if (user.Role === "Koch") {
                setViews(<Koch />);
            } else if (user.Role === "Kellner") {
                setViews(<Kellner />);
            } else {
                setViews(errorView());
            }
        } catch (err) {
            setViews(errorView());
        }
    };

    const errorView = () => (
        <View style={{backgroundColor: screenbackground, height: "100%", justifyContent: "center", alignItems: "center"}}>
            <ThemeButton
                textColor={warning}
                backgroundColor={screenbackground}
                size={{ width: 400 }}
                text={"Du bist nicht angemeldet"}
                onPress={() => router.push("/")}
                position={{ left: -100, bottom: 0 }}
            />
        </View>
    );

    return <Wrapper>{views}</Wrapper>;
}

