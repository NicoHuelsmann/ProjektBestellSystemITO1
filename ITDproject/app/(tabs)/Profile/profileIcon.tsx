import React, {useEffect} from "react";
import {Platform, Pressable, Text, View} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

interface ProfileIconProps {
    open: (state:boolean) => void;
    currentState:boolean
}

export default function ProfileIcon(props:ProfileIconProps):React.JSX.Element{

    const [RGB, setRGB] = React.useState<string>()
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
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
    useEffect(() => {
        add()
    }, []);
    return (
            <View style={{position:'absolute', alignItems:'flex-end',width:'100%',height:'100%',bottom:-10,left:-20}}>
                <Pressable style={{
                    shadowColor: '#000',
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,width:50, height:50,backgroundColor:RGB,borderRadius:90}}
                onPress={() => {
                    props.open(!props.currentState)
                }}
                >
                    <Text></Text>
                </Pressable>
            </View>

    )
}