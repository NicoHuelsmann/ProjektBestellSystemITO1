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
const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();
  const [connect,setConnect] = useState<boolean>(false);
  const [text, setText] = useState<string>('test');
  useEffect(() => {
    const intervall = setInterval(()=> {
      const ping = async () => {
        try {
          const response = await fetch("http://10.160.14.51:9000/health");
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
  return (
   <Wrapper>
     <Link href={'/'}/>
       <ThemeButton text={'test'} onPress={() => {
         router.push("/DetailsScreen")
       } } position={{left:0,bottom:0}}/>
     <Logo/>
     <ThemeTextInput placeholder={'test'} onChangeText={setText}/>
   </Wrapper>
  );
}

