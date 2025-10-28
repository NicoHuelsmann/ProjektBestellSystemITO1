import {Pressable, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {router} from "expo-router";
interface OpenDialogProps {
    onBlur:() => void;
}
export default function OpenDialog(props:OpenDialogProps){

    const heandleLogout = async () => {
        await asyncStorage.removeItem('user')
        router.push('/')
    }
    return(
        <><TouchableOpacity onBlur={() => props.onBlur()} style={{width:'100%',height:'100%',backfaceVisibility:'hidden',backgroundColor:'transparent',position:'absolute'}}>
            <View style={{
            shadowColor: '#000',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6,
            alignSelf: 'flex-end',
            //bottom: '75%',
            left: -20,
            borderRadius: 9,
            width: 200,
            height: 400,
            backgroundColor: 'white',
        }}>
            <Pressable style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'solid',
                borderBottomColor: 'back',
                borderBottomWidth: 1
            }}>
                <Text style={{fontSize: 28}}>Mein Profil</Text>
            </Pressable>
            <Pressable onPress={heandleLogout} style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'solid',
                borderBottomColor: 'back',
                borderBottomWidth: 1
            }}>
                <Text style={{fontSize: 28}}>Logout</Text>
            </Pressable>
        </View>
        </TouchableOpacity></>
    )
}