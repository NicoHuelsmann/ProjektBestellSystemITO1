import React, {useEffect, useState} from "react";
import Wrapper from "@/app/Wrapper";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import Koch from "@/app/(tabs)/RegestrierenViews/Koch";
import Kellner from "@/app/(tabs)/RegestrierenViews/Kellner";
import {Link, router} from "expo-router";
import {Text, View} from "react-native";
import {screenbackground, warning} from "@/constants/Colors";
import ThemeButton from "@/app/Themes/ThemeButton";
import {error} from "@expo/fingerprint/cli/build/utils/log";

export default function HomeScreen(): React.JSX.Element {
    const [userRole,setUserRole]= useState<string | null >('')
    const localStorage = async () => {
        const a =  await asyncStorage.getItem('user')
        setUserRole(a)
    }
    useEffect(() => {
        localStorage()
    },[])

    const error = ():React.JSX.Element => {
    return(
        <View style={{backgroundColor:screenbackground,height:'100%',justifyContent:'center',alignItems:'center',}}>
            <ThemeButton
                textColor={warning}
                backgroundColor={screenbackground}
                size={{width:400}}
                text={'Du bist nicht angemeldet'}
                onPress={() => router.push('/')}
                position={{left:-100,bottom:0}}
            />
        </View>
    )
    }

    return (
        <Wrapper>
            {userRole === 'Koch' ? <Koch/> : error()}
            {userRole === 'Kellner'? <Kellner/> : <View style={{backgroundColor:screenbackground}}/>}
        </Wrapper>
    )
}