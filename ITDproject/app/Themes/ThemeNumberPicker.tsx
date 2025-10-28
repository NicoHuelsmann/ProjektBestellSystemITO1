import React, {useEffect, useLayoutEffect} from "react";
import {Pressable, Text, View} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
interface ThemeNumberPickerProps {
    setNumer?:number,
    size?:number,
    return: (n:number) => void
}

export default function ThemeNumberPicker(props:ThemeNumberPickerProps): React.JSX.Element{
    const [number, setNumber] = React.useState<number>(0);
    useLayoutEffect(() => {
        if(number < 0){
            setNumber(0)
        }
        props.return(number)
    },[number])
    useEffect(() => {
        if(props.setNumer !== undefined) setNumber(props.setNumer)
    }, [props.setNumer]);
    return(
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Pressable style={{
                alignItems:'center',
                justifyContent:'center',
                width: props.size !== undefined? 30 * props.size :30 ,
                height:props.size !== undefined? 35 * props.size :35,
                borderStyle:'solid',
                borderColor:'black',
                borderWidth:1,
                borderBottomStartRadius:9,
                borderTopStartRadius:9,
                left:1}}
                       onPress={() => setNumber(number - 1)}>
                <AntDesign name="minus" color="#000" size={28} />
            </Pressable>
            <View style={{
                alignItems:'center',
                justifyContent:'center',
                borderStyle:'solid',
                borderTopColor:'black',
                borderBottomColor:'black',
                borderWidth:1,
                height:props.size !== undefined? 35 * props.size :35,
                width:30}}>
                <Text style={{alignContent:'center',fontSize:21}}>{number}</Text>
            </View>
            <Pressable style={{
                alignItems:'center',
                justifyContent:'center',
                width: props.size !== undefined? 30 * props.size :30 ,
                height:props.size !== undefined? 35 * props.size :35,
                borderStyle:'solid',
                borderColor:'black',
                borderWidth:1,
                borderTopEndRadius:9,
                borderBottomEndRadius:9,
                left:-1}} onPress={() => setNumber(number + 1)}>
                <AntDesign name="plus" color="#000" size={28} />
            </Pressable>
        </View>
    )
}