import React from "react";
import {Dimensions, Platform, Pressable, View} from "react-native";
interface ThemeChipProps {
    size?: {
        width?: number;
        height?: number;
    };
    children: React.ReactNode;
    onPress: () => void;
    backgroundColor?:string
    justifyContent?:"center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly"
    alignItems?:'center'|'flex-start'|'flex-end'|'stretch',
}
export default function ThemeChip(props:ThemeChipProps):React.JSX.Element{
    const { width, height } = Dimensions.get("window");
 return (
     <Pressable
         onPress={props.onPress}
         style={{
             paddingLeft:10,
             justifyContent: props.justifyContent !== undefined? props.justifyContent : 'center',
             alignItems: props.alignItems !== undefined ? props.alignItems : 'flex-start',
             backgroundColor: props.backgroundColor || 'white',
             width: props.size?.width === undefined ? 10 : props.size?.width,
             height: props.size?.height === undefined? 40 : props.size?.height,
             borderRadius: 15,
             alignSelf: 'flex-start',
             shadowColor: '#000',
             shadowOffset: { width: 2, height: 2 },
             shadowOpacity: 0.3,
             shadowRadius: 4,
             elevation: 3,
         }}>
         {props.children}
     </Pressable>


 )
}