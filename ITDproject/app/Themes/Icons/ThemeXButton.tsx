import React from "react";
import {Pressable, TouchableOpacity, View} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
interface ThemeXButtonProps {
    onPress: () => void;
}
export default function ThemeXButton(props:ThemeXButtonProps):React.JSX.Element {
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
                    alignSelf:'flex-end',
            }}>

            <Feather name="x" color='#808080' size={24} />
            </Pressable>
    )
}