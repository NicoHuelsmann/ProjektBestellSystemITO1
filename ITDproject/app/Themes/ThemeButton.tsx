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
    backgroundColor?: string;
    size?:{
        width?: number;
        height?: number;
    };
    textColor?: string;
}

export default function ThemeButton(props: ThemeButtonProps):React.JSX.Element{
    return (
        <View style={{
            width: 200,
            height:50,
            paddingTop: props.paddingTop,
        }} >
            <TouchableOpacity style={{
                width: props.size?.width !== undefined ? props.size?.width : 200,
                height:props.size?.height !== undefined? props.size?.height : 50,
                left: props.position.left,
                bottom:props.position.bottom,
                backgroundColor:props.backgroundColor !== undefined? props.backgroundColor:'blue',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius:10,
            }} onPress={()=>{props.onPress()}}>
                <Text
                style={{
                    color:props.textColor !== undefined? props.textColor : 'white',
                    fontSize:18
                }}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}