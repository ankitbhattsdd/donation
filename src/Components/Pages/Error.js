import * as React from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Text, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";

const WINDOW = Dimensions.get('window');

class Error extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <KeyboardAwareScrollView innerRef={ref => (this.scroll = ref)}>
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", paddingHorizontal: 30, paddingVertical: 15 }}>
                        <Text style={{ fontSize: 20, color: "#323232" }}>Your payment did not complete. Please try again.</Text>
                    </View>
                    <View style={{ paddingHorizontal: 40, paddingVertical: 5, backgroundColor: "#7dd89a", borderRadius: 25 }} >
                        <TouchableOpacity onPress={() => Actions.HomePage()} style={{ paddingVertical: 5, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 1, height: 1 }, shadowColor: '#ff9000', shadowOpacity: 0.5 }}>
                            <Text style={{ color: 'white', fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Try Again</Text>
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
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default Error;