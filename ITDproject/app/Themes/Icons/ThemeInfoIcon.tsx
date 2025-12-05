import React from "react";
import {Pressable} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
interface ThemeChipProps {
    position?:{
        left?:number,
        bottom?:number,
    }
    paddingRight?: number;
    paddingLeft?: number;
    onPress?: () => void;
}
export default function ThemeInfoIcon(props:ThemeChipProps):React.JSX.Element{
    const [hovered, setHovered] = React.useState('white');
    return (
        <Pressable onPress={props.onPress}
                   onHoverIn={() =>setHovered('#e5e5e5')}
                   onHoverOut={() => setHovered('white')}
                   style={{
                       left: props.position?.left != null? props.position.left: null,
                       bottom: props.position?.bottom != null? props.position.bottom: null,
                       paddingRight:props.paddingRight != null? props.paddingRight: null,
                       paddingLeft: props.paddingLeft != null? props.paddingLeft: null,
                       width:30,
                       height:30,
                       borderRadius:90,
                       backgroundColor:hovered,
                       justifyContent:'center',
                       alignItems: 'center',
                       alignSelf:'flex-end',
                   }}>
            <AntDesign name="exclamation"  size={24} color='#808080'/>
        </Pressable>
    )
}