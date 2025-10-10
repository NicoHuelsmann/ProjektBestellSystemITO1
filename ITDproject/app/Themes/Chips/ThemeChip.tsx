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
}
export default function ThemeChip(props:ThemeChipProps):React.JSX.Element{
    const { width, height } = Dimensions.get("window");
 return (
     <Pressable
         onPress={props.onPress}
         style={{
             paddingLeft:10,
             justifyContent: 'center',
             alignItems: 'flex-start',
             backgroundColor: props.backgroundColor || 'white',
             width:
                 props.size?.width ??
                 (Platform.OS !== 'web' ? width - 20 : '60%'),
             height: props.size?.height ?? 40,
             borderRadius: 15,
             alignSelf: 'flex-start',
             shadowColor: '#000',
             shadowOffset: { width: 2, height: 2 },
             shadowOpacity: 0.3,
             shadowRadius: 4,
             elevation: 3,
             maxWidth: '90%',
             minWidth: 200,
         }}>
         {props.children}
     </Pressable>


 )
}