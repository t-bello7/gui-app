import { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button  from './Button';
import { ThemeContext } from '../../App';


const DisplayCard = ({size, name}: any) => {
    // size
    // width
    // on press
    const theme = useContext(ThemeContext)
    const styles = getStyles(theme, size)
    return(
    <View style={styles.container}>
        <Text> {name} </Text>
        <Button />
    </View>
    )
}

const getStyles = (theme: any, size: any) => StyleSheet.create({
    container: {
        // borderWidth: 1,rr
        padding: 20,
        // width: size === 'half' ? '50%': '100%',
        height: 150,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
        elevation: 3,
    }
})

export default DisplayCard