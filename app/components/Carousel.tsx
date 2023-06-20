import { useContext } from "react";
import { StyleSheet,
    View,
    Text,
    SafeAreaView,
    Platform
 } from "react-native";
import { ThemeContext } from '../../App';


 const Carousel = () => {
    const theme = useContext(ThemeContext)
    const styles = getStyles(theme)
    return (
        <SafeAreaView>
            <Text> App </Text>
        </SafeAreaView>
    )

}

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default Carousel; 