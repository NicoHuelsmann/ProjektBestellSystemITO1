import React, {useEffect} from "react";
import Wrapper from "@/app/Wrapper";
import {Dimensions, Platform, Pressable, ScrollView, Text, View} from "react-native";
import ThemeFabButton from "@/app/Themes/ThemeFabButton";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import {router} from "expo-router";
import ThemeChip from "@/app/Themes/Chips/ThemeChip";
import ThemeButton from "@/app/Themes/ThemeButton";
import AddTabel from "@/app/(tabs)/Kellner/AddTabel";
import {DatenbankTischResultInterface} from "@/interfaces/datenbankTischResultInterface";
import {BestellungsInferface} from "@/interfaces/BestellungsInferface";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
import BestellungPopUp from '@/app/(tabs)/Kellner/BestellungPopUp';
import fetchSetCurrentOrder from "@/fetchRequests/fetchSetCurrentOrder";
import fetchGetCurrentOrder from "@/fetchRequests/fetchGetCurrentOrder";
import {data} from "browserslist";
import ProfileIcon from "@/app/(tabs)/(Profile)/profileIcon";
import OpenDialog from "@/app/(tabs)/(Profile)/OpenDialog";
import fetchGetTisch from "@/fetchRequests/fetchGetTisch";
import {url} from "@/fetchRequests/config";
import fetchGetAllCurrentOrder from "@/fetchRequests/fetchGetAllCurrentOrder";


export default function Kellner():React.JSX.Element {
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [openBestellungenDialog, setOpenBestellungenDialog] = React.useState(false);
    const [currendId,setCurrenId] = React.useState<number>(0);
    const[openProfileDialog, setOpenProfileDialog] = React.useState(false);
    const [tabels, setTabels] = React.useState<React.JSX.Element[]>([]);
    const [elementTables,setElementTables] = React.useState<any>([]);
    const [allebestellungen, setAllebestellungen] = React.useState<any>([]);
    const tableOnPressManeger = (taleId:number) => {
        setCurrenId(taleId)
        setOpenBestellungenDialog(true)
    }
    const getTable = async () => {
        const result = await fetchGetTisch();
        if(result !== undefined){
            if(result.Tische !== elementTables){
                setElementTables(null)
                setElementTables(result.Tische);
            }
        }

    }
    useEffect(() => {
        const interval = setInterval( async () => {
            const result = await fetchGetAllCurrentOrder();
            setAllebestellungen(result);
        })
        return () => clearInterval(interval)
    }, []);
      const table = async () => {
          setTabels([])

            for(let i=0; i<elementTables.length; i++){
                let color = 'white'
                allebestellungen.data.forEach((item:any) => {;
                    if(item.ready && elementTables[i].TISCHID === item.orderId){
                        color = 'green'
                    }
                })

                setTabels( (prev) =>[...prev,
                    <ThemeChip backgroundColor={color} key={elementTables[i].TISCHID} alignItems={'center'} size={{width:100,height:150}} onPress={() => tableOnPressManeger(elementTables[i].TISCHID)}>
                        <Text selectable={false} style={{fontSize:60,left:-5}}>{elementTables[i].TISCHID}</Text>
                    </ThemeChip>])
            }
      }
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch(`${url}/getTische`);
                if (res.status === 200) {
                    const data = await res.json();
                    setElementTables(data.Tische);
                } else {
                    throw new Error(`Unable to fetch tables: ${res.status}`);
                }
            } catch (e) {
                console.error(e);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        getTable()
    }, []);
    useEffect(() => {
        
            table()
    }, [elementTables]);

    const [finishedFoodPopUp, setFinishedFoodPopUp] = React.useState(false);
    useEffect(() => {
        const interval = setInterval(async () => {

        },1000)
        return () => clearInterval(interval);

    });
    return (
        <Wrapper>
            <ProfileIcon currentState={openProfileDialog} open={(e) => setOpenProfileDialog(e)}/>
            <ThemeFabButton
                fix={true}
                onPress={() => {
                    setAddDialogOpen(true)
                }}
                alignSelf={'flex-end'}
                position={{left:-2,bottom:-90}}/>
            <View style={{height:'80%',bottom:Platform.OS !== 'web'?-20 :-10}}>
            <ScrollView contentContainerStyle={{width:Platform.OS!== 'web'?'100%':'95%',paddingLeft:Platform.OS!== 'web'? 30:40,paddingRight:Platform.OS!== 'web'? 30:40,flexDirection: 'row', justifyContent: 'flex-start',flexWrap: 'wrap',gap: 16}}>
            {tabels}
        </ScrollView>
                </View>

            {openProfileDialog? <OpenDialog onBlur={() => setOpenProfileDialog(false)}/>:null}


                <AddTabel addDialogOpen={addDialogOpen} closeDialog={() => setAddDialogOpen(false)} onSubmit={table}/>
            {finishedFoodPopUp? <Text style={{fontSize: 60, position: 'absolute'}}>test</Text>:null}
            <BestellungPopUp tableId={currendId} openBestellungenDialog={openBestellungenDialog} onBlur={() => setOpenBestellungenDialog(false)}/>
        </Wrapper>
    )
}