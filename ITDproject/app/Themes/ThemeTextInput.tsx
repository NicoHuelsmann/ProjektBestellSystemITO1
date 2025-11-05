import React from "react";
import {TextInput, View} from "react-native";

interface ThemeTextInputProps {
    placeholder: string;
    value?: string;
    onChangeText: (value: string) => void;
    paddingTop?: number
    fontSize?: number
    type?: 'default' | 'password'
}
export default function ThemeTextInput(props: ThemeTextInputProps):React.JSX.Element {

    return (<View style={{height:55,width:300,paddingTop: props.paddingTop, paddingBottom:props.paddingTop}}>
        <TextInput
            style={{height:55,
                width:300,
                backgroundColor:'#d9d9d9',
                borderRadius:10,
                paddingLeft:10,
                fontSize:props.fontSize? props.fontSize:18,
            }}
            placeholderTextColor={'#ababab'}
            placeholder={props.placeholder}
            onChangeText={(value: string) => props.onChangeText(value)}
            value={props.value}
            secureTextEntry={props.type === 'password'}
        />
    </View>)
}