import React, {Fragment, useEffect} from 'react';
import { Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker'



const Scan = () => {

    const openVideo = () => {
        ImagePicker.openCamera({
            mediaType: 'video',
        }).then( imageRes => {
            console.log(imageRes)
        })
    }

    useEffect(() => {
        openVideo()

        return () => {
            ImagePicker.clean().then(() => {
                console.log('removed all tmp images from tmp directory');
            })
        }
    },[])


    return (
        <Fragment>
            <SafeAreaView>
                <Text>Directly Launch Camera</Text>
            </SafeAreaView>
        </Fragment>
    )   
}

export default Scan;