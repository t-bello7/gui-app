import { useCallback, useContext, forwardRef, useImperativeHandle } from 'react';
import {
        StyleSheet,
        Text,
        View,
        useWindowDimensions,
        TouchableWithoutFeedback
    } from 'react-native';
import { ThemeContext } from '../../App';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated'

const BottomSheet = forwardRef(({activeHeight}: any, ref) => {
    const theme = useContext(ThemeContext);
    const height = useWindowDimensions().height;
    const topAnimation = useSharedValue(height);
    const newActveHeight = height - activeHeight;
    const styles = getStyles(theme)
    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value
        return {
            top,
        }
    })
    const expand = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(newActveHeight, {
            damping: 100,
            stiffness: 400,
        });
    }, [])
    const close = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(height, {
            damping: 100,

        })
    }, [])

    useImperativeHandle( ref, ()=> ({
        expand, close
    }), [expand, close])
    return (
    <Animated.View style={[styles.container, animationStyle]}>
        <View style={styles.lineContainer}>
            <View style={styles.line} />
        </View>
    </Animated.View>
    )
})

const getStyles = (theme: any) => StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    }, 
    lineContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    line: {
        width: 50,
        height: 4,
        backgroundColor: 'black',
        borderRadius: 10,
    }
})
export default BottomSheet;