import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { router } from "expo-router";
import React from "react";
import {DimensionValue, Pressable, Text, View} from "react-native";

interface OpenDialogProps {
    position?:{
        left?: DimensionValue;
        bottom?: DimensionValue;
    }
    onBlur:() => void;
}
export default function OpenDialog(props:OpenDialogProps){

    const goToMyAccount = async () => {
        if (await asyncStorage.getItem('user') !== '')
            router.push('/(tabs)/(Profile)/MeinAccount');
    }

    const handleLogout = async () => {
        await asyncStorage.removeItem('user');
        router.push('/')
    }

    return(
            <View onTouchCancel={props.onBlur} style={{
            shadowColor: '#000',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6,
            alignSelf: 'flex-end',
            bottom: props.position?.bottom != null ? props.position?.bottom : 0,
            left: props.position?.left != null ? props.position?.left :0,
            borderRadius: 9,
            width: 200,
            height: 400,
            backgroundColor: 'white',
        }}>
            <Pressable onPress={goToMyAccount} style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'solid',
                borderBottomColor: 'back',
                borderBottomWidth: 1
            }}>
                <Text  selectable={false} style={{fontSize: 28}}>Mein Profil</Text>
            </Pressable>
            <Pressable onPress={handleLogout} style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'solid',
                borderBottomColor: 'back',
                borderBottomWidth: 1
            }}>
                <Text selectable={false} style={{fontSize: 28}}>Logout</Text>
            </Pressable>
        </View>)
}