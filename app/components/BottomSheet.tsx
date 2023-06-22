import { useCallback, useContext, forwardRef, useImperativeHandle } from 'react';
import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    TouchableWithoutFeedback
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
} from 'react-native-reanimated';
import { ThemeContext } from '../../App';

const BottomSheet = forwardRef(({activeHeight}: any, ref) => {
    const theme = useContext(ThemeContext);
    const height = useWindowDimensions().height;
    const topAnimation = useSharedValue(height);
    const newActiveHeight = height - activeHeight;
    const styles = getStyles(theme)
    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value
        return {
            top,
        }
    })
    const backDropAnimation = useAnimatedStyle(() => {
        const opacity = interpolate(
            topAnimation.value,
            [height, newActiveHeight],
            [0, 0.5]
        )
        const display = opacity === 0 ? 'none': 'flex';
        return {
            opacity, display
        }
    })

    const expand = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(newActiveHeight, {
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
    <>
    <TouchableWithoutFeedback onPress={() => {
        close();
    }}>
        <Animated.View style={[styles.backDrop, backDropAnimation]}/>
    </TouchableWithoutFeedback>
    {/* <PanGestureHandler onGestureEvent={gestureHandler}> */}
        <Animated.View style={[styles.container, animationStyle]}>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
            </View>
        </Animated.View>
    {/* </PanGestureHandler> */}
    </>
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
    },
    backDrop: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})
export default BottomSheet;