import EvilIcons from '@expo/vector-icons/EvilIcons';
import React from 'react';
import {DimensionValue, Pressable} from "react-native";
interface PropsThemeTrashIconProps {
    onPress?: () => void;
    paddingTop?: number;
    paddingLeft?: number;
    bottom?:DimensionValue;
    left?:DimensionValue;
}
export default function ThemeTrashIcon(props: PropsThemeTrashIconProps){
    const [hovered, setHovered] = React.useState('white');
    return (
        <Pressable
            onPress={props.onPress}
            onHoverIn={() =>setHovered('#e5e5e5')}
            onHoverOut={() => setHovered('white')}
            style={{
                width:30,
                height:30,
                borderRadius:90,
                backgroundColor:hovered,
                justifyContent:'center',
                alignItems: 'center',
                paddingTop:props.paddingTop!=null? props.paddingTop : 0,
                paddingLeft:props.paddingLeft!=null? props.paddingLeft : 0,
                bottom: props.bottom!=null? props.bottom : 0,
                left:props.left!=null? props.left : 0,
            }}>

        <EvilIcons name="trash"  color='#808080' size={30}  />
    </Pressable>
)
}