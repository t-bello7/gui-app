import React, {useState, useEffect} from 'react';
import Welcome from './app/pages/Welcome';
import Scan from './app/pages/Scan';
import History from './app/pages/History';
import { WithSplashScreen } from './app/pages/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {theme, darkTheme} from './app/assets/theme';


export type RootStackParamList = {
  welcome:  undefined,
  splash: undefined,
}

type TabStackParamList = {
  home: undefined
  history: undefined
}

export type ThemeContextType = {
  colors: {
    background: string
  }
}

export const ThemeContext = React.createContext<ThemeContextType | {}>({})

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();

const App = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(true)
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    setIsAppReady(true);
  }, [])
  return (
  <ThemeContext.Provider value={darkMode ? darkTheme : theme}>  

  <WithSplashScreen isAppReady={isAppReady}>
    
    {/* <NavigationContainer> */}
      {/* <Stack.Navigator   */}
{/*         
      //  screenOptions={{ */}
        {/* // headerShown: false, */}
        {/* // presentation: 'transparentModal', */}
        {/* // contentStyle: { backgroundColor: 'white' }  */}
      {/* // }} */}
      {/* // initialRouteName="welcome"/> */}
          {/* <Stack.Screen name="welcome" component={Welcome} /> */}
          {/* <Stack.Screen name="splash" component={Splash} /> */}
      {/* </Stack.Navigator> */}
    {/* </NavigationContainer> */}
    {/* <NavigationContainer>
    <Tab.Navigator initialRouteName="home">
        <Tab.Screen name="home" component={Scan} />
        <Tab.Screen name="history" component={History} />
      </Tab.Navigator>
    </NavigationContainer> */}
    </WithSplashScreen>
    </ThemeContext.Provider>
  );
}

export default App;
