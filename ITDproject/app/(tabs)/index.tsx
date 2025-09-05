import {Platform, StyleSheet, Text} from 'react-native';
import ThemeButton from "@/app/Themes/ThemeButton";
import Wrapper from '../Wrapper'

export default function HomeScreen() {
  return (
   <Wrapper>
       <ThemeButton text={'test'} onPress={() => ''} position={{left:0,bottom:0}}/>

   </Wrapper>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
