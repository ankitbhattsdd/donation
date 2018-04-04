import * as React from 'react';
import { View,  Image, StyleSheet, Dimensions } from 'react-native';
import { Actions } from "react-native-router-flux";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SERVER_URL, FONT_SIZE } from "./global";
import Homepage from './HomePage';

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

class Header extends React.Component {

    _renderItem({ item, index }) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={item.image} resizeMode='contain' style={{ height: WINDOW.height * 0.28, width: WINDOW.width }} />
            </View>
        );
    }

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={imageSwiper}
                renderItem={this._renderItem}
                sliderWidth={WINDOW.width}
                itemWidth={WINDOW.width}
                onSnapToItem={(index) => this.setState({ activeSlide: index })}
            />
        );
    }
}

export default Header;

