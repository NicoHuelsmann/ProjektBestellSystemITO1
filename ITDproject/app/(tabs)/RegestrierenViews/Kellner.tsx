import React, {useEffect} from "react";
import Wrapper from "@/app/Wrapper";
import {Dimensions, Platform, Text, View} from "react-native";
import ThemeFabButton from "@/app/Themes/ThemeFabButton";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import {router} from "expo-router";
import ThemeChip from "@/app/Themes/Chips/ThemeChip";
import ThemeButton from "@/app/Themes/ThemeButton";
import AddTabel from "@/app/(tabs)/Kellner/AddTabel";
import {DatenbankTischResultInterface} from "@/interfaces/datenbankTischResultInterface";
import {BestellungsInferface} from "@/interfaces/BestellungsInferface";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";

export default function Kellner():React.JSX.Element {
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [openBestellungenDialog, setOpenBestellungenDialog] = React.useState(false);
    const [currendId,setCurrenId] = React.useState<number>(0);
    const [currentBestellungen, setCurrentBestellungen] = React.useState<BestellungsInferface[]>();
    const [showBestellungen, setShowBestellungen] = React.useState<BestellungsInferface>();
    const [tabels, setTabels] = React.useState<React.JSX.Element[]>([
        <ThemeChip key={'Table'} onPress={() => tableOnPressManeger(1)}>
        <Text>1</Text>
        <Text>Test</Text>
    </ThemeChip>]);

        // fetch zum aufrufen der Tische

    const tableOnPressManeger = (taleId:number) => {
        setOpenBestellungenDialog(true)
    }

      const table = () => {
            const datenbankTischResult:DatenbankTischResultInterface[] = []
            for(let i=0; i<datenbankTischResult.length; i++){
                setTabels(
                    [<ThemeChip key={'Table'} onPress={() => tableOnPressManeger(datenbankTischResult[i].tableId)}>
                        <Text>{datenbankTischResult[i].tableId}</Text>
                        <Text>{datenbankTischResult[i].tableName}</Text>
                    </ThemeChip>])
            }
      }
    useEffect(() => {
        table()
    }, []);
const [testData,setTestData] = React.useState<any>([]);
    return (
        <Wrapper>
            <ThemeFabButton
                fix={true}
                onPress={() =>setAddDialogOpen(true)}
                alignSelf={'flex-end'}
                position={{left:-2,bottom:-90}}/>

            {tabels}
            <AddTabel addDialogOpen={addDialogOpen} closeDialog={() => setAddDialogOpen(false)} onSubmit={table}/>
        </Wrapper>
    )
}