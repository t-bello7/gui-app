import React, {useState, useEffect} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {theme, darkTheme} from './app/assets/theme';
import Welcome from './app/pages/Welcome';
import SplashScreen from 'react-native-splash-screen';
import Scan from './app/pages/Scan';
import History from './app/pages/History';
import Home from './app/pages/Home';




export type RootStackParamList = {
  welcome:  undefined,
  scan: undefined,
  tab: undefined
}

type TabStackParamList = {
  scan: RootStackParamList,
  history: undefined,
  home: undefined
}

export type ThemeContextType = {
  colors: {
    background: string
  }
}

export const ThemeContext = React.createContext<ThemeContextType | {}>({})

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const Tab = createBottomTabNavigator<TabStackParamList>();

const homeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
  <path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/>
</svg>
`

const textSvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
  <path d="M480 763q-77.605 0-132.302-54.698Q293 653.605 293 576q0-77.605 54.698-132.302Q402.395 389 480 389q77.605 0 132.302 54.698Q667 498.395 667 576q0 77.605-54.698 132.302Q557.605 763 480 763Zm0-60q54 0 90.5-36.5T607 576q0-54-36.5-90.5T480 449q-54 0-90.5 36.5T353 576q0 54 36.5 90.5T480 703ZM180 936q-24 0-42-18t-18-42V704h60v172h172v60H180Zm428 0v-60h172V704h60v172q0 24-18 42t-42 18H608ZM120 448V276q0-24 18-42t42-18h172v60H180v172h-60Zm660 0V276H608v-60h172q24 0 42 18t18 42v172h-60ZM480 576Z"/>
</svg>
`

const historySvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M109.912 816Q81 816 60.5 795.411 40 774.823 40 745.911 40 717 60.494 696.5t49.273-20.5q5.233 0 10.233.5 5 .5 13 2.5l200-200q-2-8-2.5-13t-.5-10.233q0-28.779 20.589-49.273Q371.177 386 400.089 386 429 386 449.5 406.634t20.5 49.61Q470 458 467 479l110 110q8-2 13-2.5t10-.5q5 0 10 .5t13 2.5l160-160q-2-8-2.5-13t-.5-10.233q0-28.779 20.589-49.273Q821.177 336 850.089 336 879 336 899.5 356.589q20.5 20.588 20.5 49.5Q920 435 899.506 455.5T850.233 476Q845 476 840 475.5q-5-.5-13-2.5L667 633q2 8 2.5 13t.5 10.233q0 28.779-20.589 49.273Q628.823 726 599.911 726 571 726 550.5 705.506T530 656.233q0-5.233.5-10.233.5-5 2.5-13L423 523q-8 2-13 2.5t-10.25.5q-1.75 0-22.75-3L177 723q2 8 2.5 13t.5 10.233q0 28.779-20.589 49.273Q138.823 816 109.912 816Z"/></svg>
`
const photoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M479.5 790q72.5 0 121.5-49t49-121.5q0-72.5-49-121T479.5 450q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5ZM140 936q-24 0-42-18t-18-42V363q0-23 18-41.5t42-18.5h147l73-87h240l73 87h147q23 0 41.5 18.5T880 363v513q0 24-18.5 42T820 936H140Zm680-60V363H645l-73-87H388l-73 87H140v513h680ZM480 620Z"/></svg>
`
const HomeStackNavigation = () => {
  return (
    <Stack.Navigator  
    screenOptions={{ 
       headerShown: false, 
       presentation: 'transparentModal', 
       contentStyle: { backgroundColor: 'white' }  }} 
     initialRouteName="welcome" > 
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="tab" component={TabStackNavigation} options={{headerShown: false}}/>      
     </Stack.Navigator>
  )
}

const TabStackNavigation = () => {
  return (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size}) => {
      // console.log(color);
      // console.log(size);
      // console.log(focused)
      let iconName = textSvg
      if (route.name === 'home'){
        iconName = homeSvg
      }

      if (route.name === 'scan'){
        iconName = photoSvg
      }

      if (route.name === 'history'){
        iconName = historySvg
      }

      return <SvgXml xml={iconName} />
    }
  })}
  initialRouteName='home'>
    <Tab.Screen name='home' component={Home} />
    <Tab.Screen name='scan' component={Scan} />
    <Tab.Screen name="history" component={History} /> 
  </Tab.Navigator>
  )
}

const App = (): JSX.Element => {

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
  <ThemeContext.Provider value={darkMode ? darkTheme : theme}>  
    <NavigationContainer>
      <HomeStackNavigation />
      </NavigationContainer> 
    </ThemeContext.Provider>
  );
}

export default App;
