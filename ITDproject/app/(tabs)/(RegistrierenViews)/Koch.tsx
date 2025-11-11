import React, {useEffect, useState} from "react";
import Wrapper from "@/app/Wrapper";
import {ScrollView, Text, View} from "react-native";
import fetchGetAllCurrentOrder from "@/fetchRequests/fetchGetAllCurrentOrder";
import fetchArtikle from "@/fetchRequests/fetchGetArtikle";
import ThemeChip from "@/app/Themes/Chips/ThemeChip";
import ThemeCheckBox from "@/app/Themes/ThemeCheckBox";
import ProfileIcon from "@/app/(tabs)/(Profile)/profileIcon";
import QRLogin from "@/app/(tabs)/Koch/QRLogin";


export default function Koch():React.JSX.Element{
const [einzelnebestellung,setEinzelnebestellung] = useState<React.JSX.Element[]>([]);

const [currentOrdersValues,setCurrentOrdersValues] = useState<React.JSX.Element[]>([]);

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
                    (a: any) => a.artikelnummer === item.id && item.value > 0
                );
                if (artikel) {
                    orderItems.push(
                        <View key={`${bestellung.orderId}-${artikel.artikelnummer}`}>
                            <Text
                                style={{
                                    borderTopWidth: 1,
                                    borderLeftWidth: 1,
                                    borderRightWidth: 1,
                                    color: "brown",
                                }}
                            >
                                Artikel: {artikel.beschreibung}
                            </Text>

                            <Text
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
            allEinzelneBestellungen.push(
                <View key={bestellung.orderId}>
                    <View style={{ height: 50 }} />

                    <ThemeChip
                        size={{ width: 300, height: 30 + 50 * orderItems.length }}
                        onPress={() => ""}
                    >
                        <Text style={{ fontSize: 18 }}>
                            Bestellnummer {bestellung.orderId}
                        </Text>

                        <Text style={{ fontSize: 14, color: "gray" }}>
                            📅 {new Date(bestellung.date).toLocaleString()}
                        </Text>

                        {orderItems}
                    </ThemeChip>
                </View>
            );
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
        <ProfileIcon open={() => ''} currentState={false}/>
        <View style={{width:'30%',height:'90%',alignItems:'center',shadowColor: '#000',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            bottom:-40,
            left:20
        }}>
            <Text style={{fontSize:24,paddingTop:20}}>Bestellungen</Text>
            <ScrollView style={{}}>
                {einzelnebestellung}
            </ScrollView>
        </View>
        <QRLogin/>
    </Wrapper>
)
}