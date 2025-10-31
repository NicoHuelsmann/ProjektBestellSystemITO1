import React, {useEffect, useState} from "react";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import {Platform, ScrollView, Text, View} from "react-native";
import ThemeTextInput from "@/app/Themes/ThemeTextInput";
import ThemeButton from "@/app/Themes/ThemeButton";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import fetchArtikle from "@/fetchRequests/fetchGetArtikle";
import ThemeNumberPicker from "@/app/Themes/ThemeNumberPicker";
import {router, usePathname} from "expo-router";
import fetchGetCurrentOrder from "@/fetchRequests/fetchGetCurrentOrder";
import fetchSetCurrentOrder from "@/fetchRequests/fetchSetCurrentOrder";
import fetchClearOrder from "@/fetchRequests/fetchClearOrder";
interface BestellungPopUpProps {
    tableId:number;
    openBestellungenDialog:boolean;
    onBlur: () => void
}
export default function BestellungPopUp({tableId,openBestellungenDialog, onBlur}:BestellungPopUpProps):React.JSX.Element{
    const [showFood, setShowFood] = useState<React.JSX.Element[]>([]);
    const [artikelCount, setArtikelCount] = useState<Map<number, number>>(new Map());
    const [currentArtickel, setCurrentArtickel] = useState<any>();
    const getArtike = async () => {
        const result = await fetchArtikle()
        setCurrentArtickel(result)
    }
    const heandleReturn = (numberPickerValue: number, arikelId: number) => {
        setArtikelCount((prev) => {
            const newMap = new Map(prev);
            newMap.set(arikelId, numberPickerValue);
            return newMap;
        });
    }

    const heandleNumbers = async () => {
        const result: { id: number; value: number }[] = [];

        artikelCount.forEach((value, id) => {
            result.push({id, value});
        });


        await fetchClearOrder(tableId);
        await fetchSetCurrentOrder(tableId, result)
    }

    const possilbeFood = async () => {
        const getNumber = await fetchGetCurrentOrder(tableId)
            if (currentArtickel.length > 0) {
                setShowFood([])
                for (let i = 0; i < currentArtickel.length; i++) {
                    setShowFood((prev) => [...prev,
                        <View key={currentArtickel[i].artikelnummer}
                              style={{
                                  borderRadius: 9,
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                  width: Platform.OS !== 'web'? 150:110,
                                  height: 100,
                                  shadowColor: '#000',
                                  shadowOffset: {width: 2, height: 2},
                                  shadowOpacity: 0.3,
                                  shadowRadius: 4,
                                  elevation: 5
                              }}>
                            <Text>{currentArtickel[i].beschreibung}</Text>
                            <Text>{currentArtickel[i].preis}€</Text>
                            <ThemeNumberPicker size={Platform.OS !== 'web'? 1.4 :1} setNumer={getNumber !== undefined ? getNumber[i].value : 0}
                                               return={(e) => heandleReturn(e, currentArtickel[i].artikelnummer)}/>
                        </View>
                    ])

                }
        }


    }
    const pathname = usePathname()
    useEffect(() => {
        if (openBestellungenDialog) possilbeFood()
    }, [openBestellungenDialog])
    useEffect(() => {
        getArtike()
    }, [pathname === '/HomeScreen']);

    const getStorage = async () => {
        return asyncStorage.getItem(`bestellung${tableId}`);
    }
    const addStorage = async () => {
        asyncStorage.setItem(`bestellung${tableId}`, JSON.stringify(''));
    }
    if (openBestellungenDialog) {
        return (
            <ThemePopUp platforme={Platform.OS} onBlur={() => {
                onBlur()
            }}>
                <Text style={{fontSize:28,alignSelf:'center',paddingBottom:5}}>Tisch Nr: {tableId}</Text>
                <View style={{borderStyle:'solid',borderBottomWidth:2}}/>
                <View>
                <ScrollView  contentContainerStyle={{
                    width: '100%',
                    height: Platform.OS !== 'web'? '80%':480,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 16,
                    paddingTop:10,
                    paddingLeft: Platform.OS !== 'web'? 35:10,
                    paddingRight: Platform.OS !== 'web'? 35:10,
                }}>
                    {showFood}
                </ScrollView>
                <ThemeButton text={'OK'} onPress={() => {
                    heandleNumbers()
                    onBlur()
                }} position={{left: 180, bottom: 10}}/>
                </View>
            </ThemePopUp>

        )
    } return <></>
}

