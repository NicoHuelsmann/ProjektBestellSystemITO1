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
    const [PreSetLoaded,setPreSetLoaded] = useState(false);
    const localStorage = async () => {
        const storedUser = await asyncStorage.getItem('user');
        console.log('meinacc',storedUser)
        if (storedUser){
            setUser(JSON.parse(storedUser));
        }
    }


    useEffect(() => {
        localStorage();
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
                    <View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
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
                        <Text style={{fontSize:20,paddingLeft:20,color:'black'}}>Role: {user?.Role}</Text>
                    </View>
                    </View>
                    </View>
                )
            }else{
                return (
                    <View style={{ width:'90%',height:'35%',alignItems: 'flex-start',shadowColor: '#000',
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,borderRadius:40,
                        backgroundColor:bestellungenBackground,
                        alignSelf:'center',
                        bottom:-20
                    }}>
                        <Text style={{ alignSelf:'center',paddingTop:20,fontSize:30,color:'black'}}>Mein Account</Text>
                        <View style={{borderWidth:1,width:'100%',backgroundColor:'black'}}/>
                        <Text style={{fontSize:30,paddingLeft:10}}>UserID: {user?.UserID}</Text>
                        <Text style={{fontSize:30,paddingLeft:10}}>Username: {user?.Benutzername}</Text>
                        <Text style={{fontSize:30,paddingLeft:10}}>Vorname: {user?.Vorname}</Text>
                        <Text style={{fontSize:30,paddingLeft:10}}>Nachname: {user?.Nachname}</Text>
                        <Text style={{fontSize:30,paddingLeft:10}}>Role: {user?.Role}</Text>
                    </View>
                )
            }

        }
        else return error()
    }

    const setPreSet = async () => {
        const currentuser = await asyncStorage.getItem('user')

        if(currentuser != null){
            const a = JSON.parse(currentuser)
            const body:UserInterface ={
                UserID: a.UserID,
                Role: 'Kellner',
                Benutzername: a.Benutzername,
                Vorname: a.Vorname,
                Nachname: a.Nachname,
                Passwort: a.Passwort,
            }
            console.log('dataset',a)
            await asyncStorage.setItem('QRPreSet',JSON.stringify(body));
        }


    }

    const QRPreSetLoade = async () => {
        const user = await asyncStorage.getItem('QRPreSet')
        console.log(user)
        if(user != null){
            setPreSetLoaded(true)
        }
    }
    useEffect(() => {
        QRPreSetLoade()
    }, []);
  return (
    <Wrapper>
            {checkRole()}

        {Platform.OS !== 'web'?
            <View style={{
                //alignItems:'center',
                alignItems:'flex-end',
                bottom:'-55%',
                left:-10
            }}>
                <ThemeButton text={'Zurück'} onPress={() => router.push('/HomeScreen')}/>
            </View>:null}
        { Platform.OS !== 'web' && !PreSetLoaded? <View style={{bottom: 0, alignItems: 'center'}}>
            <ThemeButton backgroundColor={screenbackground} position={{bottom: 0, left: 0}} text={'Qrcode Preset'}
                         onPress={() => {
                             setPreSet()
                             setPreSetLoaded(true)
                         }}/>
        </View>:null}
        { Platform.OS !== 'web' && PreSetLoaded === true? <View style={{bottom: 0, alignItems: 'center'}}>
            <ThemeButton backgroundColor={screenbackground} position={{bottom: 0, left: 0}} text={'QR data Reset'}
                         onPress={() => {
                             asyncStorage.removeItem('QRPreSet')
                             setPreSetLoaded(false)
                         }}/>
        </View>:null}
    </Wrapper>
  );
}