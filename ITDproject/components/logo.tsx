import {View} from "react-native";
import {Image} from "expo-image";

export function Logo():React.JSX.Element {
    const logoPath = require('../assets/logo.png');
    return (
        <View>
            <Image style={{width:100,height:100}} source={logoPath} />
        </View>
    )
}