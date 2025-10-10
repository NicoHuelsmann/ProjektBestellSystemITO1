import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {basicButtonColor} from "@/constants/Colors";
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
    alignSelf?:'auto'|'center'| 'flex-start'| 'flex-end'|'stretch'|'baseline';
}

export default function ThemeButton(props: ThemeButtonProps):React.JSX.Element{
    return (
            <TouchableOpacity style={{
                paddingTop: props.paddingTop,
                alignSelf: props.alignSelf ? props.alignSelf : 'auto',
                width: props.size?.width !== undefined ? props.size?.width : 200,
                height:props.size?.height !== undefined? props.size?.height : 50,
                left: props.position.left,
                bottom:props.position.bottom,
                backgroundColor:props.backgroundColor !== undefined? props.backgroundColor:basicButtonColor,
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
    )
}