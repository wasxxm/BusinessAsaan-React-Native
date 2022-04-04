import React, {useEffect} from "react";
import {FlatList, StyleSheet, View} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";
import DataError from "../components/DataError";
import defaultStyles from "../config/styles";
import invoicesApi from "../api/invoices";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import {ListItem} from "../components/lists";

function FeedsScreen({navigation}) {
    const getInvoicesApi = useApi(invoicesApi.getInvoices);

    useEffect(() => {
        getInvoicesApi.request({only: 'invoices', per_page: 10});
    }, []);

    return (
        <>
            <ActivityIndicator visible={getInvoicesApi.loading}/>
            <Screen style={{marginTop: 10}}>
                <View style={styles.headingWrapper}>
                    <View style={styles.headingRow}>
                        <AppText style={[{flex: 1}, defaultStyles.heading]}>Recent Sales</AppText>
                        <Button title="Add Sale" size="small" style={{width: "auto"}}/>
                    </View>
                </View>
                {!getInvoicesApi.loading && getInvoicesApi.data?.invoices && (<FlatList
                    data={getInvoicesApi.data.invoices.data}
                    keyExtractor={(invoice) => invoice.id.toString()}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.invoice_no + " to " + item.purchaser.business_owner.name}
                            subTitle={item.created_at}
                            onPress={() => navigation.navigate(routes.SALE_DETAILS, item)}
                        />
                    )}
                />)}
                {
                    getInvoicesApi.error &&
                    (<DataError msg="Couldn't retrieve the sales." onPress={
                        () => {
                            getInvoicesApi.request()
                        }}/>)
                }
            </Screen>
        </>
    );
}

export default FeedsScreen;


const styles = StyleSheet.create({
    headingWrapper: {
        paddingHorizontal: 20,
    },
    headingRow: {
        flexDirection: "row",
        alignItems: "center",
    }
});
