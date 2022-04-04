import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";
import {StyleSheet} from "react-native";
import SaleAddNavigator from "./SaleAddNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    useNotifications();

    return (
        <Tab.Navigator
            tabBarOptions={
                {
                    style: styles.tabBarStyle,
                    tabStyle: styles.tabBarItemStyle,
                    labelStyle: styles.tabBarLabelStyle,
                }
            }>
            <Tab.Screen
                name="Feed"
                component={FeedNavigator}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size}/>
                    ),
                }}
            />
            <Tab.Screen
                name="SaleAdd"
                component={SaleAddNavigator}
                options={({navigation}) => ({
                    tabBarButton: () => (
                        <NewListingButton
                            onPress={() => navigation.navigate(routes.SALE_ADD)}
                        />
                    ),
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons
                            name="plus-circle"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Account"
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {},
    tabBarItemStyle: {
        paddingBottom: 4,
        paddingTop: 4,
    },
    tabBarLabelStyle: {
        fontSize: 13,
    },
});

export default AppNavigator;
