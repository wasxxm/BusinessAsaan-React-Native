import React, {useEffect} from "react";
import {FlatList} from "react-native";

import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import defaultStyles from "../../config/styles";
import ordersApi from "../../api/orders";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import AppText from "../../components/Text";
import useApi from "../../hooks/useApi";
import {ListItem} from "../../components/lists";

function OrdersScreen({navigation}) {
    const getOrdersApi = useApi(ordersApi.getOrders);

    useEffect(() => {
        getOrdersApi.request({only: 'orders'});
    }, []);

    return (
        <>
            <ActivityIndicator visible={getOrdersApi.loading}/>
            <Screen>
                <AppText style={defaultStyles.heading}>Recent Orders</AppText>
                {getOrdersApi.error && (
                    <>
                        <AppText>Couldn't retrieve the orders.</AppText>
                        <Button title="Retry" onPress={getOrdersApi.request}/>
                    </>
                )}
                {getOrdersApi.data.orders && (<FlatList
                    data={getOrdersApi.data.orders.data}
                    keyExtractor={(order) => order.id.toString()}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.order_no + " by " + item.purchaser.business_owner.name}
                            subTitle={item.created_at}
                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                        />
                    )}
                />)}
            </Screen>
        </>
    );
}

export default OrdersScreen;
