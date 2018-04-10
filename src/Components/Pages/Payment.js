import * as React from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Text, Dimensions, Platform, ActivityIndicator } from 'react-native';
import BTClient from 'react-native-braintree-xplat';
import { Actions } from "react-native-router-flux";
import { SERVER_URL } from "./global";

console.ignoredYellowBox = ['Warning:'];

class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    
componentWillReceiveProps(nextProps){
    console.log(nextProps,'nextProps')
    if(nextProps.Amount){
        alert()
    }
}

    componentDidMount() {

      

        // let clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIwZjhkNDlhODE0OWUwNmMyYmM3MTdjMGY3ZjQ3MTY1ODRmOGM1MjUzNTdmNWE2OTA2ZmUxZGZhNmMwNTY0NzQ0fGNyZWF0ZWRfYXQ9MjAxOC0wMi0yMFQxMDowNjo1MS43MjEyNjUxNDErMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0="
        // BTClient.setup(clientToken);

        BTClient.setup(this.props.clientToken);

        const card = {
        }
        const options = {
            bgColor: '#FFF',
            tintColor: 'orange',
            callToActionText: 'Donate Now',
            threeDSecure: {
                amount: this.props.Amount
            }
        }

        BTClient.showPaymentViewController(options).then((nonce) => {
            console.log("payment done===>", nonce)

            let dataTosend = {
                "payment_method_nonce": nonce,
                "amount": this.props.Amount,
                "organizationName": "Bridge to Uganda",
                "donorFullName": this.props.Name,
                "donorEmailAddress": this.props.Email,
                "donationAmount": this.props.Amount,
                "donorAmount": this.props.Amount,
                "donorPurpose": this.props.Purpose,
                "donorPostalAddress": this.props.streetAddress1,
                "donorCCEmailAddress": this.props.CCemail
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
                    }
                    else {
                        Actions.Error()
                        return false
                    }

                })
        })
            .catch(function (err) {
                Actions.Error();
                //error handling
                console.log("err===>", err)
            });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }
}

export default Payment;