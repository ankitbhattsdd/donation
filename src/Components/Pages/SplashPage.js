import * as React from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import { FONT_SIZE } from "./global";

console.ignoredYellowBox = ['Warning:'];

const WINDOW = Dimensions.get('window');
const bgImage = require('../Images/appIconBG.jpg');

class SplashPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <KeyboardAwareScrollView scrollEnabled={false} innerRef={ref => (this.scroll = ref)}>
                <Image style={{
                    height: WINDOW.height ,
                    width: WINDOW.width ,
                }}
                    source={ bgImage }
                />
                <View style={styles.container}>

                    <View style={styles.msgSection}>
                        <Text style={styles.msgTxt}>
                            Thank you for using the Building a Bridge to Uganda app. It is intended to provide for
    your prayer intentions. Hundreds of children in the jungles of Africa, at Pope John Paul II High
    School, will be praying for your intentions. Although a donation is not required, one is always
    appreciated to further the health and education of those prayer warriors in the jungle. Saint
    Charles Lwanga pray for us!
                        </Text>
                    </View>
                    <View style={styles.nextButton} >
                        <TouchableOpacity onPress={() => Actions.HomePage()} style={{ paddingVertical: 5, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 1, height: 1 }, shadowColor: '#ff9000', shadowOpacity: 0.5 }}>
                            <Text style={{ color: 'white', fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: WINDOW.height,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
    },
    msgSection: {
        backgroundColor: "#ffffff",
        paddingHorizontal: WINDOW.width * 0.05,
        paddingVertical: WINDOW.height * 0.03,
        marginHorizontal: WINDOW.width * 0.05,
        marginVertical: WINDOW.height * 0.03,
        shadowOpacity: 0.2,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'grey',
        elevation: 5,
        borderRadius: 5
    },
    msgTxt: {
        fontSize: FONT_SIZE.SIZE_028,
        color: "#323232",
        lineHeight: WINDOW.height * 0.05,
        fontStyle: 'italic'
    },
    nextButton: {
        paddingHorizontal: WINDOW.width * 0.05,
        paddingVertical: WINDOW.height * 0.01,
        backgroundColor: "#7dd89a",
        borderRadius: 25
    }

});

export default SplashPage;