import React, {ReactNode, useEffect} from "react";
import {Dimensions, Platform, TouchableOpacity, View} from "react-native";
import ThemeXButton from "@/app/Themes/Icons/ThemeXButton";
import ThemeArrowLeft from "@/app/Themes/Icons/ThemeArrowLeft";

interface ThemePopUpProps {
    children: ReactNode;
    onBlur: () => void;
    platforme?: "ios" | "android" | "windows" | "macos" | "web";
    XorBack?:boolean
    onPressBackButton?: () => void;
}
export default function ThemePopUp({ children, onBlur,platforme,XorBack,onPressBackButton}: ThemePopUpProps):React.JSX.Element{
return (

    <View  style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
    }}>
        <TouchableOpacity
            style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute'
            }}
            activeOpacity={1}
            onPress={onBlur}/>
        <View
            style={{
                width: platforme !== 'web' ? '100%': 400,
                height: platforme !== 'web'? '100%': 600,
                backgroundColor:'white',
                borderRadius:Platform.OS!== 'web'? 0:15,
                elevation:10,
            }}>
            {XorBack ?
                <View style={{left: -10, bottom: -10}}>
                    <ThemeXButton onPress={onBlur}/>
                </View>
                :
                <View style={{left: -10, bottom: -10}}>
                    <ThemeArrowLeft onPress={onPressBackButton != null ?onPressBackButton : () => ''}/>
                </View>
            }

            {children}
        </View>
    </View>
)
}