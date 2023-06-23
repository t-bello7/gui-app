import { useContext, useState } from "react";
import { StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    useWindowDimensions
 } from "react-native";
import { ThemeContext } from '../../App';
import Animated, {useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate
} from "react-native-reanimated";


 const Carousel = ({data} : any) => {
    const { width } = useWindowDimensions();
    const x  = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    })
    const [newdata] = useState([
        {key: 'spacer-left'},
        ...data,
        {key: 'spacer-right'}
    ]);
    const SIZE = width * 0.7;
    const SPACER = (width-SIZE) / 5;
    const theme = useContext(ThemeContext)
    const styles = getStyles(theme)
    return (
        <Animated.ScrollView
        horizontal
       showsHorizontalScrollIndicator={false}
       bounces={false}
       scrollEventThrottle={16}
       snapToInterval={SIZE}
       decelerationRate="fast"
       onScroll={onScroll}
        >
            {newdata.map((item :any, index : any) => {
                //
                const style = useAnimatedStyle(() => {
                    const scale = interpolate(
                        x.value,
                        [(index-2) * SIZE, (index - 1) * SIZE, index * SIZE],
                        [0.8, 1, 0.8]
                    )
                    return {
                        transform: [{scale}],
                    }
                })
                if (!item.image){
                    return <View style={{width: SPACER}} key={`${index}+242`}/>
                }
                return( 
                    <View key={`${index}+242`} style={{width: SIZE}}>
                        <Animated.View style={[styles.imageContainer, style]}>
                            <Image source={item.image} style={styles.image}/>
                        </Animated.View>
                    </View>
                )
            })}
        </Animated.ScrollView>
    )
}

const getStyles = (theme: any) => StyleSheet.create({
    imageContainer: {
        borderRadius: 34,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 1
    }
})

export default Carousel; 
