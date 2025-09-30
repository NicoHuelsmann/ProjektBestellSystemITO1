import {View} from "react-native";
import {Image} from "expo-image";

export function LoginLogo():React.JSX.Element {
    const logoPath = require('../assets/img.png');
    return (
        <View>
            <Image style={{width:225,height:156}} source={logoPath} />
        </View>
    )
}