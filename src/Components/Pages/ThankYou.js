import * as React from 'react';
import { View, TouchableOpacity, ScrollView, Image, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
console.ignoredYellowBox = ['Warning:'];

const WINDOW = Dimensions.get('window');

class ThankYou extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    // convert string to uppercase

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        if (this.props.data) {
            return (
                <KeyboardAwareScrollView innerRef={ref => (this.scroll = ref)}>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", paddingVertical: 10, color: "#323232" }}>
                            <Text style={{ fontSize: 30, color: "#323232" }}>Thanks </Text>
                            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#323232" }}>{this.Capitalize(this.props.data.name)}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, fontStyle: "italic", color: "#323232", color: "#323232" }}>you donated ${this.props.data.amount}</Text>
                        </View>
                        <View>
                            <Image source={require('../Images/icon-hand.png')} />
                        </View>
                        <View style={{ flex: 0.15 }}>
                        </View>
                        <View style={{ paddingHorizontal: 40, paddingVertical: 5, backgroundColor: "#7dd89a", borderRadius: 25 }} >
                            <TouchableOpacity onPress={() => Actions.popTo('HomePage', { data: this.props.data })} style={{ paddingVertical: 5, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 1, height: 1 }, shadowColor: '#ff9000', shadowOpacity: 0.5 }}>
                                <Text style={{ color: 'white', fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Donate more..</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            );
        }
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: WINDOW.height,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        
    },
});

export default ThankYou;