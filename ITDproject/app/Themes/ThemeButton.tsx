import { basicButtonColor } from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {Image} from "expo-image";
interface ThemeButtonProps {
    text: string;
    onPress: () => void;
    position?:{
        left?: number;
        bottom?: number;
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
    movable?: 'absolute' | 'relative'

    icon?:any;
}

export default function ThemeButton(props: ThemeButtonProps):React.JSX.Element{
    if(props.icon != null){
        return (
            <TouchableOpacity style={{
                position:props.movable !== undefined? props.movable:'relative',
                paddingTop: props.paddingTop,
                alignSelf: props.alignSelf ? props.alignSelf : 'auto',
                width: props.size?.width !== undefined ? props.size?.width : 200,
                height:props.size?.height !== undefined? props.size?.height : 50,
                left: props.position?.left !== undefined ? props.position.left : 0,
                bottom:props.position?.bottom !== undefined ? props.position.bottom : 0,
                backgroundColor:props.backgroundColor !== undefined? props.backgroundColor:basicButtonColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius:10,
            }} onPress={()=>{props.onPress()}}>
                <Image style={{width:props.size?.width !== undefined ? props.size?.width : 200,height:props.size?.height !== undefined? props.size?.height : 50}} source={props.icon} />
            </TouchableOpacity>
        )
    }
    return (
            <TouchableOpacity style={{
                position:props.movable !== undefined? props.movable:'relative',
                paddingTop: props.paddingTop,
                alignSelf: props.alignSelf ? props.alignSelf : 'auto',
                width: props.size?.width !== undefined ? props.size?.width : 200,
                height:props.size?.height !== undefined? props.size?.height : 50,
                left: props.position?.left !== undefined ? props.position.left : 0,
                bottom:props.position?.bottom !== undefined ? props.position.bottom : 0,
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