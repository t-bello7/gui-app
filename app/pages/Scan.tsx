import React, { useEffect } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RNCamera } from 'react-native-camera'
import { useCamera } from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import { err } from 'react-native-svg/lib/typescript/xml';

const Scan = () => {

    const [ {cameraRef}, {takePicture}] = useCamera(null)

    const captureImage = async () => {
      try {
        const {uri: imagePath} = await takePicture()
        console.log(imagePath)
        const newImagePath = RNFS.ExternalDirectoryPath + '/mytest.jpg'
        RNFS.moveFile(imagePath, newImagePath).then(() => {
          console.log(`image file was moved from ${imagePath} to ${newImagePath}`)
        }).catch(err => {
          console.log(err);
        })
      }
      catch (err) {
        console.log(err)
      }
    }
    useEffect(() => {
    },[])

    return (
        <SafeAreaView style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
            <Button
              title="Capture image"
              onPress={captureImage}
             />
            </RNCamera>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
      flex: 1
    },
    container: {
      display: "flex",
      flexDirection: "column",
      color: "black",
      alignItems: "center",
      justifyContent: "center"
    },
    headline: {
      fontWeight: '700',
      fontSize: 24,
      textAlign: 'center'
    },
    preview: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  })

export default Scan;