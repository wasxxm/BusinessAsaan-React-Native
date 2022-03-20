import React, {useEffect} from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import {Table, Row} from 'react-native-table-component';

import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import colors from "../../config/colors";
import DataError from "../../components/DataError";
import invoicesApi from "../../api/invoices";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import useApi from "../../hooks/useApi";
import defaultStyles from "../../config/styles";

function SaleDetailsScreen({route, navigation}) {
    const sale = route.params;

    const getInvoiceApi = useApi(invoicesApi.getInvoice);

    useEffect(() => {
        navigation.setOptions({
            title: sale.invoice_no,
            headerRight: () => <Button title="Add Sale" size="small" style={{width: "auto", marginRight: 0,}}/>,
        });
        getInvoiceApi.request({id: sale.id}).then(() => {
        });
    }, []);

    return (
        <>
            <ActivityIndicator visible={getInvoiceApi.loading}/>
            <Screen>
                <KeyboardAvoidingView
                    behavior="position"
                    style={styles.detailsContainer}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
                >
                    <View>
                        <Text style={defaultStyles.heading}>{sale.invoice_no} to {sale.purchaser.business_owner.name}</Text>
                        <Text style={[defaultStyles.subHeading, {marginVertical: 7,}]}>Rs. {sale.amount}</Text>
                    </View>
                    {!getInvoiceApi.loading && getInvoiceApi.data?.invoice?.sales && (
                        <Table borderStyle={{borderWidth: 1, borderColor: colors.gray200}}>
                            <Row
                                data={['Product Name', 'Quantity', 'Rate']}
                                flexArr={[2, 1, 1]}
                                style={styles.head}
                                textStyle={[styles.text, styles.headText]}
                            />
                            {getInvoiceApi.data.invoice.sales.map((sale, index) =>
                                (<Row
                                    key={sale.id}
                                    flexArr={[2, 1, 1]}
                                    data={[sale.product.formatted_name, sale.quantity, sale.rate]}
                                    style={styles.head}
                                    textStyle={styles.text}
                                />)
                            )}
                        </Table>
                    )}
                </KeyboardAvoidingView>
                {getInvoiceApi.error &&
                (<DataError msg="Couldn't retrieve the sale details." onPress={
                        () => {
                            getInvoiceApi.request({id: sale.id})
                        }}/>
                )}
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        paddingHorizontal: 20,
    },
    image: {
        width: "100%",
        height: 300,
    },
    head: {height: 40, backgroundColor: colors.white},
    headText: {fontWeight: "bold", color: colors.medium},
    wrapper: {flexDirection: 'row'},
    tableTitle: {flex: 1, backgroundColor: '#2ecc71'},
    row: {height: 28},
    text: {textAlign: 'center'},
});

export default SaleDetailsScreen;
