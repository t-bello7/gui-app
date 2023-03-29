import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';

type WelcomeNavigationProp =  NativeStackNavigationProp<
  RootStackParamList,
  'welcome'
>;

type Props = {
  navigation: WelcomeNavigationProp;
};

const Welcome = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();
  console.log(navigation) 
  return (
      <View>
         <Button
      title="Go to Home Page"
      onPress={() =>
        navigation.navigate('splash')
      }
       />

      <Text style={styles.container}>
            Welcome to gui app 
        </Text>
      </View>
       
    )   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  }
})
export default Welcome;

