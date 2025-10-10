import React from "react";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import {Text,View} from "react-native";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
import ThemeButton from "@/app/Themes/ThemeButton";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
interface BestellungPopUpProps {
    tableId:number;
    openBestellungenDialog:boolean;
}
export default function BestellungPopUp({tableId,openBestellungenDialog}:BestellungPopUpProps):React.JSX.Element{
    const possilbeFood = () => {
        //hier datenbankabfrage
        const returnView:React.JSX.Element[] = [];
        const food = []
        for(let i = 0; food.length>i;i++){
            returnView.push(
                <Text>food.name</Text>
            )
        }
        return returnView
    }
   const getStorage=async () =>{
       return asyncStorage.getItem(`bestellung${tableId}`);
   }
   const addStorage = async () => {
       asyncStorage.setItem(`bestellung${tableId}`, JSON.stringify(''));
   }
    return (
        <View>
        {openBestellungenDialog?
                <ThemePopUp onBlur={() => ''}>
                    {possilbeFood()}
                    <ThemeButton text={'OK'} onPress={() => ''} position={{left:-2,bottom:-90}}/>
                </ThemePopUp>:null}
        </View>
    )
}