import React from "react";
import {Pressable, View} from "react-native";
interface ThemeCheckBoxProps {
    position:{
        left?: number;
        bottom?: number;
    }
    alignSelf?:"center"|'flex-start'|'flex-end'|'stretch',
}

export default function ThemeCheckBox(props:ThemeCheckBoxProps):React.JSX.Element {
    const [pressed,setPressed]=React.useState<boolean>(false);
    return (
            <Pressable
                onPress={() => setPressed(!pressed)}
                style={{borderWidth:1,width:25,height:25,
                position:'absolute',
                left:props.position.left !== undefined? props.position.left :0,
                bottom:props.position.bottom !== undefined? props.position.bottom :0,
                alignSelf: props.alignSelf !== undefined ? props.alignSelf :'flex-start',
                backgroundColor: pressed ? 'green':'white'
            }}/>
    )
}