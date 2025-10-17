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
import BestellungPopUp from "@/app/(tabs)/Kellner/BestellungPopUp";
<<<<<<< Updated upstream
import fetchSetCurrentOrder from "@/fetchRequests/fetchSetCurrentOrder";
import fetchGetCurrentOrder from "@/fetchRequests/fetchGetCurrentOrder";
import {data} from "browserslist";
=======
>>>>>>> Stashed changes

export default function Kellner():React.JSX.Element {
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [openBestellungenDialog, setOpenBestellungenDialog] = React.useState(false);
    const [currendId,setCurrenId] = React.useState<number>(0);

    const [tabels, setTabels] = React.useState<React.JSX.Element[]>([]);

        // fetch zum aufrufen der Tische

    const tableOnPressManeger = (taleId:number) => {
        setCurrenId(taleId)
        setOpenBestellungenDialog(true)
    }

      const table = () => {
            const datenbankTischResult:any[] = [{tableId: 1},{tableId:2},{tableId:3}]
            for(let i=0; i<datenbankTischResult.length; i++){
                setTabels( (prev) =>[...prev,
                    <ThemeChip key={datenbankTischResult[i].tableId} alignItems={'center'} size={{width:100,height:150}} onPress={() => tableOnPressManeger(datenbankTischResult[i].tableId)}>
                        <Text selectable={false} style={{fontSize:60,left:-5}}>{datenbankTischResult[i].tableId}</Text>
                    </ThemeChip>])
            }
      }
      const test = async () => {
          console.log(await fetchSetCurrentOrder(1, {test:'a'}));
      }
    const test1 = async () => {
        console.log(await fetchGetCurrentOrder(1));
    }
    useEffect(() => {
        setTabels([])
        table()
    }, []);
    return (
        <Wrapper>

            <ThemeFabButton
                fix={true}
                onPress={() => {
                    setAddDialogOpen(true)
                }}
                alignSelf={'flex-end'}
                position={{left:-2,bottom:-90}}/>
            <View style={{height:'100%',width:'100%',paddingLeft:40,paddingRight:40,flexDirection: 'row', justifyContent: 'flex-start',flexWrap: 'wrap',gap: 16 }}>
                {tabels}
            </View>


            <AddTabel addDialogOpen={addDialogOpen} closeDialog={() => setAddDialogOpen(false)} onSubmit={table}/>
            <BestellungPopUp tableId={currendId} openBestellungenDialog={openBestellungenDialog} onBlur={() => setOpenBestellungenDialog(false)}/>
        </Wrapper>
    )
}