import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
interface ThemeButtonProps {
    text: string;
    onPress: () => void;
    position:{
        left: number;
        bottom: number;
    }
    paddingTop?: number;
    fontSize?: number;
}

export default function ThemeButton(props: ThemeButtonProps):React.JSX.Element{
    return (
        <View style={{
            width: 200,
            height:50,
            paddingTop: props.paddingTop,
        }} >
            <TouchableOpacity style={{
                width: 200,
                height:50,
                left: props.position.left,
                bottom:props.position.bottom,
                backgroundColor:'blue',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius:10,
            }} onPress={()=>{props.onPress()}}>
                <Text
                style={{
                    color:'white',
                    fontSize:18
                }}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}