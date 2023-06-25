import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react';
import {
    StyleSheet,
    View,
    Button,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RNCamera } from 'react-native-camera'
import { useCamera } from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import * as tf from '@tensorflow/tfjs'
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native';
import BottomSheet from '../components/BottomSheet';

const scanSvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
  <path d="M480 763q-77.605 0-132.302-54.698Q293 653.605 293 576q0-77.605 54.698-132.302Q402.395 389 480 389q77.605 0 132.302 54.698Q667 498.395 667 576q0 77.605-54.698 132.302Q557.605 763 480 763Zm0-60q54 0 90.5-36.5T607 576q0-54-36.5-90.5T480 449q-54 0-90.5 36.5T353 576q0 54 36.5 90.5T480 703ZM180 936q-24 0-42-18t-18-42V704h60v172h172v60H180Zm428 0v-60h172V704h60v172q0 24-18 42t-42 18H608ZM120 448V276q0-24 18-42t42-18h172v60H180v172h-60Zm660 0V276H608v-60h172q24 0 42 18t18 42v172h-60ZM480 576Z"/>
</svg>
`;
const modelJSON = require('../output/model.json');
const modelWeightS1 = require('../output/group1-shard1of5.bin');
const modelWeightS2 = require('../output/group1-shard2of5.bin');
const modelWeightS3 = require('../output/group1-shard3of5.bin');
const modelWeightS4 = require('../output/group1-shard4of5.bin');
const modelWeightS5 = require('../output/group1-shard5of5.bin');

const Scan = () => {
    const [scanning, setScanning] = useState(false)
    const [files, setFiles] = useState([]);
    const { height } = useWindowDimensions();
    const [ {cameraRef}, {takePicture}] = useCamera()
    const bottomSheetRef: any = useRef(null);
    const loadModel = async ():Promise<void|tf.LayersModel>=>{
      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJSON, [
          modelWeightS1,
          modelWeightS2,
          modelWeightS3,
          modelWeightS4,
          modelWeightS5
        ])
      )
      return model;
    }
    const transformImageToTensor = async (uri:string):Promise<tf.Tensor>=>{
      //read the image as base64
        const img64 = await RNFS.readFile(uri, 'base64')
        console.log('img64 created')
        const imgBuffer =  tf.util.encodeString(img64, 'base64').buffer
        console.log('imgbuffer created')
        const raw = new Uint8Array(imgBuffer)
        console.log('img raw')
        let imgTensor = decodeJpeg(raw)
        const scalar = tf.scalar(255)
        console.log('scalar worked')
      //resize the image
        imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [224, 224])
        console.log('imgTensor')
        console.log(imgTensor)
      //normalize; if a normalization layer is in the model, this step can be skipped
        // const tensorScaled = imgTensor.div(scalar)
      //final shape of the rensor
        const img = tf.reshape(imgTensor, [1,224,224,3])
        console.log(img);
        return img
    }
    const makeDirectory = async (folderPath: any) => {
      await RNFS.mkdir(folderPath); //create a new folder on folderPath
    };
    // const getFileContent = async (path: any) => {
    //   const reader = await RNFS.readDir(path);
    //   setFiles(reader);
    // };
    const openHandler = useCallback(() => {
      bottomSheetRef.current?.expand();
    }
    ,[])
    const captureImage = async () => {
      try {
        const {uri: imagePath} = await takePicture()
        const newImagePath = RNFS.DocumentDirectoryPath + '/mytest.jpg'

        RNFS.moveFile(imagePath, newImagePath).
        then(() => {
          console.log(`image file was moved from ${imagePath} to ${newImagePath}`)
          openHandler();
        }).catch(err => {
          console.log(err);
        })
      }
      catch (err) {
        console.log(err)
      }
    }
    const makePredictions = async ( batch: any, model: any, imagesTensor: any) => {
      console.log(imagesTensor)
      console.log(`model ${model}`)
      console.log(batch)
      const predictionsData = model.predict(imagesTensor)
      console.log(predictionsData);
      let pred = predictionsData.split(batch)
      console.log(pred);
      return pred
    }
    const getPredictions = async ()=>{
      const image = RNFS.DocumentDirectoryPath+ "/mytest.jpg"
      await tf.ready()
      const model = await loadModel() as tf.LayersModel
      const tensor_image = await transformImageToTensor(image)
      const predictions = await makePredictions(32, model, tensor_image)
      console.log(`predictions ${predictions}`)
      return predictions

    }

    
    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
            <Button
              title="Capture image"
              onPress={captureImage}
             />
                <Button
              title="Predict"
              onPress={getPredictions}
             />
             {/* <View>
              {
                !scanning &&
                <IconButton icon={scanSvg} handleOnPress={scanFruit}/>
              }
             </View> */}
            </RNCamera>
        <BottomSheet activeHeight={height * 0.5 } ref={bottomSheetRef}/>
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
      justifyContent: "flex-end",
      // height: 200
    }
  })

export default Scan;