import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import routes from "./routes";


import SaleAddScreen from "../screens/sales/SaleAddScreen";


const Stack = createStackNavigator();

const SaleAddNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{
        headerShown: true,
        headerRightContainerStyle: {
            marginRight: 20,
        }
    }}>
        <Stack.Screen name={routes.SALE_ADD} component={SaleAddScreen}  options={{ title: 'Add Sale' }}/>
    </Stack.Navigator>
);

export default SaleAddNavigator;
