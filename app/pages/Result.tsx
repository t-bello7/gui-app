import { useContext } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { ThemeContext } from '../../App';

const Result = () => {
    const theme = useContext(ThemeContext)
    const styles = getStyles(theme)
    return (
      <View style={styles.container}>
          <Image source={require('../assets/imgs/logo.png')} />
      </View>
    )   
}

const getStyles = (theme: any) => StyleSheet.create({
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
    headline: {
      fontWeight: '700',
      fontSize: 24,
    }
  })

export default Result;