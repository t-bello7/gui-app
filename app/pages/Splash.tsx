import { useContext, useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { ThemeContext, ThemeContextType } from '../../App';

export function WithSplashScreen({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isAppReady && children}
      <Splash isAppReady={isAppReady} />
    </>
  );
}

const LOADING_IMAGE = "Loading image";
const FADE_IN_IMAGE = "Fade in image";
const WAIT_FOR_APP_TO_BE_READY = "Wait for app to be ready";
const FADE_OUT = "Fade out";
const HIDDEN = "Hidden";

const Splash = ({ isAppReady }: { isAppReady: boolean }) => {
    const themeFromContext = useContext(ThemeContext) as ThemeContextType
    const bgColor = themeFromContext.colors.background
    const styles = getStyles(bgColor)

    const containerOpacity = useRef(new Animated.Value(1)).current;
    const imageOpacity = useRef(new Animated.Value(0)).current;

    const [state, setState] = useState<
    | typeof LOADING_IMAGE
    | typeof FADE_IN_IMAGE
    | typeof WAIT_FOR_APP_TO_BE_READY
    | typeof FADE_OUT
    | typeof HIDDEN
  >(LOADING_IMAGE);


  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);


  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);
  if (state === HIDDEN) return null;

    return (
      <Animated.View
      collapsable={false}
      style={[styles.container, { opacity: containerOpacity }]}
      >
        <Animated.Image
        source={require("../assets/imgs/logo.png")}
        fadeDuration={0}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={[styles.image, { opacity: imageOpacity }]}
        resizeMode="contain"
      />
     </Animated.View>
    )   
}

const getStyles = (bgColor: any) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: `${bgColor}`,
      alignItems: "center",
      justifyContent: "center"
    },
    image: {
      width: 250,
      height: 250,
    }
  })

export default Splash;

