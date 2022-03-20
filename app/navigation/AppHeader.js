import React from "react";
import {StyleSheet, View} from "react-native";


import AppText from "../components/Text";
import Button from "../components/Button";


function AppHeader({children, onPress}) {
    return (
        <View style={styles.headerWrapper}>
            <AppText style={{flex: 1}}>{children}</AppText>
            {onPress && (<Button size="small" title="Retry" style={{width: "auto"}} onPress={onPress}/>)}
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: "row",
        alignItems: "center",
    }
});

export default AppHeader;
