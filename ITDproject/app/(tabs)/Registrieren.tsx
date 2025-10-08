import React from "react";
import {Text, View} from "react-native";
import Wrapper from "@/app/Wrapper";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
import ThemeButton from "@/app/Themes/ThemeButton";
import ThemeBackButton from "@/app/Themes/ThemeBackButton";
import {warning} from "@/constants/Colors";
import {LoginLogo} from "@/components/loginLogo";

export default function Registrieren():React.JSX.Element{
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [checkPassword, setCheckPassword] = React.useState<string>("");
    const [error, setError] = React.useState<boolean>(false);

    const tryToCheckpassword = () => {
        if(password === checkPassword && username.length !== 0) {
            // in die datenbank schreiben
            console.log('Erstellt')

        }else{
            setError(true);
        }
    }
return (
    <Wrapper>
        <ThemeBackButton/>
        <View style={{alignItems:"center",justifyContent:"center",height:'100%'}}>
            <LoginLogo/>
            <Text style={{color:'white',fontSize:32}}>
                Bestellapp
            </Text>
            <ThemeTextInput
                paddingTop={5}
                placeholder={'Username'}
                onChangeText={(e) => {
                    setUsername(e)
                    setError(false)
            }}/>
            <ThemeTextInput
                placeholder={'Password'}
                paddingTop={5}
                onChangeText={(e) => {
                    setPassword(e)
                    setError(false)
            }}/>
            <ThemeTextInput
                placeholder={'Password'}
                paddingTop={5}
                onChangeText={(e) => {
                setCheckPassword(e)
                setError(false)
            }}/>
            <ThemeButton
                text={'Registrieren'}
                onPress={tryToCheckpassword}
                position={{left:0,bottom:0}}/>
            {error === true? <Text style={{position:'absolute',bottom:200,color:warning}}>Username oder password ist nicht korrekt</Text>:null}
        </View>
    </Wrapper>
)
}