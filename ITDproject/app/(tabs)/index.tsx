import ThemeButton from "@/app/Themes/ThemeButton";
import Wrapper from '../Wrapper'
import {useEffect, useState} from "react";
import {Logo} from "@/components/logo";


export default function HomeScreen() {
  const [connect,setConnect] = useState<boolean>(false);
  useEffect(() => {
    const ping = async () => {
      try {
        const response = await fetch("http://localhost:9000/health");
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
  }, []);
  return (
   <Wrapper>
       <ThemeButton text={'test'} onPress={() =>'' } position={{left:0,bottom:0}}/>
     <Logo/>
   </Wrapper>
  );
}

