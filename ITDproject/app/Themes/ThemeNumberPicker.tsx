<<<<<<< Updated upstream
import React, {useEffect, useLayoutEffect} from "react";
import {Pressable, Text, View} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
interface ThemeNumberPickerProps {
    setNumer?:number,
    return: (n:number) => void
}
export default function ThemeNumberPicker(props:ThemeNumberPickerProps): React.JSX.Element{
=======
import React, {useLayoutEffect} from "react";
import {Pressable, Text, View} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ThemeNumberPicker(): React.JSX.Element{
>>>>>>> Stashed changes
    const [number, setNumber] = React.useState<number>(0);
    useLayoutEffect(() => {
        if(number < 0){
            setNumber(0)
        }
<<<<<<< Updated upstream
        props.return(number)
    },[number])
    useEffect(() => {
        if(props.setNumer !== undefined) setNumber(props.setNumer)
    }, [props.setNumer]);
=======
    },[number])
>>>>>>> Stashed changes
    return(
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Pressable style={{left:-5}} onPress={() => setNumber(number - 1)}>
                <AntDesign name="minus" color="#000" size={18} />
            </Pressable>
            <Text>{number}</Text>
            <Pressable style={{left:5}} onPress={() => setNumber(number + 1)}>
                <AntDesign name="plus" color="#000" size={18} />
            </Pressable>
        </View>
    )
}