import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import Wrapper from "@/app/Wrapper";
import { router } from "expo-router";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import ThemeButton from "@/app/Themes/ThemeButton";
import { screenbackground, warning } from "@/constants/Colors";

export default function MeinAccount(): React.JSX.Element {
    const [userRole,setUserRole]= useState<string | null >('')
    const localStorage = async () => {
        const a =  await asyncStorage.getItem('user')
        if(a !== null) setUserRole(a);
    }
    useEffect(() => {
        localStorage();
    },[userRole])
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
        if(userRole === 'Koch' || userRole === 'Kellner'){
            return (<Wrapper>
                    <View style={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <Text style={{ marginBottom: 20 }}>Mein Account</Text>
                    <Button
                        title="Zum HomeScreen"
                        onPress={() => router.push("/HomeScreen")}
                    />
                    </View>
                    </Wrapper>)
        }
        else return error()
    }

  return (
    <Wrapper>
        {checkRole()}
    </Wrapper>
  );
}
