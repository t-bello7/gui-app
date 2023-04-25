import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RNCamera } from 'react-native-camera'
import { useCamera } from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import IconButton from '../components/IconButton';

const scanSvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
  <path d="M480 763q-77.605 0-132.302-54.698Q293 653.605 293 576q0-77.605 54.698-132.302Q402.395 389 480 389q77.605 0 132.302 54.698Q667 498.395 667 576q0 77.605-54.698 132.302Q557.605 763 480 763Zm0-60q54 0 90.5-36.5T607 576q0-54-36.5-90.5T480 449q-54 0-90.5 36.5T353 576q0 54 36.5 90.5T480 703ZM180 936q-24 0-42-18t-18-42V704h60v172h172v60H180Zm428 0v-60h172V704h60v172q0 24-18 42t-42 18H608ZM120 448V276q0-24 18-42t42-18h172v60H180v172h-60Zm660 0V276H608v-60h172q24 0 42 18t18 42v172h-60ZM480 576Z"/>
</svg>
`

const Scan = () => {
    const [scanning, setScanning] = useState(false)
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

    const scanFruit = () => {
      setScanning(true)
    }

    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
            {/* <Button
              title="Capture image"
              onPress={captureImage}
             /> */}
             <View>
              {
                !scanning &&
                <IconButton icon={scanSvg} handleOnPress={scanFruit}/>
              }
             </View>
            </RNCamera>
        </View>
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
      paddingBottom: 20,
      alignItems: "center",
      justifyContent: "flex-end"
    }
  })

export default Scan;