import * as React from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Text, Dimensions, AsyncStorage, ActivityIndicator, Platform, WebView } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import FloatingLabel from "react-native-floating-labels";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BTClient from 'react-native-braintree-xplat';
import { SERVER_URL, FONT_SIZE } from "./global";

const WINDOW = Dimensions.get('window');
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

class Homepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            email: "",
            recEmail: '',
            purpose_Clicked: false,
            name_Clicked: false,
            email_Clicked: false,
            recEmail_Clicked: false,
            activeSlide: 0,
            amount_Clicked: false,
            amount: '',
            amount_Empty: false,
            purpose: '',
            purpose_Empty: false,
            name: '',
            name_Empty: false,
            disable: true
        }
    }

    componentDidMount() {

        // client token api
        clientToken = fetch(SERVER_URL + 'Checkouts/GenerateToken', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((clientToken) => {
                this.setState({ clientToken: clientToken.token })
                this.setState({ disable: false })
            })

        // get states api
        stateList = fetch(SERVER_URL + 'EmailNotifier/GetStateList', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ stateLists: responseJson });
            })
    }


    componentWillMount() {

        AsyncStorage.getItem('amount').then((amount) => {
            if (amount) {
                this.setState({ amount: amount })
            }
        });

        AsyncStorage.getItem('purpose').then((purpose) => {
            if (purpose) {
                this.setState({ purpose: purpose })
            }
        });

        AsyncStorage.getItem('name').then((name) => {
            if (name) {
                this.setState({ name: name })
            }
        });

        AsyncStorage.getItem('email').then((email) => {
            if (email) {
                this.setState({ email: email })
            }
        });

        AsyncStorage.getItem('recEmail').then((recEmail) => {
            if (recEmail) {
                this.setState({ recEmail: recEmail })
            }
        });
    }

    _renderItem({ item, index }) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={item.image} resizeMode='contain' style={{ height: WINDOW.height * 0.28, width: WINDOW.width }} />
            </View>
        );
    }


    validate = () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.state.purpose === '')
            this.setState({ purpose_Empty: true })
        else if (this.state.name === '')
            this.setState({ name_Empty: true })
        else if (this.state.email === '')
            this.setState({ email_Empty: true })
        else if (this.state.amount === '')
            this.setState({ amount_Empty: true })
        else if (this.state.email !== '' && reg.test(this.state.email) === false) {
            this.setState({ email_Empty: true })
            this.setState({ email: this.state.email })
        }
        else if (this.state.recEmail !== '' && reg.test(this.state.recEmail) === false) {
            this.setState({ recEmail_Empty: true })
            this.setState({ recEmail: this.state.recEmail })
        }
        else {
            AsyncStorage.setItem('amount', this.state.amount);
            AsyncStorage.setItem('purpose', this.state.purpose);
            AsyncStorage.setItem('name', this.state.name);
            AsyncStorage.setItem('email', this.state.email);
            AsyncStorage.setItem('recEmail', this.state.recEmail);

            if (this.state.clientToken !== '' && this.state.stateLists.length !== 0) {
                Actions.Address({
                    Amount: this.state.amount,
                    Purpose: this.state.purpose,
                    Name: this.state.name,
                    Email: this.state.email,
                    CCemail: this.state.recEmail,
                    clientToken: this.state.clientToken,
                    stateList: this.state.stateLists
                })
            }
            return false
        }
    }

    render() {

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
                                inactiveDotColor='#efc352'
                                dotColor='#efc352'
                                inactiveDotScale={0.6}
                            />
                        </View>
                    </View>
                    {/* form section */}
                    <View style={styles.formSection}>
                        <View style={styles.innerFormSection}>
                            <View style={styles.innerFormView}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.purpose_Empty ? '#F60016' : this.state.purpose_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    style={[styles.formInput, { borderBottomColor: this.state.purpose_Empty ? '#F60016' : this.state.purpose_Clicked ? '#32CD32' : "#ddd" }]}
                                    value={this.props.data ? this.props.data.purpose : this.state.purpose}
                                    multiline={true}
                                    numberOfLines={4}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ purpose_Clicked: false })}
                                    onFocus={() => this.setState({ purpose_Clicked: true })}
                                    onChangeText={(purpose) => { this.setState({ purpose, purpose_Empty: false }) }}
                                >Prayer Intention</FloatingLabel>
                            </View>

                            <View style={[styles.innerFormView]}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.name_Empty ? '#F60016' : this.state.name_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    style={[styles.formInput, { borderBottomColor: this.state.name_Empty ? '#F60016' : this.state.name_Clicked ? '#32CD32' : "#ddd" }]}
                                    value={this.props.data ? this.props.data.name : this.state.name}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ name_Clicked: false })}
                                    onFocus={() => this.setState({ name_Clicked: true })}
                                    onChangeText={(name) => { this.setState({ name, name_Empty: false }) }}
                                >Full Name</FloatingLabel>
                            </View>
                            <View style={styles.innerFormView}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.email_Empty ? '#F60016' : this.state.email_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    style={[styles.formInput, { borderBottomColor: this.state.email_Empty ? '#F60016' : this.state.email_Clicked ? '#32CD32' : "#ddd" }]}
                                    value={this.props.data ? this.props.data.email : this.state.email}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ email_Clicked: false })}
                                    onFocus={() => this.setState({ email_Clicked: true })}
                                    onChangeText={(email) => { this.setState({ email, email_Empty: false }) }}
                                >Email Address</FloatingLabel>
                            </View>
                            <View style={styles.innerFormView}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.recEmail_Empty ? '#F60016' : this.state.recEmail_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    style={[styles.formInput, { borderBottomColor: this.state.recEmail_Empty ? '#F60016' : this.state.recEmail_Clicked ? '#32CD32' : "#ddd" }]}
                                    value={this.props.data ? this.props.data.recEmail : this.state.recEmail}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ recEmail_Clicked: false })}
                                    onFocus={() => this.setState({ recEmail_Clicked: true })}
                                    onChangeText={(recEmail) => { this.setState({ recEmail, recEmail_Empty: false }) }}
                                >Prayer Intention Recipient Email</FloatingLabel>
                            </View>
                            <View style={[styles.innerFormView]}>
                                <FloatingLabel
                                    labelStyle={{ color: this.state.amount_Empty ? '#F60016' : this.state.amount_Clicked ? '#32CD32' : '#323232' }}
                                    inputStyle={styles.input}
                                    keyboardType='numeric'
                                    style={[styles.formInput, { borderBottomColor: this.state.amount_Empty ? '#F60016' : this.state.amount_Clicked ? '#32CD32' : "#ddd" }]}
                                    value={this.props.data ? this.props.data.amount : this.state.amount}
                                    underlineColorAndroid={"transparent"}
                                    onBlur={() => this.setState({ amount_Clicked: false })}
                                    onFocus={() => this.setState({ amount_Clicked: true })}
                                    onChangeText={(amount) => { this.setState({ amount, amount_Empty: false }) }}
                                >Enter Donation Amount</FloatingLabel>
                            </View>
                            <View style={[styles.nextArrow, { alignItems: 'flex-end' }]}>
                                <TouchableOpacity onPress={() => { this.state.disable ? null : this.validate() }} >
                                    {this.state.disable ? <ActivityIndicator /> :
                                        <Image source={require('../Images/icon-arrow.png')} style={{}} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: WINDOW.height * 1,
    },
    banner: {
        flex: Platform.OS === 'android' ? 0.29 : 0.25,
        flexDirection: "row"
    },
    bannerText: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: WINDOW.height * 0.05,
        left: WINDOW.width * 0.02,
    },
    formSection: {
        flex: 0.65,
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
        borderBottomWidth: 1.5
    },
    input: {
        borderWidth: 0,
        color: "#323232",
        paddingVertical: 2
    },
    innerFormView: {
        flex: .142,
        paddingBottom: 30
    },
    nextArrow: {
        flex: .28,
        paddingTop: '5%',
    }
});

export default Homepage;