import * as React from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import FloatingLabel from "react-native-floating-labels";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BTClient from 'react-native-braintree-xplat';

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

class Payment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            cardNumber_Clicked: false,
            cardName_Clicked: false,
            expiryMonth_Clicked: false,
            expiryYear_Clicked: false,
            cardCvv_Clicked: false,
            cardNumber: '',
            cardName: '',
            expiryMonth: '',
            expiryYear: '',
            cardCvv: '',
            activeSlide: 0
        }
    }


    componentDidMount() {

        this.setState({ amount: this.props.Amount })

        let clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIwZjhkNDlhODE0OWUwNmMyYmM3MTdjMGY3ZjQ3MTY1ODRmOGM1MjUzNTdmNWE2OTA2ZmUxZGZhNmMwNTY0NzQ0fGNyZWF0ZWRfYXQ9MjAxOC0wMi0yMFQxMDowNjo1MS43MjEyNjUxNDErMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0="
        BTClient.setup(clientToken);
    }

    validate = () => {

        if (this.state.cardNumber === '')
            this.setState({ cardNumber_Empty: true })
        else if (this.state.cardName === '')
            this.setState({ cardName_Empty: true })
        else if (this.state.expiryMonth === '')
            this.setState({ expiryMonth_Empty: true })
        else if (this.state.expiryYear === '')
            this.setState({ expiryYear_Empty: true })
        else if (this.state.cardCvv === '') {
            this.setState({ cardCvv_Empty: true })
        }
        else
            this.addPayment()
        //  Actions.Payment({ Amount: this.state.amount })
    }

    addPayment = () => {
        // Actions.Payment()
        const card = {
            number: this.state.cardNumber,
            cardholderName: this.state.cardholderName,
            expirationDate: this.state.expiryMonth + '/' + this.state.expiryYear,
            cvv: this.state.cardCvv,
            // number: "4111111111111111",
            // expirationDate: "10/20", // or "10/2020" or any valid date
            // cvv: "400",
        }
        const options = {
            bgColor: '#FFF',
            tintColor: 'orange',
            callToActionText: 'Donate Now',
            threeDSecure: {
                amount: 200
            }
        }
        //alert(JSON.stringify(card))

        BTClient.getCardNonce(card).then(function (nonce) {

            let data = {
                "payment_method_nonce": nonce,
                "amount": 200
            }
            console.log('data', data)
            // fetch('http://108.168.203.227/donationapp/api/Checkouts/CreatePurchaseMessage?payment_method_nonce='+nonce+'&amount='+200.00, {
            fetch('http://108.168.203.227/donationapp/api/Checkouts/CreatePurchaseMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data
            })
                .then((response) => { response.json(), console.log('asghsdfgfhgdhfdgs', response) })
                .then((responseJson) => {
                    //  console.log(response);
                    // this.setState({ stateLists: responseJson });
                    // console.log('responsejson from followCounts api', responseJson)
                })
            Actions.ThankYou();

        })
            .catch(function (err) {
                Actions.Error();
                //error handling
                console.log("err===>", err)
            });
    }

    _renderItem({ item, index }) {
        console.log('item', item)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={item.image} resizeMode='contain' style={{ height: WINDOW.height * 0.28, width: WINDOW.width, borderRadius: 10 }} />
            </View>
        );
    }

    render() {

        return (
            <KeyboardAwareScrollView innerRef={ref => (this.scroll = ref)}>
                <View style={styles.container}>
                    <View style={styles.banner}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={imageSwiper}
                            renderItem={this._renderItem}
                            sliderWidth={WINDOW.width}
                            itemWidth={WINDOW.width}
                            itemHeight={200}
                            onSnapToItem={(index) => this.setState({ activeSlide: index })}
                        />
                        <View style={{ position: 'absolute', top: WINDOW.height * 0.03, left: WINDOW.width * 0.03 }}>
                            <TouchableOpacity onPress={() => Actions.Address()}>
                                <Image source={require('../Images/arrow-back.png')} style={{}} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: WINDOW.height * 0.08, right: WINDOW.width * 0.2 }}>
                            <Text style={{ color: 'white', fontSize: WINDOW.height * 0.03, fontWeight: 'bold' }}>www.bridgetouganda.org</Text>
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
                                inactiveDotColor='#efc352'
                                dotColor='#efc352'
                                inactiveDotScale={0.6}
                            />
                        </View>

                    </View>
                    <View style={styles.homeText}>
                        <Text style={{ color: "#efc352", fontSize: 18, paddingBottom: 6 }} >Building a Bridge to Uganda</Text>
                        <Text style={{ color: "#000000", fontSize: 12 }}>Channeling God's Love and Resources to Transform Lives</Text>
                    </View>
                    {/* form section */}
                    <View style={styles.formSection}>
                        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: '7%', borderRadius: 5, }}>
                            <View style={{ flex: 0.142, alignItems: "center", justifyContent: 'center', borderBottomColor: "#ddd", borderBottomWidth: 1.5, paddingVertical: 10 }}>
                                <Text style={{ fontSize: WINDOW.height * 0.03, color: "#000000" }}>Payment</Text>
                            </View>
                            <View style={styles.payImageSection}>
                                <Image source={require('../Images/icon-paypal.png')} />
                            </View>
                            <View style={{ height: WINDOW.height * 0.05, borderColor: "white", paddingTop: WINDOW.height * 0.02 }} >
                                <Text style={{ fontSize: WINDOW.height * 0.02 }}>Pay with Card</Text>
                            </View>
                            <View style={[styles.innerFormView, { flexDirection: 'row' }]}>
                                <View style={{ flex: 0.7, }}>

                                    <FloatingLabel
                                        labelStyle={{ color: this.state.cardNumber_Empty ? '#F60016' : this.state.cardNumber_Clicked ? '#7dd89a' : '#ddd' }}
                                        inputStyle={styles.input}
                                        keyboardType='numeric'
                                        style={[styles.formInput, { borderBottomColor: this.state.cardNumber_Clicked ? '#7dd89a' : "#ddd" }]}
                                        value={this.state.cardNumber}
                                        underlineColorAndroid={"transparent"}
                                        onBlur={() => this.setState({ cardNumber_Clicked: false })}
                                        onFocus={() => this.setState({ cardNumber_Clicked: true })}
                                        onChangeText={(cardNumber) => { this.setState({ cardNumber, cardNumber_Empty: false }) }}
                                    >Card Number</FloatingLabel>
                                </View>
                                <View style={{ flex: 0.5, height: Platform.OS === 'ios' ? WINDOW.height * 0.076 : WINDOW.height * 0.09, alignItems: 'flex-end', justifyContent: 'center', borderBottomWidth: 1.5, borderBottomColor: this.state.cardNumber_Clicked ? '#7dd89a' : "#ddd", paddingTop: '3%' }}>
                                    <Image source={require('../Images/icon-visa-sm.png')} />
                                </View>
                            </View>
                            <View style={styles.innerFormView}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.cardName_Empty ? '#F60016' : this.state.cardName_Clicked ? '#7dd89a' : '#ddd' }}
                                    inputStyle={styles.input}
                                    style={[styles.formInput, { borderBottomColor: this.state.cardName_Clicked ? '#7dd89a' : "#ddd" }]}
                                    value={this.state.cardName}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ cardName_Clicked: false })}
                                    onFocus={() => this.setState({ cardName_Clicked: true })}
                                    onChangeText={(cardName) => { this.setState({ cardName, cardName_Empty: false }) }}
                                >Card Holder Name</FloatingLabel>
                            </View>
                            <View style={[styles.innerFormView, { flexDirection: "row" }]}>
                                <View style={{ flex: 0.2 }} >
                                    <FloatingLabel
                                        labelStyle={{ color: this.state.expiryMonth_Empty ? '#F60016' : this.state.expiryMonth_Clicked ? '#7dd89a' : '#ddd' }}
                                        inputStyle={styles.input}
                                        keyboardType='numeric'
                                        style={[styles.formInput, { borderBottomColor: this.state.expiryMonth_Clicked ? '#7dd89a' : "#ddd" }]}
                                        value={this.state.expiryMonth}
                                        underlineColorAndroid={"transparent"}
                                        onBlur={() => this.setState({ expiryMonth_Clicked: false })}
                                        onFocus={() => this.setState({ expiryMonth_Clicked: true })}
                                        onChangeText={(expiryMonth) => { this.setState({ expiryMonth, cardName_Empty: false }) }}
                                    >MM</FloatingLabel>
                                </View>
                                <View style={{ height: WINDOW.height * 0.09, borderColor: "white", paddingTop: WINDOW.height * 0.006, alignItems: "center", justifyContent: "center" }} >
                                    <Text style={{ fontSize: WINDOW.height * 0.035 }}>/
                                    </Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <FloatingLabel
                                        labelStyle={{ color: this.state.expiryYear_Empty ? '#F60016' : this.state.expiryYear_Clicked ? '#7dd89a' : '#ddd' }}
                                        inputStyle={styles.input}
                                        keyboardType='numeric'
                                        style={[styles.formInput, { borderBottomColor: this.state.expiryYear_Clicked ? '#7dd89a' : "#ddd" }]}
                                        value={this.state.expiryYear}
                                        underlineColorAndroid={"transparent"}
                                        onBlur={() => this.setState({ expiryYear_Clicked: false })}
                                        onFocus={() => this.setState({ expiryYear_Clicked: true })}
                                        onChangeText={(expiryYear) => { this.setState({ expiryYear, expiryYear_Empty: false }) }}
                                    >YYYY</FloatingLabel>
                                </View>
                                <View style={{ flex: 0.6, alignItems: 'flex-end' }}>
                                    <FloatingLabel
                                        labelStyle={{ color: this.state.cardCvv_Empty ? '#F60016' : this.state.cardCvv_Clicked ? '#7dd89a' : '#ddd' }}
                                        inputStyle={styles.input}
                                        keyboardType='numeric'
                                        style={[styles.formInput, { borderBottomColor: this.state.cardCvv_Clicked ? '#7dd89a' : "#ddd", width: WINDOW.width * 0.2 }]}
                                        value={this.state.cardCvv}
                                        underlineColorAndroid={"transparent"}
                                        onBlur={() => this.setState({ cardCvv_Clicked: false })}
                                        onFocus={() => this.setState({ cardCvv_Clicked: true })}
                                        onChangeText={(cardCvv) => { this.setState({ cardCvv, cardCvv_Empty: false }) }}
                                    >CVV</FloatingLabel>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.PaymentButton, {}]}>
                            <TouchableOpacity
                                //  onPress={() => Actions.ThankYou()} 
                                onPress={() => { this.validate() }}
                                style={{ backgroundColor: '#efc352', height: 45, marginTop: 10, borderWidth: 2, borderColor: '#efc352', justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 1, height: 1 }, shadowColor: '#ff9000', shadowOpacity: 0.5 }}>
                                <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>Donate Now</Text>
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
        flex: 1,
        height: WINDOW.height
    },
    banner: {
        flex: 0.25,
        flexDirection: "row",
    },
    homeText: {
        flex: 0.1,
        padding: '3%',
        backgroundColor: "white"

    },
    formSection: {
        flex: 0.65,
        padding: '3%',
        shadowOpacity: 0.2,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'grey',
        elevation: 5,
        //   backgroundColor: "red"
    },
    formInput: {
        borderWidth: 0,
        borderBottomWidth: 1.5,
        color: "#959595"
    },
    input: {
        borderWidth: 0,
        color: "#959595",
    },
    innerFormView: {
        flex: .142,
        paddingBottom: 30
    },

    nextArrow: {
        flex: .142,
        paddingTop: 20
    },

    payImageSection: {
        marginTop: WINDOW.height * 0.02,
        flex: .142,
        paddingVertical: 8,
        backgroundColor: "#F5F5F7",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#F5F5F7",
        borderRadius: 5
    },
    PaymentButton: {
        flex: .15,
        //   paddingBottom: 30
    },
});

export default Payment;