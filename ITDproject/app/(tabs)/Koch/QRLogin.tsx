import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {url} from '../../../fetchRequests/config'
export default function QRLogin():React.JSX.Element{

    const qrString = url;

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <QRCode
                value={qrString}      // Dein String hier
                size={100}            // QR-Größe
                color="black"         // Farbe des Codes
                backgroundColor="white"
            />
        </View>
    );
}