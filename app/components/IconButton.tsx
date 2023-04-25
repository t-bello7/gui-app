import { useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ThemeContext } from '../../App';

const IconButton = ({icon, handleOnPress} : any) => {
    const theme = useContext(ThemeContext)
    const styles = getStyles(theme)
    return (
        <Pressable style={styles.nextButton} onPress={handleOnPress}>
            <Text>
                <SvgXml xml={icon} />
            </Text>
      </Pressable>
    )   
}


const getStyles = (theme: any) => StyleSheet.create({
    nextButton : {
        // color: theme.colors.white,
        backgroundColor: theme.colors.background,
        borderRadius: 100 / 2,
        width: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        height: 80,
        elevation: 3,
    }
})

export default IconButton;