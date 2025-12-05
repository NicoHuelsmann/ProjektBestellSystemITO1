import React from "react";
import {Pressable} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
interface ThemeArrowLeftProps {
    onPress: () => void;
}
export default function ThemeArrowLeft(props: ThemeArrowLeftProps ):React.JSX.Element{
    const [hovered, setHovered] = React.useState('white');

    return (
        <Pressable  onPress={props.onPress}
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
            <AntDesign name="arrowleft"  size={24} color='#808080'/>
        </Pressable>
    )
}