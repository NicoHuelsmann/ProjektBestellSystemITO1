import OpenDialog from "@/app/(tabs)/(Profile)/OpenDialog";
import ProfileIcon from "@/app/(tabs)/(Profile)/profileIcon";
import AddTabel from "@/app/(tabs)/Kellner/AddTabel";
import BestellungPopUp from '@/app/(tabs)/Kellner/BestellungPopUp';
import ThemeChip from "@/app/Themes/Chips/ThemeChip";
import ThemeFabButton from "@/app/Themes/ThemeFabButton";
import Wrapper from "@/app/Wrapper";
import { url } from "@/fetchRequests/config";
import fetchGetAllCurrentOrder from "@/fetchRequests/fetchGetAllCurrentOrder";
import { fetchGetTisch } from "@/fetchRequests/fetchTische";
import React, { useEffect } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import ThemeTime from "@/app/Themes/ThemeTime";


export default function Kellner():React.JSX.Element {
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [openBestellungenDialog, setOpenBestellungenDialog] = React.useState(false);
    const [currendId,setCurrenId] = React.useState<number>(0);
    const [openProfileDialog, setOpenProfileDialog] = React.useState(false);
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
                if(allebestellungen.data != null){
                    allebestellungen.data.forEach((item:any) => {;
                        if(item.ready && elementTables[i].TISCHID === item.orderId){
                            color = 'green'
                        }
                    })
                }


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
    return (
        <Wrapper>
            <ProfileIcon currentState={openProfileDialog} open={(e) => setOpenProfileDialog(e)}/>
            <ThemeTime/>
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

            {openProfileDialog? <OpenDialog position={{left:'-1%',bottom:'75%'}} onBlur={() => setOpenProfileDialog(false)}/>:null}


                <AddTabel addDialogOpen={addDialogOpen} closeDialog={() => setAddDialogOpen(false)} onSubmit={table}/>
            <BestellungPopUp tableId={currendId} openBestellungenDialog={openBestellungenDialog} onBlur={() => setOpenBestellungenDialog(false)}/>
        </Wrapper>
    )
}