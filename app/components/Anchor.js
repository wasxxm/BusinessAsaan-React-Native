import * as Linking from 'expo-linking';
import React from "react";

import Text from "./Text";

export default class Anchor extends React.Component {
    _handlePress = () => {
        Linking.openURL(this.props.href);
        this.props.onPress && this.props.onPress();
    };

    render() {
        return (
            <Text {...this.props} onPress={this._handlePress}>
                {this.props.children}
            </Text>
        );
    }
}