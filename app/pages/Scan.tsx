import React, {Fragment, Component} from 'react';
import { Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import {PermissionsAndroid} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User canceled image picker by pressing back button');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User selected custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = { uri: response.uri };
          console.log('response', JSON.stringify(response));
        }
    })
}
    const Scan = () => {
    return (
        <Fragment>
            <SafeAreaView>
            <TouchableOpacity onPress={launchCamera}>
                <Text>Directly Launch Camera</Text>
            </TouchableOpacity>
            </SafeAreaView>
        </Fragment>
    )   
}

export default Scan;