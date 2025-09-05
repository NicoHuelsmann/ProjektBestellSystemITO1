import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
interface ThemeButtonProps {
    text: string;
    onPress: () => void;
    position:{
        left: number;
        bottom: number;
    }
}

export default function ThemeButton(props: ThemeButtonProps):React.JSX.Element{
    return (
        <View style={{
            width: 200,
            height:50,
        }} >
            <TouchableOpacity style={{
                width: 200,
                height:50,
                left: props.position.left,
                bottom:props.position.bottom,
                backgroundColor:'red',
                alignItems: 'center',
                justifyContent: 'center',
            }} onPress={()=>{props.onPress()}}>
                <Text
                style={{
                    color:'white',
                    fontSize:18,
                }}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}