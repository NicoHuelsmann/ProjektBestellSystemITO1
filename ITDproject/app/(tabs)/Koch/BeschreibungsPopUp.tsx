import React from "react";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import { ScrollView, Text, View } from "react-native";
import {Platform} from "react-native";
interface BeschreibungsPopUpProps{
    onBlur: () => void;
    beschreibung:string
}
export default function BeschreibungsPopUp(props:BeschreibungsPopUpProps):React.JSX.Element {
    return (
        <ThemePopUp platforme={Platform.OS} XorBack={true} onBlur={() => props.onBlur()}>
            <Text style={{fontSize:24,alignSelf:'center'}}>Beschreibung</Text>
            <View style={{height:2,backgroundColor:'black'}}/>
            <Text style={{paddingLeft:30,fontSize:18,paddingTop:10}}>{props.beschreibung}</Text>
        </ThemePopUp>
    )
}