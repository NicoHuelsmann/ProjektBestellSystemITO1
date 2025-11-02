import "expo-router/entry";
import {Link, router} from "expo-router";
import ThemeButton from "@/app/Themes/ThemeButton";
import Wrapper from '../Wrapper'
import {useEffect, useState} from "react";
import {Logo} from "@/components/logo";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
import {useNavigation} from "expo-router";
import DetailsScreen from "@/app/(tabs)/DetailsScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Crypto from "expo-crypto";
import {Platform, Text, View} from "react-native";
import {LoginLogo} from "@/components/loginLogo";
import {screenbackground} from "@/constants/Colors";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import React from "react";
import fetchUser from "@/fetchRequests/fetchUser";
import fetchRole from "@/fetchRequests/fetchRole";
const Stack = createNativeStackNavigator();

export default function Login() {
  const navigation = useNavigation();
  const [connect,setConnect] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [usernotfound, setUsernotfound] = useState<boolean>(false);
  useEffect(() => {
    const intervall = setInterval(()=> {
      const ping = async () => {
        try {
          const response = await fetch("http://localhost:9000/Login");
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
    },10000)
  clearInterval(intervall)
  });

  const tryToLogin = async () =>{
    setError(false);
    setUsernotfound(false);
    const resultDatabase:{userID:number,password:string} = await fetchUser(text);
    if (resultDatabase === null){
      setUsernotfound(true);
      return;
    }
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256, password
    );
    if(resultDatabase.password === hashedPassword){
      const resultRole = await fetchRole(resultDatabase.userID);
      console.log(resultRole);
      await asyncStorage.setItem('user',resultRole.role);
      router.push("/HomeScreen");
    }else{
      setError(true);
    }
  }
  return (
   <Wrapper>
       <View style={{flex: 1,
           paddingTop: Platform.OS !== 'web' ? 5 : 0,
           paddingBottom: Platform.OS !== 'web' ? 5 : 0,
       }}>
     <Link href={'/'}/>
     <View style={{width:'100%',height:'100%',alignItems: "center",justifyContent:"center"}}>
     <View style={{bottom:Platform.OS !== 'web'?-25:0,alignItems: "center",justifyContent:"center"}}>
       <LoginLogo/>
       <Text style={{color:'white',fontSize:32}}>
         Bestellapp
       </Text>
     </View>
     <ThemeTextInput type="default" placeholder={'Username'} onChangeText={setText} paddingTop={Platform.OS === 'web'?5:35} fontSize={26}/>
     <ThemeTextInput type="password" placeholder={'Password'} onChangeText={setPassword} paddingTop={Platform.OS === 'web'?5:25} fontSize={26}/>
     <ThemeButton  position={{bottom: Platform.OS !== 'web'? -40:0 }} text={'Login'} onPress={() => {
        tryToLogin()
     } }/>
            <View style={{width:400,justifyContent:"center",alignItems:'center',bottom:-50}}>
                {error? <Text style={{color:'red', paddingTop:0,position:'absolute'}}>Username oder Password ist Falsch</Text>: null}
                {usernotfound? <Text style={{color:'red', paddingTop:0,position:'absolute'}}>User nicht Gefunden</Text>: null}
            </View>
                <ThemeButton text={'Registrieren'} backgroundColor={screenbackground} onPress={() => router.push('/Registrieren')} position={{bottom:-80,left:0}}/>
            </View>
       </View>
   </Wrapper>
  );
}

