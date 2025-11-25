import {Pressable, View} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import EvilIcons from "react-native-vector-icons/EvilIcons";
interface ThemeBackButtonProps {
    onPress?: () => void;
}
export default function ThemeBackButton(props:ThemeBackButtonProps):React.JSX.Element{
    const router = useRouter();
    return (<View style={{width:30,height:30}}>
        <Pressable style={{width:30,height:30}} onPress={() => props.onPress != null?props.onPress() : router.back()}>
            <EvilIcons name="arrow-left" color="#000" size={32} />
        </Pressable>
    </View>)
}