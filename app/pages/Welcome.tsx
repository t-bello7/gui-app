import { useContext } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import { Text,Image, StyleSheet, View, FlatList, useWindowDimensions } from 'react-native';
import { RootStackParamList, ThemeContext } from '../../App';
import IconButton from '../components/IconButton';
import data from '../assets/data/data';

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
              fill = "#fcd06b"
              >         
                <path 
                d="M125.2 -126.2C144.4 -106.1 129.7 -53 116.4 -13.3C103.2 26.5 91.4 53 72.2 79C53 105 26.5 130.5 -1.4 131.9C-29.2 133.2 -58.5 110.5 -85.1 84.5C-111.8 58.5 -135.9 29.2 -142.6 -6.7C-149.3 -42.7 -138.7 -85.3 -112 -105.5C-85.3 -125.7 -42.7 -123.3 5.2 -128.5C53 -133.7 106.1 -146.4 125.2 -126.2" 
                stroke-width="1">
                </path>
              </g>
              </svg>
              `
const nextSvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
    <path d="m480 896-42-43 247-247H160v-60h525L438 299l42-43 320 320-320 320Z"/>
</svg>
`
const Welcome = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const navigation = useNavigation<WelcomeNavigationProp>();
  const theme = useContext(ThemeContext)
  const x  = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
      // console.log(x.value)
    }
  });
  const styles = getStyles(theme)
  const handleNextPress = () => {
    navigation.navigate('tab')
  } 
  const renderItem = ({item, index}: any) => {
    return (
      <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
        <Image source={item.image} style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8 }}/>
        <View>
          <Text style={styles.itemTitle}> {item.title} </Text>
          <Text style={styles.itemText}> {item.text} </Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* <SvgXml xml={svg} />
      <Text style={styles.headline}>
        Welcome to More!
      </Text>
      <Text style={styles.subheading}>
        Enjoy the ease of buying Quality fruits form the gui app
      </Text> */}
      <FlatList
      onScroll={onScroll}
      data={data}
      renderItem={renderItem} 
      keyExtractor={item => item.id}
      horizontal
      bounces={false}
      scrollEventThrottle={16}
      pagingEnabled={true}
      style={{display:'flex'}}
      showsHorizontalScrollIndicator={false}
      />
      <IconButton icon={nextSvg} handleOnPress={handleNextPress}/>
    </View>
  )
}
const getStyles = (theme: any) => StyleSheet.create({
  itemContainer: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemTitle: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold'
  },
  itemText: {
    color: 'black',
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 35
  },
  container: {
    display: "flex",
    flexDirection: "column",
    color: "black",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    fontSize: 30,
    fontFamily: 'roboto',
  },
  headline: {
    fontSize: 30,
    fontFamily: 'nunito',
    // fontWeight: 'bold',
    // fontWeight: 'nmal',
    textAlign: 'center'
  },
  subheading: {
    fontSize: 16,
    fontFamily: 'nunito'
  },
  nextButton : {
    // color: theme.colors.white,
    backgroundColor: theme.colors.background,
    borderRadius: 100 / 2,
    width: 50,
    height: 50,
    elevation: 3,
  }
})
export default Welcome;

