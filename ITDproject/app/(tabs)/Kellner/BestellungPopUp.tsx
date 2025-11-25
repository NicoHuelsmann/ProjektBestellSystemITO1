import ThemeTrashIcon from "@/app/Themes/Icons/ThemeTrashIcon";
import ThemeButton from "@/app/Themes/ThemeButton";
import ThemeNumberPicker from "@/app/Themes/ThemeNumberPicker";
import ThemePopUp from "@/app/Themes/ThemePopUp";
import fetchClearOrder from "@/fetchRequests/fetchClearOrder";
import fetchArtikle from "@/fetchRequests/fetchGetArtikle";
import fetchGetCurrentOrder from "@/fetchRequests/fetchGetCurrentOrder";
import fetchSetCurrentOrder from "@/fetchRequests/fetchSetCurrentOrder";
import { fetchDelTisch } from "@/fetchRequests/fetchTische";
import { usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
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
    const [Kat,setKat] = useState<string>('');
    const [priceAll,setPriceAll] = useState<number>(0)
    const getArtike = async () => {
        const result = await fetchArtikle()
        console.log(result)
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
        console.log(tableId,result)
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
    const possilbeFood = async (Kat: any) => {
        console.log('possilbeFood')
        const getNumber = await fetchGetCurrentOrder(tableId)
            if (currentArtickel !== undefined && currentArtickel.length > 0) {
                setPriceAll(0)
                setShowFood([])
                await foodPriceCount()
                for (let i = 0; i < currentArtickel.length; i++) {
                    if (currentArtickel[i].kategorie !== Kat && currentArtickel[i].kategorieListe[0] !== Kat) continue;
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
    const del = async () =>  {
        const result = await fetchGetCurrentOrder(tableId);
        if (result) {
            await fetchClearOrder(tableId);
        }
        await fetchDelTisch (tableId);
        onBlur();
    }   
    const pathname = usePathname()
    useEffect(() => {
        if (openBestellungenDialog) possilbeFood(Kat)
        else {
            setKat('')
        }
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

    useEffect(() => {
        if (Kat !== '') {
            possilbeFood(Kat)
        }
    }, [Kat]);

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
                    {Kat === '' ? (
                        <>
                            <ThemeButton text={'Getränke'} onPress={async () => {
                                setShowFood([])
                                setKat('Getränke')
                            }} position={{left:0}} size={{width:120}}/>
                            <ThemeButton text={'Essen'} onPress={async () => {
                                setShowFood([])
                                setKat('Essen')
                            }} position={{left:0}} size={{width:120}}/>
                        </>
                    ) : null}
                    {showFood}
                </ScrollView>
                    <View style={{alignItems:'flex-end',paddingRight:10}}>
                <ThemeButton  text={'OK'} onPress={() => {
                    heandleNumbers()
                    setKat('')
                    onBlur()
                }} position={{bottom: 10}}size={{width:179}}/>
                    </View>
                    <View style={{paddingLeft:10}}>
                        <ThemeButton  text={'Storno'} onPress={()=> {
                            setKat('')
                            storno()
                        }} position={{left:0,bottom:60}} size={{width:179}}/>
                    </View>
                    <View>
                        <ThemeTrashIcon paddingLeft={0} paddingTop={0} bottom={Platform.OS !== 'web'? '2555%':'2116%'} left={10} onPress={del}/>
                    </View>
                </View>
            </ThemePopUp>
        )
    } return <></>
}

