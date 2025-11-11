import Kellner from "@/app/(tabs)/(RegistrierenViews)/Kellner";
import Koch from "@/app/(tabs)/(RegistrierenViews)/Koch";
import ThemeButton from "@/app/Themes/ThemeButton";
import Wrapper from "@/app/Wrapper";
import { screenbackground, warning } from "@/constants/Colors";
import { UserInterface } from "@/interfaces/UserInterface";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen(): React.JSX.Element {
    const [user,setUser]= useState<UserInterface>();
    const localStorage = async () => {
        const storedUser = await asyncStorage.getItem('user');
        if (storedUser){
            setUser(JSON.parse(storedUser));
        }
    }
    useEffect(() => {
        localStorage();
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
    const checkRole = ():React.JSX.Element => {
        if(user?.Role === 'Koch'){
            return <Koch/>
        }
        else if(user?.Role === 'Kellner'){
            return <Kellner/>
        }
        else return error()
    }
    return (
        <Wrapper>
            {checkRole()}
        </Wrapper>
    )
}