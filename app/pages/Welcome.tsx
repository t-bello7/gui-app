import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Svg, { SvgXml } from 'react-native-svg';
import { Text, Button, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';

type WelcomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList
  >;

type Props = {
  navigation: WelcomeNavigationProp;
};
const svg = `<svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
              <defs>
                <pattern xmlns="http://www.w3.org/2000/svg" id="img1" patternUnits="userSpaceOnUse" width="100%" height="100%">
                  <image xlink:href="https://plus.unsplash.com/premium_photo-1666262369867-6e521a979afb" 
                  xmlns:xlink="http://www.w3.org/1999/xlink" x="-100" y="0" width="20%" height="20%"/>
                </pattern>
              </defs>
              <g transform="translate(455.06909655135337 302.64285767549177)"
              fill="url(#img1)"
              >         
              <path 
              d="M125.2 -126.2C144.4 -106.1 129.7 -53 116.4 -13.3C103.2 26.5 91.4 53 72.2 79C53 105 26.5 130.5 -1.4 131.9C-29.2 133.2 -58.5 110.5 -85.1 84.5C-111.8 58.5 -135.9 29.2 -142.6 -6.7C-149.3 -42.7 -138.7 -85.3 -112 -105.5C-85.3 -125.7 -42.7 -123.3 5.2 -128.5C53 -133.7 106.1 -146.4 125.2 -126.2" 
              stroke="#000000" 
              stroke-width="1">
              </path>
              </g>
              </svg>
              `

const Welcome = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();
  return (
    <View style={styles.container}>
      <SvgXml xml={svg} />
      <Text style={styles.headline}>
        View and Buy Good Quality Food and Fruits
      </Text>
      <Text>
        Enjoy the ease of buying Quality fruits form the gui app
      </Text>
      <Button
        title="Go to scan page"
        onPress={() => navigation.navigate('tab')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    color: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  headline: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center'
  }
})
export default Welcome;

