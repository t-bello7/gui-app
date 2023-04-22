import { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../App';
import moment from 'moment';

const History = () => {
    const theme = useContext(ThemeContext)
    const styles = getStyles(theme)
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
            Today,  ${moment().format("MMM Do YY")}
        </Text>
      </View>
    )   
}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      color: "black",
      backgroundColor: theme.colors.background,
      fontFamily:"Poppins-Regular",
      height: "100%",
    },
    headline: {
      fontWeight: '700',
      fontSize: 24,
    }
  })

export default History;