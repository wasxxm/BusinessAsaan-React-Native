import { Text, StyleSheet, View, Image } from 'react-native'
import React, { Component } from 'react'
import colors from '../config/colors'

export default class Logo extends Component {
  render() {
    return (
        <View style={[styles.logoContainer]}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.tagline}>Ab business chalana huwa asaan!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    logo: {
        height: 80,
        width: '100%',
        resizeMode:"center"
      },
      logoContainer: {
        width: '100%',
        padding: 20,
        alignItems: "center",
      },
      tagline: {
        fontSize: 20,
        fontWeight: "500",
        color: colors.medium,
        paddingVertical: 0,
      },
})