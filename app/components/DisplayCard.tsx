import { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button  from './Button';
import { ThemeContext } from '../../App';


const DisplayCard = (size: any) => {
    // size
    // width
    // on press
    const theme = useContext(ThemeContext)
    const styles = getStyles(theme, size.size)
    return(
    <View style={styles.container}>
        <Text> Scan Fruits </Text>
        <Button />
    </View>
    )
}


const getStyles = (theme: any, size: any) => StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 20,
        width: size === 'half' ? '50%': '100%',
        height: 150,
        borderRadius: 20
    }
})

export default DisplayCard