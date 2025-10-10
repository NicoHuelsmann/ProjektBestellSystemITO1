import React from "react";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import {Dimensions, Platform, Text, View} from "react-native";
import ThemeButton from "@/app/Themes/ThemeButton";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
interface addTabelProps {
    addDialogOpen: boolean;
    closeDialog: () => void;
    onSubmit: (tablename:string) => void;
}

export default function AddTabel(props:addTabelProps):React.JSX.Element{
    const { width, height } = Dimensions.get("window");
    const [tablename, setTablename] = React.useState<string>("");

    const add = () => {
        if(tablename.length > 0){
            props.onSubmit(tablename)
            props.closeDialog()
        }

    }

    if(props.addDialogOpen){
        return (
            <ThemePopUp onBlur={props.closeDialog}>
                <Text>Test</Text>
                <ThemeTextInput placeholder={'Tisch Name'} onChangeText={setTablename}/>
                <ThemeButton text={'Hinzufügen'}
                             onPress={add}
                             position={{left:-25,bottom:Platform.OS!== 'web'?-height+(height*0.3):-height+(height*0.55)}}
                             size={{width:150,height:40}}
                             alignSelf={'flex-end'}/>
            </ThemePopUp>


        )
    }else{
        return <View/>
    }


}