import Wrapper from "@/app/Wrapper";
import React, { useState, useEffect, useRef } from 'react';import {Text, View} from "react-native";
import ThemeBackButton from "@/app/Themes/ThemeBackButton";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
import {UserInterface} from "@/interfaces/UserInterface";
import ThemeButton from "@/app/Themes/ThemeButton";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {router} from "expo-router";

export default function PreSetQrLogin():React.JSX.Element {
    const [vorName, setVorName] = useState<string>("");
    const [nachName, setNachName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const body: UserInterface = {
        Benutzername: 'QRCodeLogin',
        Nachname: 'R',
        Role:'Kellner',
        UserID: 0,
        Passwort:'',
        Vorname: 'Q'
    }
    const speichern = () => {
        const body: UserInterface = {
            Benutzername: userName,
            Vorname: vorName,
            Nachname: nachName,
            Role:'Kellner',
            UserID: 0,
            Passwort:''

        }
        if(vorName.length > 0 && nachName.length > 0 && userName.length > 0) {
            asyncStorage.setItem('QRPreSet',JSON.stringify(body));
            router.push('/');
        }
    }
    return(
        <Wrapper>
            <ThemeBackButton/>
            <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20}}>Erstelle hier ein Preset für den QR login</Text>
                <View style={{width:'100%',height:4,backgroundColor:'black'}}/>
                <View style={{bottom:-5}}>
                    <ThemeTextInput placeholder={'Vorname'} onChangeText={setVorName} paddingTop={0}/>
                    <ThemeTextInput placeholder={'Nachname'} onChangeText={setNachName} paddingTop={3}/>
                    <ThemeTextInput placeholder={'Benutzername'} onChangeText={setUserName} paddingTop={6}/>
                </View>
                <ThemeButton text={'Speichern'} onPress={speichern} position={{left:0,bottom:-15}}/>
            </View>

        </Wrapper>
    )
}