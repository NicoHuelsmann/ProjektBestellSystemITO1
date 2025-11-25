import {View,Text} from "react-native";
import React, {useEffect, useState} from "react";
import {bestellungenBackground} from "@/constants/Colors";

export default function ThemeTime():React.JSX.Element{
    const [time, setTime] = useState<string>();
    useEffect(()=>{
        const stunde = new Date().getHours();
        const minute = new Date().getMinutes();
        const second = new Date().getSeconds();
        setTime(`${stunde}:${minute}:${second.toString()}`);
    })
    return (
        <View style={{position:'absolute',alignSelf:'center',shadowColor: '#000',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            backgroundColor:bestellungenBackground,
            borderRadius:40,width:100,
            justifyContent:'center',
            alignItems:'center',
            height:40}}>
            <Text  selectable={false} style={{fontSize:25}}>{time}</Text>
        </View>

    )
}