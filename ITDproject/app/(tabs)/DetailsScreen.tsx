import React from "react";
import {View, Text, Pressable} from "react-native";
import ThemeButton from "@/app/Themes/ThemeButton";
import Wrapper from "@/app/Wrapper";
import {Link, router} from "expo-router";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ThemeBackButton from "@/app/Themes/ThemeBackButton";


export default function DetailsScreen():React.JSX.Element {

    return (
        <Wrapper>
            <Link href="/DetailsScreen">Zu About</Link>
            <ThemeBackButton />
            <Text>Details Screen</Text>
        <ThemeButton text={'back'} onPress={() => console.log('Home')} position={{left:50,bottom:-100}}/>
    </Wrapper>)
}