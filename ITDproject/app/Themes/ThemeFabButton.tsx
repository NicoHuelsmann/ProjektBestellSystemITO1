import React from "react";
import {Text, TouchableOpacity, View,} from "react-native";
import Octicons from 'react-native-vector-icons/Octicons';
import {basicButtonColor} from "@/constants/Colors";

interface ThemeFabButtonProps {
    onPress: () => void;
    position:{
        left: number;
        bottom: number;
    }
    paddingTop?: number;
    fontSize?: number;
    backgroundColor?: string;

    textColor?: string;
    alignSelf?:'auto'|'center'| 'flex-start'| 'flex-end'|'stretch'|'baseline';
    fix?:boolean

}
export default function ThemeFabButton(props:ThemeFabButtonProps):React.JSX.Element{
    return(
        <TouchableOpacity style={{
            paddingTop: props.paddingTop,
            alignSelf: props.alignSelf || 'auto',
            position: props.fix ? 'relative' : 'absolute',
            width: 50,
            height: 50,
            left: typeof props.position?.left === 'number'
                ? `${props.position.left}%`
                : props.position?.left || '50%',
            bottom: typeof props.position?.bottom === 'number'
                ? `${props.position.bottom}%`
                : props.position?.bottom || '10%',
            backgroundColor: props.backgroundColor || basicButtonColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 90,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 6,
            elevation: 4,
        }} onPress={()=>{props.onPress()}}>
            <View style={{bottom:-1}}>
                <Octicons name="plus" color="white" size={28}/>
            </View>

        </TouchableOpacity>
)

}