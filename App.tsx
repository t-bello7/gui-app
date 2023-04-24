import React, {useState, useEffect} from 'react';
import Welcome from './app/pages/Welcome';
import SplashScreen from 'react-native-splash-screen';
import Scan from './app/pages/Scan';
import History from './app/pages/History';
import Home from './app/pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {theme, darkTheme} from './app/assets/theme';


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
  <Tab.Navigator screenOptions={{
    headerShown: false,
  }}
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
