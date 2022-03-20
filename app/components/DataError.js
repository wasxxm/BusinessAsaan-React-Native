import React from "react";
import {StyleSheet, View,} from "react-native";


import AppText from "./Text";
import Button from "./Button";


function DataError({msg, onPress}) {
    return (
        <View style={styles.dataError}>
            <AppText>{msg}</AppText>
            <Button size="small" title="Retry" onPress={onPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    dataError: {
        padding: 20,
        position: "absolute",
        height: "100%",
        top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
    }
});

export default DataError;
