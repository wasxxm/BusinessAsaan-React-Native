import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import SaleDetailsScreen from "../screens/sales/SaleDetailsScreen";
import FeedsScreen from "../screens/FeedsScreen";
import routes from "./routes";


const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{
        headerShown: true,
        // headerTitleContainerStyle: {
        //     // left: headerRight ? 50 : "auto",
        //     // flexDirection: "row",
        // },
        headerRightContainerStyle: {
            marginRight: 20,
        }
    }}>
        <Stack.Screen name={routes.FEEDS} component={FeedsScreen} options={{headerShown: false}}/>
        <Stack.Screen name={routes.SALE_DETAILS} component={SaleDetailsScreen}/>
    </Stack.Navigator>
);

export default FeedNavigator;
