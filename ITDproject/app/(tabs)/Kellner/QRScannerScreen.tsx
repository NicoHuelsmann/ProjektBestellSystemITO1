import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeType, BarcodeScanningResult } from 'expo-camera';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {getUrl, setUrl} from "@/fetchRequests/config";
import {router} from "expo-router";
import {UserInterface} from "@/interfaces/UserInterface";

export default function QRCodeScannerScreen() {
    const [permission, requestPermission, getPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
        setScanned(true);

        // QR-Daten prüfen
        if (
            result.type.length === 2 &&
            result.data &&
            result.data.toString() !== '{"_h":0,"_i":0,"_j":null,"_k":null}'
        ) {
            setUrl(result.data);
            const a = await asyncStorage.getItem('QRPreSet')
            const body: UserInterface = {
                Benutzername: 'QRCodeLogin',
                Nachname: 'R',
                Role:'Kellner',
                UserID: 0,
                Passwort:'',
                Vorname: 'Q'
            }
            if(a != null){
                await asyncStorage.setItem('user', a);
                router.push('/HomeScreen');
            }
        }
    };

    useEffect(() => {
        (async () => {
            if (permission === null) {
                await requestPermission();
            }
        })();
    }, [permission, requestPermission]);

    if (!permission) {
        // noch keinen Status erhalten
        return <View><Text>…lade Berechtigungen</Text></View>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Kamera‑Zugriff erforderlich</Text>
                <Button title="Erlauben" onPress={() => requestPermission()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],  // QR Code
                }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            {scanned && (
                <View style={styles.overlay}>
                    <Button title="Nochmal scannen" onPress={() => setScanned(false)} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },
});
