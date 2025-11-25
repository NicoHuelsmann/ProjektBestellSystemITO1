import ThemeButton from "@/app/Themes/ThemeButton";
import Wrapper from "@/app/Wrapper";
import {bestellungenBackground, screenbackground, warning} from "@/constants/Colors";
import { UserInterface } from "@/interfaces/UserInterface";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {Button, Platform, Text, View} from "react-native";
import ThemeBackButton from "@/app/Themes/ThemeBackButton";

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
        if(user?.Role != null){
            if(Platform.OS === 'web'){
                return (
                    <View style={{width:'30%',height:'90%',alignItems: 'flex-start',shadowColor: '#000',
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,borderRadius:40,
                        backgroundColor:bestellungenBackground,
                    }}>
                        <View style={{bottom:-10,left:10}}>
                            <ThemeBackButton onPress={() => router.push('/HomeScreen')}/>
                        </View>

                        <Text style={{ alignSelf:'center',paddingTop:20,fontSize:30,color:'black'}}>Mein Account</Text>
                        <View style={{borderWidth:1,width:'100%',backgroundColor:'black'}}/>
                    <View style={{flexDirection:'column' }}>
                        <Text style={{fontSize:20,paddingLeft:20,color:'black'}}>UserID: {user?.UserID}</Text>
                        <Text style={{fontSize:20,paddingLeft:20,color:'black'}}>Username: {user?.Benutzername}</Text>
                        <Text style={{fontSize:20,paddingLeft:20,color:'black'}}>Vorname: {user?.Vorname}</Text>
                        <Text style={{fontSize:20,paddingLeft:20,color:'black'}}>Nachname: {user?.Nachname}</Text>

                    </View>
                    </View>
                )
            }else{
                return (
                    <View style={{ alignItems: 'flex-start', width:200,height:'90%',shadowColor: '#000',
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5, }}>
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
                )
            }

        }
        else return error()
    }

  return (
    <Wrapper>
        <View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
            {checkRole()}
        </View>

    </Wrapper>
  );
}