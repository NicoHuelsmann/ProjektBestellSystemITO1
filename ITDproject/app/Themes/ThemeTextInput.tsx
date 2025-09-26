
import {TextInput, View} from "react-native";

interface ThemeTextInputProps {
    placeholder: string;
    value?: string;
    onChangeText: (value: string) => void;
}
export default function ThemeTextInput(props: ThemeTextInputProps):React.JSX.Element {

    return (<View style={{height:40,width:200}}>
        <TextInput
            style={{height:40,
                width:200,
                backgroundColor:'#d9d9d9',
                borderRadius:10,
                paddingLeft:10}}
            placeholderTextColor={'#ababab'}
            placeholder={props.placeholder}
            onChangeText={(value: string) => props.onChangeText(value)}/>
    </View>)
}