import * as React from "react";
import SplashScreen from 'react-native-splash-screen'
import { Platform, AsyncStorage, View, PermissionsAndroid, ActivityIndicator } from 'react-native';

import Route from './Route';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.loader = {
            showLoader: true
        }
    }

    componentDidMount() {
        // do stuff while splash screen is shown
        setTimeout(() => { SplashScreen.hide();},2500)  
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Route />
            </View>
        )
    }
}