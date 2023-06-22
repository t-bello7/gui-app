import { useCallback, useContext, useRef } from 'react';
import { Dimensions,
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  Button,
  } from 'react-native';
import moment from 'moment';
import { SvgXml } from 'react-native-svg';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContext } from '../../App';
import DisplayCard from '../components/DisplayCard';
import Carousel from '../components/Carousel';
import BottomSheet from '../components/BottomSheet';

const profileSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="profile">
    <g fill="#595bd4" transform="translate(3 2)" class="color200e32 svgShape">
    <ellipse cx="9" cy="5.556" opacity=".4" rx="5.625" ry="5.556" fill="#fe9526" class="color000000 svgShape">
    </ellipse>
    <path d="M17.9902354,16.6757991 L17.9902354,16.6757991 C17.9953097,16.5967226 17.9953097,16.5174327 17.9902354,16.4383562 C17.9679741,16.1461262 17.885058,15.8607505 17.7461199,15.5981735 C17.1993012,14.5296804 15.6662559,14.0456621 14.3870907,13.7716895 C13.4744565,13.5817014 12.5471782,13.4595545 11.6139387,13.4063927 L10.6374767,13.3333333 L10.1980688,13.3333333 L9.6512501,13.3333333 L8.34279105,13.3333333 L7.79597234,13.3333333 L7.35656445,13.3333333 L6.38010248,13.4063927 C5.44686291,13.4595545 4.51958466,13.5817014 3.60695046,13.7716895 C2.32778527,14.0091324 0.794739971,14.5022831 0.247921264,15.5981735 C0.10898315,15.8607505 0.0260670984,16.1461262 0.00380576968,16.4383562 C-0.00126858989,16.5174327 -0.00126858989,16.5967226 0.00380576968,16.6757991 L0.00380576968,16.6757991 C-0.000879294659,16.7548861 -0.000879294659,16.834155 0.00380576968,16.913242 C0.0303656032,17.2029741 0.116574533,17.4851701 0.257685884,17.7442922 C0.804504591,18.8127854 2.33754989,19.2968037 3.61671508,19.5707763 C4.53104892,19.7518719 5.45762024,19.8739256 6.3898671,19.9360731 L7.36632907,20 L7.60067995,20 L7.80573696,20 L10.2078334,20 L10.4128904,20 L10.6472413,20 L11.6237033,19.9360731 C12.5559501,19.8739256 13.4825215,19.7518719 14.3968553,19.5707763 C15.6760205,19.3242009 17.2090658,18.8401826 17.7558845,17.7442922 C17.890425,17.4769528 17.9730826,17.1893744 18,16.8949772 C18.0012406,16.8218031 17.9979804,16.748623 17.9902354,16.6757991 Z" fill="#fe9526" class="color000000 svgShape">
    </path>
    </g>
</svg>
`
export const responsiveWidth = (width: any) => {
    return (Dimensions.get('window').width * width) / widthMobileUI;
  };
  
  export const responsiveHeight = (height : any) => {
    return (Dimensions.get('window').height * height) / heightMobileUI;
  };

const heightMobileUI = 896;
const widthMobileUI = 414;

const carouselData = [
  {
    image: require('../assets/imgs/pineapple.jpg')
  },
  {
    image: require('../assets/imgs/pineapple.jpg')
  },
  {
    image: require('../assets/imgs/pineapple.jpg')
  },
  {
    image: require('../assets/imgs/pineapple.jpg')
  }
]

const Home = () => {
    const theme = useContext(ThemeContext);
    const { height } = useWindowDimensions();
    const bottomSheetRef: any = useRef(null);
    const styles = getStyles(theme);

    const openHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
      }
    ,[])
    
    return (
      <GestureHandlerRootView>
        <View style={styles.container}>
          <View style={styles.header}>
              <Button title='Open' onPress={() => {
                openHandler();
              }}/>
              <View style={styles.profileImage}>
                  <SvgXml xml={profileSvg} />
              </View>
              <View>
                  <Text>
                  {moment().format("MMMM DD")} 
                  </Text>
                  <Text style={styles.headline}>
                      Eat Healthy Today
                  </Text>
              </View>
          </View>
          <View style={styles.banner_container}>
              <Carousel data={carouselData} />
          </View>

          <View style={styles.categories_container}>
              <Text> Fruit Categories </Text>
              <View style={styles.categories}>
                  <DisplayCard size='half' name='Apples' />
                  <DisplayCard size='half' name='Banannas'/>
                  <DisplayCard name='Pea'/>
              </View>
          </View>
        </View>
        <BottomSheet activeHeight={height * 0.5 } ref={bottomSheetRef}/>
      </GestureHandlerRootView>
    )   
}

const getStyles = (theme: any) => StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginBottom: 40,
    },
    banner_container: {
        marginBottom: 40
    },
    categories_container: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },

    categories: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
        width: '100%'
    },
    container: {
      display: "flex",
      flexDirection: "column",
      marginTop: 30,
      marginRight: 20,
      marginLeft: 20,
      color: "black",
    //   backgroundColor: theme.colors.background,
      fontFamily:"Poppins-Regular",
      height: "100%",
    },
    profileImage: {
        width: responsiveWidth(60),
        height: responsiveHeight(60)
    },
    headline: {
      fontWeight: '700',
      fontSize: 24,
    }
  })

export default Home;