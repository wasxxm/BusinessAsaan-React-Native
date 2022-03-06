import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import OrdersScreen from "../screens/orders/OrdersScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Orders" component={OrdersScreen} />
    <Stack.Screen name="OrderDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
