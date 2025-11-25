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
interface BestellungItem {
    artikelnummer: number;
    value: number;
}
export default function BestellungPopUp({tableId,openBestellungenDialog, onBlur}:BestellungPopUpProps):React.JSX.Element{
    const [showFood, setShowFood] = useState<React.JSX.Element[]>([]);
    const [Bestellung, setBestellung] = useState<BestellungItem[]>([]);
    const [currentArtickel, setCurrentArtickel] = useState<any>();
    const [Kat,setKat] = useState<string>('');
    const [priceAll,setPriceAll] = useState<number>(0);

    const getArtike = async () => {
        const result = await fetchArtikle()
        setCurrentArtickel(result)
    }

    const heandleReturn = (numberPickerValue: number, arikelId: number) => {
        setBestellung((prev) => {
            return prev.map((item) => {
                if (item.artikelnummer === arikelId) {
                    return { ...item, value: numberPickerValue };
                }
                return item;
            });
        });
    }

    const SendOrder = async () => {
        console.log('Bestellung to save:', Bestellung);
        console.log(new Date().toISOString());
        await fetchSetCurrentOrder(tableId, Bestellung, new Date().toISOString(),false)
    }

    // Abhängigkeit: Diese Funktion verwendet den aktuellen 'Bestellung' State
    const foodPriceCount = async () => {
        if (!Array.isArray(Bestellung)) {
             setPriceAll(0);
             return;
        }
        const save:any[] = [];
        // Iteriere über den aktuellen Bestellung State
        for (let i = 0; Bestellung.length > i; i++){
            // Suche den Artikel im 'currentArtickel' Array
            const filter = currentArtickel.filter((artikel:any) => artikel.artikelnummer === Bestellung[i].artikelnummer && Bestellung[i].value > 0);
            
            if(filter.length > 0){
                // Berechnung: Preis * Menge (value)
                const result = filter[0].preis * Bestellung[i].value
                save.push(result)
            }
        }
        const result = save.reduce((acc, aktuelleZahl) => acc + aktuelleZahl, 0)
        setPriceAll(result)
    }

    const possilbeFood = async (Kat: any) => {
        setShowFood([])
        for (let i = 0; i < currentArtickel.length; i++) {
            if (currentArtickel[i].kategorie !== Kat && currentArtickel[i].kategorieListe[0] !== Kat) continue;
            const currentItem = Bestellung.find(item => item.artikelnummer === currentArtickel[i].artikelnummer);
            const initialValue = currentItem ? currentItem.value : 0;
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
                    <ThemeNumberPicker 
                        bottom={-15} 
                        size={Platform.OS !== 'web'? 1.4 :1} 
                        setNumer={initialValue} 
                        return={(e) => heandleReturn(e, currentArtickel[i].artikelnummer)}/>
                </View>
            ])

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
        const loadinitialData = async () => {
            // 1. Zuerst States leeren, um von einem sauberen Blatt zu starten
            setBestellung([]);
            setShowFood([]); // Wurde in der vorherigen Antwort hinzugefügt

            // 2. Artikel laden
            const resultArtikle = await fetchArtikle();
            setCurrentArtickel(resultArtikle);

            // 3. Versuchen, die aktuelle Bestellung zu laden
            const resultOrder = await fetchGetCurrentOrder(tableId);

            if (resultOrder) {
                // FALL 1: Bestellung existiert, State direkt setzen
                setBestellung(resultOrder.data);
            } else {
                // FALL 2: Bestellung existiert NICHT, State mit 0 initialisieren
                const initialBestellung: BestellungItem[] = [];
                // Verwenden Sie resultArtikle direkt, da es geladen wurde
                for (let i = 0; i < resultArtikle?.length; i++) {
                    initialBestellung.push({artikelnummer: resultArtikle[i].artikelnummer, value: 0});
                }
                setBestellung(initialBestellung);
            }
        }
        
        if (openBestellungenDialog) {
            loadinitialData();
        }
        else {
            setKat('');
            setShowFood([]);
        }
    }, [openBestellungenDialog]);

    useEffect(() => {
        getArtike()
    }, [pathname === '/HomeScreen']);

    useEffect(() => {
        if (Kat !== '') {
            // Dies wird ausgelöst, wenn der Benutzer die Kategorie wählt ("Getränke" oder "Essen")
            possilbeFood(Kat)
        }
    }, [Kat]);

    useEffect(() => {
        // 1. Rufe foodPriceCount auf, wenn sich die Bestellung ändert (IMMER erforderlich)
        foodPriceCount()
    }, [Bestellung]); // Reagiere auf Änderungen im State 'Bestellung'

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
                                setKat('Getränke')
                            }} position={{left:0}} size={{width:120}}/>
                            <ThemeButton text={'Essen'} onPress={async () => {
                                setKat('Essen')
                            }} position={{left:0}} size={{width:120}}/>
                        </>
                    ) : null}
                    {showFood}
                </ScrollView>
                    <View style={{alignItems:'flex-end',paddingRight:10}}>
                <ThemeButton  text={'OK'} onPress={() => {
                    SendOrder()
                    //setKat('')
                    onBlur()
                }} position={{bottom: 10}}size={{width:179}}/>
                    </View>
                    <View style={{paddingLeft:10}}>
                        <ThemeButton  text={'Storno'} onPress={()=> {
                            //setKat('')
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