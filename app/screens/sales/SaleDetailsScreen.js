import axios from 'axios'
import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import * as FileSystem from 'expo-file-system';
import {Table, Row} from 'react-native-table-component';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from "expo-intent-launcher";


import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import DataError from "../../components/DataError";
import invoicesApi from "../../api/invoices";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import useApi from "../../hooks/useApi";
import settings from "../../config/settings";


function SaleDetailsScreen({route, navigation}) {
    const sale = route.params;

    const getInvoiceApi = useApi(invoicesApi.getInvoice);
    const exportInvoiceApi = useApi(invoicesApi.exportInvoice);

    const [printDisabled, setPrintDisabled] = useState(true);

    const print = async () => {
        setPrintDisabled(true);
        /*        exportInvoiceApi.request({id: sale.id, export: 'pdf'}).then(() => {
                    setPrintDisabled(false);
                    // console.log(exportInvoiceApi);
                })*/
        const headers = {
            'Content-Type': 'application/pdf',
            'Authorization': 'Bearer 46|1ZPokccTruoDr3NY9bOjFv0PiHqlDR78PzbpvN8U'
        }
        const response = await axios.get(settings.apiUrl + '/invoices/' + sale.id + '/print?export=pdf', {responseType: 'blob', headers: headers});

        const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (perm.status !== 'granted') {
            return;
        }

        const fr = new FileReader();
        fr.onload = async () => {
            const fileUri = `${FileSystem.documentDirectory}${sale.invoice_no}-invoice.pdf`;
            await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], {encoding: FileSystem.EncodingType.Base64});

            try {
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                const album = await MediaLibrary.getAlbumAsync('Downloads');
                if (album == null) {
                    await MediaLibrary.createAlbumAsync('Downloads', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }
                FileSystem.getContentUriAsync(fileUri).then(cUri => {
                    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                        data: cUri.uri,
                        flags: 1,
                        type: 'application/pdf',
                    });
                });
            } catch (e) {
                // console.log(e);
            }

            setPrintDisabled(false);

        };
        fr.readAsDataURL(response.data);
    }

    useEffect(() => {
        navigation.setOptions({
            title: sale.invoice_no,
            headerRight: () => {
                return <Button disabled={printDisabled} title="Print" size="small"
                               style={{width: "auto", marginRight: 0}}
                               btnStyle={{textTransform: 'none'}} onPress={() => print()}/>
            }
        });
    }, [printDisabled]);

    useEffect(() => {
        getInvoiceApi.request({id: sale.id}).then(() => {
            setPrintDisabled(false);
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
                    <View style={styles.headingWrapper}>
                        <Text
                            style={defaultStyles.heading}>{sale.invoice_no} to {sale.purchaser.business_owner.name}</Text>
                    </View>
                    <View style={styles.labels}>
                        <View>
                            <Text style={styles.label}>Total Due</Text>
                            <Text style={styles.labelValue}>{sale.formatted_sale_price}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Total Paid</Text>
                            <Text style={styles.labelValue}>{sale.formatted_paid}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Remaining</Text>
                            <Text style={styles.labelValue}>{sale.formatted_remaining}</Text>
                        </View>
                    </View>
                    <View style={[styles.labels]}>
                        <View>
                            <Text style={styles.label}>Discount</Text>
                            <Text style={styles.labelValue}>{sale.formatted_discount}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Sale Date</Text>
                            <Text style={styles.labelValue}>{sale.created_at}</Text>
                        </View>
                    </View>
                    {!getInvoiceApi.loading && getInvoiceApi.data?.invoice?.sales && (
                        <Table borderStyle={{borderWidth: 1, borderColor: colors.gray200}}>
                            <Row
                                data={['Product Name', 'Quantity', 'Rate']}
                                flexArr={[2, 1, 1]}
                                style={styles.head}
                                textStyle={styles.headText}
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
    headingWrapper: {
        marginBottom: 12,
    },
    labels: {marginBottom: 12, flexDirection: "row", justifyContent: 'space-between',},
    label: {
        fontSize: 14, color: colors.medium,
    },
    labelValue: {
        marginTop: 5,
        fontSize: 14,
    },
    head: {height: 40, backgroundColor: colors.white},
    headText: {fontWeight: "bold", color: colors.medium,textAlign: 'center'},
    wrapper: {flexDirection: 'row'},
    tableTitle: {flex: 1, backgroundColor: '#2ecc71'},
    row: {height: 28},
    text: {textAlign: 'center'},
});

export default SaleDetailsScreen;
