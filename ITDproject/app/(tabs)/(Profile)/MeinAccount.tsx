import ThemeButton from "@/app/Themes/ThemeButton";
import Wrapper from "@/app/Wrapper";
import { screenbackground, warning } from "@/constants/Colors";
import { UserInterface } from "@/interfaces/UserInterface";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function MeinAccount(): React.JSX.Element {
    const [user, setUser] = useState<UserInterface>();
    const localStorage = async () => {
        const storedUser = await asyncStorage.getItem('user');
        if (storedUser){
            setUser(JSON.parse(storedUser));
        }
    }

    useEffect(() => {
        localStorage();
        console.log(user)
    },[])

    useEffect(() => {
        console.log(user)
    }, [user])
    
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
        if(user?.Role === 'Koch' || user?.Role === 'Kellner'){
            return (<Wrapper>
                    <View style={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <Text style={{ marginBottom: 20 }}>Mein Account</Text>
                    <Text style={{fontSize:30}}>UserID: {user?.UserID}</Text>
                    <Text style={{fontSize:30}}>Username: {user?.Benutzername}</Text>
                    <Text style={{fontSize:30}}>Vorname: {user?.Vorname}</Text>
                    <Text style={{fontSize:30}}>Nachname: {user?.Nachname}</Text>
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