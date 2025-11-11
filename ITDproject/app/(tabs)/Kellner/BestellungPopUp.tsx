import React, {useEffect, useState} from "react";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import {Button, Platform, ScrollView, Text, View} from "react-native";
import ThemeButton from "@/app/Themes/ThemeButton";
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
    const [clearArtikelCount, setClearArtikelCount] = useState<{ id: number; value: number }[]>([]);
    const [currentArtickel, setCurrentArtickel] = useState<any>();
    const [currentStorno,setStorno] = useState<boolean>(false);
    const [priceAll,setPriceAll] = useState<number>(0)
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
        await fetchSetCurrentOrder(tableId, result, new Date().toISOString(),false)
    }
    const foodPriceCount = async () => {
        const save:any[] = [];
        for (let i = 0; clearArtikelCount.length > i; i++){
            const filter = currentArtickel.filter((artikel:any) => artikel.artikelnummer === clearArtikelCount[i].id && clearArtikelCount[i].value > 0);
            if(filter.length > 0){
                const result = filter[0].preis * clearArtikelCount[i].value
                save.push(result)
            }
        }
        const result = save.reduce((acc, aktuelleZahl) => acc + aktuelleZahl, 0)
        setPriceAll(result)
    }
    const possilbeFood = async () => {
        const getNumber = await fetchGetCurrentOrder(tableId)
            if (currentArtickel !== undefined && currentArtickel.length > 0) {
                setPriceAll(0)
                setShowFood([])
                await foodPriceCount()
                for (let i = 0; i < currentArtickel.length; i++) {
                    setShowFood((prev) => [...prev,
                        <View key={currentArtickel[i].artikelnummer}
                              style={{
                                  borderRadius: 9,
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                  width: Platform.OS !== 'web'? 150:110,
                                  height: 110,
                                  shadowColor: '#000',
                                  shadowOffset: {width: 2, height: 2},
                                  shadowOpacity: 0.3,
                                  shadowRadius: 4,
                                  elevation: 5
                              }}>
                            <Text style={{fontSize:18}}>{currentArtickel[i].beschreibung}</Text>
                            <Text style={{fontSize:14,color:'green',bottom:-5}}>Preis: {currentArtickel[i].preis}€</Text>
                            <ThemeNumberPicker bottom={-15} size={Platform.OS !== 'web'? 1.4 :1} setNumer={getNumber !== undefined? getNumber[i].value : 0} return={(e) => heandleReturn(e, currentArtickel[i].artikelnummer)}/>
                        </View>
                    ])

                }
        }
    }
    const storno = async () => {

        await fetchClearOrder(tableId);
        onBlur()
    }
    const pathname = usePathname()
    useEffect(() => {
        if (openBestellungenDialog) possilbeFood()
    }, [openBestellungenDialog])

    useEffect(() => {
        getArtike()
    }, [pathname === '/HomeScreen']);

    useEffect(() => {
        const result: { id: number; value: number }[] = [];
        artikelCount.forEach((value, id) => {
            result.push({id, value});
        });
        setClearArtikelCount(result)
    }, [artikelCount]);

    useEffect(() => {
        const interval = setInterval(async ()=>{
            await foodPriceCount()
        })
        return () =>clearInterval(interval)
    });
    if (openBestellungenDialog) {
        return (
            <ThemePopUp platforme={Platform.OS} onBlur={() => {
                onBlur()
            }}>
                <Text style={{fontSize:28,alignSelf:'center',paddingBottom:5}}>Tisch Nr: {tableId}</Text>
                <Text style={{position:'absolute',paddingTop:50,paddingLeft:10}}>Preis: {priceAll}€</Text>
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
                    <View style={{alignItems:'flex-end',paddingRight:10}}>
                <ThemeButton  text={'OK'} onPress={() => {
                    heandleNumbers()
                    onBlur()
                }} position={{bottom: 10}}size={{width:179}}/>
                    </View>
                    <View style={{paddingLeft:10}}>
                        <ThemeButton  text={'Storno'} onPress={storno} position={{left:0,bottom:60}} size={{width:179}}/>
                    </View>
                </View>
            </ThemePopUp>

        )
    } return <></>
}

