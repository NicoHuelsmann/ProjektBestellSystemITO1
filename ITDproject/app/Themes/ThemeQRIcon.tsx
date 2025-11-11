import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Pressable} from "react-native";
interface ThemeQRIconProps {
    onPress?: () => void;
}
export default function ThemeQRIcon(props: ThemeQRIconProps) {

    return (
        <Pressable onPress={props.onPress}>
            <AntDesign name="qrcode" color="#000" size={24} />
        </Pressable>

    )
}