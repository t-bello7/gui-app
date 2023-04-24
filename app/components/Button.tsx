import { useContext } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { ThemeContext } from '../../App';

const Button = () => {
    const theme = useContext(ThemeContext)
    const styles = getStyles(theme)

   return(
    <Pressable style={styles.primaryButton} onPress={() => console.log('button')}>
        <Text>
            helloe
        </Text>
    </Pressable>
   )
}


const getStyles = (theme: any) => StyleSheet.create({
    primaryButton: {
        backgroundColor: theme.colors.primary
    }
})

export default Button;