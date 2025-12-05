import OpenDialog from "@/app/(tabs)/(Profile)/OpenDialog";
import QRLogin from "@/app/(tabs)/Koch/QRLogin";
import ThemeChip from "@/app/Themes/Chips/ThemeChip";
import ThemeButton from "@/app/Themes/ThemeButton";
import ThemeCheckBox from "@/app/Themes/ThemeCheckBox";
import Wrapper from "@/app/Wrapper";
import fetchClearOrder from "@/fetchRequests/fetchClearOrder";
import fetchGetAllCurrentOrder from "@/fetchRequests/fetchGetAllCurrentOrder";
import fetchArtikle from "@/fetchRequests/fetchGetArtikle";
import fetchSetCurrentOrder from "@/fetchRequests/fetchSetCurrentOrder";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ProfileIcon from "../(Profile)/profileIcon";
import {bestellungenBackground} from "@/constants/Colors";
import ThemeTime from "@/app/Themes/ThemeTime";


export default function Koch():React.JSX.Element{
const [einzelnebestellung,setEinzelnebestellung] = useState<React.JSX.Element[]>([]);
    const [open,setOpen] = React.useState<boolean>(false);

const heandleDone = async (currentOrder:any) => {
     await fetchClearOrder(currentOrder.orderId)
     await fetchSetCurrentOrder(currentOrder.orderId,currentOrder.data,currentOrder.date,'green')
}

    const getAllBestellungen = async () => {
        const orders = await fetchGetAllCurrentOrder();
        const getArtikel = await fetchArtikle();

        if (!orders?.data) return;

        // 🔹 1. Filtern: nur Bestellungen mit Artikeln > 0
        const filteredOrders = orders.data.filter(
            (bestellung: any) =>
                bestellung.data && bestellung.data.some((artikel: any) => artikel.value > 0)
        );
        // 🔹 2. Sortieren nach Datum (älteste zuerst)
        const sortedOrders = filteredOrders.sort(
            (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const allEinzelneBestellungen: React.JSX.Element[] = [];

        // 🔹 3. Schleife über jede sortierte Bestellung
        for (const bestellung of sortedOrders) {
            const orderItems: React.JSX.Element[] = [];

            for (const item of bestellung.data) {
                const artikel = getArtikel.find(
                    (a: any) => a.artikelnummer === item.artikelnummer && item.value > 0
                );
                console.log('artikel',artikel)
                if (artikel != null) {
                    orderItems.push(
                        <View key={`${bestellung.orderId}-${artikel.artikelnummer}`}>
                            <Text selectable={false}
                                style={{
                                    borderTopWidth: 1,
                                    borderLeftWidth: 1,
                                    borderRightWidth: 1,
                                    color: "brown",
                                }}
                            >
                                Artikel: {artikel.beschreibung}
                            </Text>

                            <Text selectable={false}
                                style={{
                                    borderBottomWidth: 1,
                                    borderLeftWidth: 1,
                                    borderRightWidth: 1,
                                    color: "green",
                                }}
                            >
                                Anzahl: {item.value}
                            </Text>

                            <View>
                                <ThemeCheckBox
                                    alignSelf={"flex-end"}
                                    position={{ left: 150, bottom: 5 }}
                                />
                            </View>

                            <View style={{ height: 5 }} />
                        </View>
                    );
                }
            }

            // 🔹 4. Bestellung-Container erstellen
            if(bestellung.ready !== 'green'){
                allEinzelneBestellungen.push(
                    <View key={bestellung.orderId}>
                        <View style={{ height: 50 }} />

                        <ThemeChip
                            size={{ width: 300, height: 30 + 50 * orderItems.length }}
                            onPress={() => ""}
                        >
                            <Text selectable={false} style={{ fontSize: 18 }}>
                                Bestellnummer {bestellung.orderId}
                            </Text>

                            <Text selectable={false} style={{ fontSize: 14, color: "gray" }}>
                                📅 {new Date(bestellung.date).toLocaleString()}
                            </Text>

                            {orderItems}
                            <View>
                                <ThemeButton movable={'absolute'} text={'Done'} onPress={() => heandleDone(bestellung)} size={{width:50,height:40}} position={{left:210,bottom:10}}/>
                            </View>
                        </ThemeChip>
                    </View>
                );
            }

        }

        // 🔹 5. Nur einmal State setzen
        setEinzelnebestellung(allEinzelneBestellungen);
    };

    useEffect(()=>{
        const interval = setInterval(() =>{
            getAllBestellungen()
        },1000)
        return () => clearInterval(interval)
    })
return (
    <Wrapper>
        <ProfileIcon open={() => setOpen(!open)} currentState={open}/>
        <ThemeTime/>
        <View style={{width:'30%',height:'90%',alignItems:'center',shadowColor: '#000',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            bottom:-40,
            left:20,
            backgroundColor:bestellungenBackground,
            borderRadius:40
        }}>
            <Text selectable={false} style={{fontSize:24,paddingTop:20}}>Bestellungen</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                {einzelnebestellung}
            </ScrollView>
        </View>
        <View style={{width:150,height:150,alignItems:'center',shadowColor: '#000',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            bottom:'80%',
            left:'60%',
            backgroundColor:bestellungenBackground,
            borderRadius:40,
        }}>
            <QRLogin/>
        </View>
        {open? <OpenDialog position={{left:'-1%',bottom:'100%'}} onBlur={() => setOpen(false)}/>:null}

    </Wrapper>
)
}