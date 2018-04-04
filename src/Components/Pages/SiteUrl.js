import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class SiteUrl extends Component {
    render() {
        return (
            <WebView
                source={{ uri: 'https://www.bridgetouganda.org/' }}
            />
        );
    }
}