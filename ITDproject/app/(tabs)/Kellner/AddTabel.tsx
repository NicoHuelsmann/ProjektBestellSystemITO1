import React from "react";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import {Dimensions, Platform, Text, View} from "react-native";
import ThemeButton from "@/app/Themes/ThemeButton";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
import fetchSetTable from "@/fetchRequests/fetchSetTisch";
interface addTabelProps {
    addDialogOpen: boolean;
    closeDialog: () => void;
    onSubmit: (tablename:string) => void;
}

export default function AddTabel(props:addTabelProps):React.JSX.Element{
    const { width, height } = Dimensions.get("window");
    const [tablename, setTablename] = React.useState<string>("");

    const add = async () => {
        await fetchSetTable()
        props.closeDialog()
    }

    if(props.addDialogOpen){
        return (
            <ThemePopUp platforme={Platform.OS} onBlur={props.closeDialog}>
                <Text>Möchten sie einen Tisch hinzufügen ? </Text>
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