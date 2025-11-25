import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

interface ProfileIconProps {
    open: (state:boolean) => void;
    currentState:boolean
}

export default function ProfileIcon(props:ProfileIconProps):React.JSX.Element{

    const [RGB, setRGB] = React.useState<string>()
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [vorName, setVorName] = React.useState<string | null>(null);
    const [nachName, setNachName] = React.useState<string | null>(null);
    const add = async () => {
        const getstorage = await asyncStorage.getItem('profilePictureColor')
        if(getstorage === undefined || getstorage === null) {
            const r = Math.floor(Math.random() * 256)
            const g = Math.floor(Math.random() * 256)
            const b = Math.floor(Math.random() * 256)
            const RGB = `rgb(${r},${g},${b})`
            asyncStorage.setItem('profilePictureColor', RGB)
            setRGB(RGB)
        }else{
            setRGB(getstorage)
        }
    }
    const getPerson = async () => {
        const userId = await AsyncStorage.getItem('user')
        const a = userId ? JSON.parse(userId) : null;
        setVorName(a.Vorname)
        setNachName(a.Nachname)
    }
    useEffect(() => {
        add()
        getPerson()
    }, []);
    return (
            <View style={{position:'absolute', alignItems:'flex-end',width:'100%',height:'100%',bottom:-10,left:-20}}>
                <Pressable style={{
                    justifyContent:'center',
                    alignItems:'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,width:50, height:50,backgroundColor:RGB,borderRadius:90}}
                onPress={() => {
                    props.open(!props.currentState)
                }}
                >
                    <Text style={{color:'white',fontSize:22}} selectable={false}>
                        {vorName?.slice(0,1)}{nachName?.slice(0,1)}
                    </Text>
                </Pressable>
            </View>

    )
}