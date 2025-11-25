import QRScannerScreen from "@/app/(tabs)/Kellner/QRScannerScreen";
import ThemeButton from "@/app/Themes/ThemeButton";
import ThemeQRIcon from "@/app/Themes/Icons/ThemeQRIcon";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
import ThemeXButton from "@/app/Themes/Icons/ThemeXButton";
import { LoginLogo } from "@/components/loginLogo";
import { screenbackground } from "@/constants/Colors";
import { setUrl, url } from "@/fetchRequests/config";
import fetchRole from "@/fetchRequests/fetchRole";
import fetchUser, { fetchUserNames } from "@/fetchRequests/fetchUser";
import useServerStatus from "@/hooks/useServerStatus";
import { UserInterface } from "@/interfaces/UserInterface";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Crypto from "expo-crypto";
import { Link, router } from "expo-router";
import "expo-router/entry";
import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import Wrapper from '../Wrapper';

const Stack = createNativeStackNavigator();

export default function Login() {
  const [text, setText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [usernotfound, setUsernotfound] = useState<boolean>(false);
  const [sowQRScanner, setSowQRScanner] = useState<boolean>(false);
  const [currentStorage, setCurrentStorage] = useState<any>();
  const [connect, setConnect] = useState<boolean>(false);
  useEffect(() => {
    const intervall = setInterval(()=> {
      const ping = async () => {
        try {
          const response = await fetch(`${url}/health`);
          if (!response.ok) {
            console.error("Fehler:", response.status);
            return;
          }
          const data = await response.json();
          if(data.ok){
            setConnect(true)
          }
        } catch (err) {
          console.error("Fetch Fehler:", err);
        }
      };
      ping();
    },5000);
    return () => clearInterval(intervall);
  },[]);

  const online = useServerStatus();

  const tryToLogin = async () =>{
    setError(false);
    setUsernotfound(false);
    if (!online) {
      return;
    }
    let result = await fetchUser(text);
    const UserID = result?.userID ?? null;
    if (UserID === null) {
      setUsernotfound(true);
      return;
    }
    const User: UserInterface = await fetchUserNames(UserID);
    User.Role = (await fetchRole(UserID)).role;
    User.UserID = UserID;
    await asyncStorage.setItem('user', JSON.stringify(User));
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256, password
    );
    if(User.Passwort !== hashedPassword){
      await asyncStorage.removeItem('user');
      setError(true);
    } else{
      console.log("Login erfolgreich");
      setUrl(url)
      router.push("/HomeScreen");
    }
  }
  const QRPreSetLoade = async () => {
      const a = await asyncStorage.getItem('QRPreSet')
      setCurrentStorage(a)
  }
    useEffect(() => {
        QRPreSetLoade()
    }, []);
  return (
   <Wrapper>
       <View style={{flex: 1,
           paddingTop: Platform.OS !== 'web' ? 5 : 0,
           paddingBottom: Platform.OS !== 'web' ? 5 : 0,
       }}>
     <Link href={'/'}/>
     <View style={{width:'100%',height:'100%',alignItems: "center",justifyContent:"center"}}>
         <View style={{position:'absolute',paddingBottom:400}}>
             {currentStorage != null? <ThemeQRIcon onPress={() => setSowQRScanner(!sowQRScanner)}/>:null}
         </View>

         <View style={{bottom:Platform.OS !== 'web'?-25:0,alignItems: "center",justifyContent:"center"}}>
       <LoginLogo/>
       <Text style={{color:'white',fontSize:32}}>
         Bestellapp
       </Text>
     </View>
     <ThemeTextInput type="default" placeholder={'Username'} onChangeText={setText} paddingTop={Platform.OS === 'web'?5:35} fontSize={26}/>
     <ThemeTextInput type="password" placeholder={'Password'} onChangeText={setPassword} paddingTop={Platform.OS === 'web'?5:25} fontSize={26}/>
     {online?
     <ThemeButton  position={{bottom: Platform.OS !== 'web'? -40:0 }} text={'Login'} onPress={() => {
        tryToLogin()
     } }/>: null
    }
            <View style={{width:400,justifyContent:"center",alignItems:'center',bottom:-50}}>
                {error? <Text style={{color:'red', paddingTop:0,position:'absolute'}}>Username oder Password ist Falsch!</Text>: null}
                {usernotfound? <Text style={{color:'red', paddingTop:0,position:'absolute'}}>User nicht Gefunden!</Text>: null}
                {!online? <Text style={{color:'red', paddingTop:0,position:'absolute'}}>Server nicht erreichbar!</Text>: null}
            </View>
                <ThemeButton text={'Registrieren'} backgroundColor={screenbackground} onPress={() => router.push('/Registrieren')} position={{bottom:-80,left:0}}/>
            </View>
           {sowQRScanner? <View style={{position: 'absolute', width: '100%', height: '100%',justifyContent:'flex-end',bottom:-4}}>
               <View style={{position: 'absolute', width: '100%', height: '100%',}}>
                   <ThemeXButton onPress={() => setSowQRScanner(false)}/>
                   <QRScannerScreen/>
               </View>
           </View>:null}

       </View>
   </Wrapper>
  );
}