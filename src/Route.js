import React from 'react';
import {
    Scene,
    Router,
    Actions,
    Lightbox
} from 'react-native-router-flux';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Component,
    Image,
    Platform,
    AsyncStorage
} from 'react-native';

import SplashPage from "./Components/Pages/SplashPage" ;
import HomePage from "./Components/Pages/HomePage";
import Address from "./Components/Pages/Address";
import Payment from "./Components/Pages/Payment";
import ThankYou from "./Components/Pages/ThankYou";
import Error from "./Components/Pages/Error";
import SiteUrl from "./Components/Pages/SiteUrl";

const WINDOW = Dimensions.get('window');

export default class Route extends React.Component {

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                    //initial
                        hideNavBar
                        key="SplashPage"
                        component={SplashPage}
                    />
                    <Scene
                    //    initial
                        hideNavBar
                        key="HomePage"
                        component={HomePage}
                    />
                    <Scene
                        //    initial
                        hideNavBar
                        key="Address"
                        component={Address}
                    />
                    <Scene
                        hideNavBar
                        key="Payment"
                        component={Payment}
                    />
                    <Scene
                        hideNavBar
                        key="ThankYou"
                        component={ThankYou}
                    />
                    <Scene
                        hideNavBar
                        key="Error"
                        component={Error}
                    />
                    <Scene
                        hideNavBar
                        key="SiteUrl"
                        component={SiteUrl}
                    />
                </Scene>
            </Router>
        );
    }
}