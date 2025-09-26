import Wrapper from "@/app/Wrapper";
import {TextInput} from "react-native";

interface ThemeTextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText: (value: string) => void;
}
export default function ThemeTextInput(props: ThemeTextInputProps) {

    return (<Wrapper>
        <TextInput onChangeText={(value: string) => props.onChangeText(value)}/>
    </Wrapper>)
}