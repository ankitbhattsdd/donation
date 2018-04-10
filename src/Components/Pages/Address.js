import * as React from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Text, Dimensions, Button, ActivityIndicator, AsyncStorage, Platform, WebView } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import FloatingLabel from "react-native-floating-labels";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dropdown } from 'react-native-material-dropdown';
import BTClient from 'react-native-braintree-xplat';
import { SERVER_URL, FONT_SIZE } from "./global";

const WINDOW = Dimensions.get('window');
const LOGO = require("../Images/logo.png");
console.ignoredYellowBox = ['Warning:'];

const imageSwiper = [{
    image: require('../Images/slider-1.png')
},
{
    image: require('../Images/1.jpg')
}, {
    image: require('../Images/2.jpg')
}, {
    image: require('../Images/3.jpg')
},
]

class Address extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            amount: '',
            stateLists: [],
            streetAddress1: '',
            streetAddress1_Clicked: false,
            streetAddress1_Empty: false,
            isLoading: false,
            streetAddress2: '',
            streetAddress2_Clicked: false,
            streetAddress2_Empty: false,

            city: '',
            city_Clicked: false,
            city_Empty: false,

            postalCode: '',
            postalCode_Clicked: false,
            postalCode_Empty: false,

            activeSlide: 0,
            toggle: false,
            disable: true
        }
    }

    componentDidMount() {

        BTClient.setup(this.props.clientToken);

        stateList = this.props.stateList;
    }

    componentWillMount() {

        AsyncStorage.getItem('streetAddress1').then((streetAddress1) => {
            if (streetAddress1) {
                this.setState({ streetAddress1: streetAddress1 })
            }
        });

        AsyncStorage.getItem('streetAddress2').then((streetAddress2) => {
            if (streetAddress2) {
                this.setState({ streetAddress2: streetAddress2 })
            }
        });

        AsyncStorage.getItem('city').then((city) => {
            if (city) {
                this.setState({ city: city })
            }
        });

        AsyncStorage.getItem('states').then((states) => {
            if (states) {
                this.setState({ states: states })
            }
        });

        AsyncStorage.getItem('postalCode').then((postalCode) => {
            if (postalCode) {
                this.setState({ postalCode: postalCode })
            }
        });

    }

    addPayment = (data) => {
        this.setState({ isLoading : true})
        AsyncStorage.setItem('streetAddress1', this.state.streetAddress1);
        AsyncStorage.setItem('streetAddress2', this.state.streetAddress2);
        AsyncStorage.setItem('city', this.state.city);
        AsyncStorage.setItem('postalCode', this.state.postalCode);
        
        if (this.state.states) {
            AsyncStorage.setItem('states', this.state.states);
        } 

        const card = {
        }
        const options = {
            bgColor: '#FFF',
            tintColor: 'orange',
            callToActionText: 'Donate Now',
            threeDSecure: {
                amount: data.amount
            }
        }

        BTClient.showPaymentViewController(options).then((nonce) => {
            console.log("payment done===>", nonce)

            let dataTosend = {
                "payment_method_nonce": nonce,
                "amount": data.amount,
                "organizationName": "Bridge to Uganda",
                "donorFullName": data.name,
                "donorEmailAddress": data.email,
                "donationAmount": data.amount,
                "donorAmount": data.amount,
                "donorPurpose": data.purpose,
                "donorPostalAddress": this.state.streetAddress1,
                "donorCCEmailAddress": data.ccEmail
            }

            fetch(SERVER_URL + 'Checkouts/CreatePaymentWithDetails', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataTosend),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("resopi", responseJson)
                    if (responseJson.status === 200) {
                        Actions.ThankYou()
                        this.setState({isLoading: false})
                    }
                    else {
                        Actions.Error()
                        this.setState({ isLoading: false })                        
                    }
                })
        })
            .catch(function (err) {
                Actions.Error();
                //error handling
                console.log("err===>", err)
            });
    }


    _renderItem({ item, index }) {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={item.image} resizeMode='contain' style={{ height: WINDOW.height * 0.28, width: WINDOW.width }} />
            </View>
        );
    }

    render() {

        var arr = []
        stateList = this.props.stateList.map((states) => {
            arr.push({
                id: states.id,
                value: states.name
            })
        })

        let datap = {
            name: this.props.Name,
            amount: this.props.Amount,
            purpose: this.props.Purpose,
            email: this.props.Email,
            ccEmail: this.props.CCemail
        }
        if(this.state.isLoading){
            return <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator/>
            </View>
        }
        return (
            <KeyboardAwareScrollView enableOnAndroid={false} keyboardShouldPersistTaps={Platform.OS === 'ios' ? false : true}>
                <View style={styles.container}>
                    <View style={styles.banner}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={imageSwiper}
                            renderItem={this._renderItem}
                            sliderWidth={WINDOW.width}
                            itemWidth={WINDOW.width}
                            onSnapToItem={(index) => this.setState({ activeSlide: index })}
                        />
                        <View style={{ position: 'absolute', top: WINDOW.height * 0.03, left: WINDOW.width * 0.03 }}>
                            <TouchableOpacity onPress={() => Actions.pop()} style={{ height: WINDOW.height * 0.05, width: WINDOW.height * 0.1 }}>
                                <Image source={require('../Images/arrow-back.png')} style={{}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bannerText} >
                            <Text onPress={() => Actions.SiteUrl()} style={{ color: '#ffffff', fontSize: FONT_SIZE.SIZE_028, fontWeight: 'bold' }}>www.bridgetouganda.org</Text>
                            <Text onPress={() => Actions.SiteUrl()} style={{ color: "#efc352", fontSize: FONT_SIZE.SIZE_028, fontWeight: 'bold' }} >Building a Bridge to Uganda</Text>
                            <Text onPress={() => Actions.SiteUrl()} style={{ color: "#ffffff", fontSize: FONT_SIZE.SIZE_020, }}>Channeling God's Love and Resources to Transform Lives</Text>
                        </View>
                        <View style={{ position: 'absolute', top: WINDOW.height * 0.15, left: WINDOW.width * 0.25 }}>
                            <Pagination
                                dotsLength={imageSwiper.length}
                                activeDotIndex={this.state.activeSlide}
                                containerStyle={{ backgroundColor: 'transparent' }}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 0,

                                }}
                                inactiveDotStyle={{

                                }}
                                inactiveDotColor='#f9934e'
                                dotColor='#f9934e'
                                inactiveDotScale={0.6}
                            />
                        </View>
                    </View>
                    <View style={styles.formSection}>
                        <View style={styles.innerFormSection}>
                            <View style={{ flex: 0.142, alignItems: "center", justifyContent: 'center', borderBottomColor: "#ddd", borderBottomWidth: 1.5, paddingVertical: 10 }}>
                                <Text style={{ color: "#323232" }}>(Optional)</Text>
                            </View>
                            <View style={[styles.innerFormView, {}]}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.streetAddress1_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    style={[styles.formInput, { borderBottomColor: this.state.streetAddress1_Clicked ? '#32CD32' : "#ddd" }]}
                                    value={this.props.data ? this.props.data.streetAddress1 : this.state.streetAddress1}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ streetAddress1_Clicked: false })}
                                    onFocus={() => this.setState({ streetAddress1_Clicked: true })}
                                    onChangeText={(streetAddress1) => { this.setState({ streetAddress1, streetAddress1_Empty: false }) }}
                                >Donor street address line 1</FloatingLabel>
                            </View>
                            <View style={[styles.innerFormView, {}]}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.streetAddress2_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    style={[styles.formInput, { borderBottomColor: this.state.streetAddress2_Clicked ? '#32CD32' : "#ddd" }]}
                                    value={this.props.data ? this.props.data.streetAddress2 : this.state.streetAddress2}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ streetAddress2_Clicked: false })}
                                    onFocus={() => this.setState({ streetAddress2_Clicked: true })}
                                    onChangeText={(streetAddress2) => { this.setState({ streetAddress2, streetAddress2_Empty: false }) }}
                                >Donor street address line 2</FloatingLabel>
                            </View>
                            <View style={[styles.innerFormView, {}]}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.city_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    style={[styles.formInput, { borderBottomColor: this.state.city_Clicked ? '#32CD32' : "#ddd" }]}
                                    value={this.props.data ? this.props.data.city : this.state.city}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ city_Clicked: false })}
                                    onFocus={() => this.setState({ city_Clicked: true })}
                                    onChangeText={(city) => { this.setState({ city, city_Empty: false }) }}
                                >Donor city</FloatingLabel>
                            </View>
                            <View style={[styles.innerFormView, { paddingTop: 10 }]}>
                                <Dropdown
                                    label='Select State'
                                    animationDuration={0}
                                    rippleDuration={0}
                                    value={this.props.states ? this.props.data.states : this.state.states}
                                    fontSize={WINDOW.height * 0.029}
                                    inputContainerStyle={{ borderBottomColor: '#ddd' }}
                                    data={arr}
                                    containerStyle={{ backgroundColor: 'white', justifyContent: 'center' }}
                                    onChangeText={(states) => { this.setState({ states }) }}
                                />
                            </View>
                            <View style={[styles.innerFormView, {}]}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.postalCode_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    keyboardType='numeric'
                                    style={{ borderBottomColor: this.state.postalCode_Clicked ? '#32CD32' : "#ddd" }}
                                    value={this.props.data ? this.props.data.postalCode : this.state.postalCode}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ postalCode_Clicked: false })}
                                    onFocus={() => this.setState({ postalCode_Clicked: true })}
                                    onChangeText={(postalCode) => { this.setState({ postalCode, postalCode_Empty: false }) }}
                                > Donor postal Code</FloatingLabel>
                            </View>
                        </View>
                        <View style={[styles.PaymentButton, {}]}>
                            <TouchableOpacity onPress={() => { this.addPayment(datap) }} style={{ backgroundColor: '#efc352', height: 45, marginTop: 10, borderWidth: 2, borderColor: '#efc352', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>Add Payment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: WINDOW.height * 1
    },
    banner: {
        flex: Platform.OS === 'android' ? 0.29 : 0.25,
        flexDirection: "row",
    },
    bannerText: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: WINDOW.height * 0.05,
        left: WINDOW.width * 0.02,
    },
    formSection: {
        flex: 0.80,
        padding: '3%',
        shadowOpacity: 0.2,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'grey',
        elevation: 5
    },
    innerFormSection: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: '7%',
        borderRadius: 5,

    },
    formInput: {
        borderWidth: 0,
        borderBottomWidth: 1.5,
        color: "#959595",
    },
    input: {
        borderWidth: 0,
        color: "#323232",
        paddingVertical: 2
    },
    innerFormView: {
        flex: .162,
        paddingBottom: 50
    },
    PaymentButton: {
        flex: .15,
    },
});

export default Address;