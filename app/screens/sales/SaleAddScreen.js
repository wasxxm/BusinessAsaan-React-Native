import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import * as Yup from "yup";

import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../../components/forms";
import ListPickerItem from "../../components/ListPickerItem";
import Screen from "../../components/Screen";
import listingsApi from "../../api/listings";
import UploadScreen from "../UploadScreen";
import useApi from "../../hooks/useApi";
import customersApi from "../../api/customers";
import ActivityIndicator from "../../components/ActivityIndicator";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
});

const customers = [];

function SaleAddScreen() {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const getCustomersApi = useApi(customersApi.getCustomers);

    useEffect(() => {
        getCustomersApi.request().then((res) => {
            // console.log(res);
            if (res.data && res.data?.customers) {
                res.data.customers.forEach(customer => {
                    // console.log(customer.business_owner.name);
                    customers.push({
                        label: customer.business_owner.name,
                        value: customer.id,
                    });
                })
            }
        });
    }, []);

    const handleSubmit = async (listing, {resetForm}) => {
        setProgress(0);
        setUploadVisible(true);
        const result = await listingsApi.addListing(
            {...listing},
            (progress) => setProgress(progress)
        );

        if (!result.ok) {
            setUploadVisible(false);
            return alert("Could not save the listing");
        }

        resetForm();
    };

    return (
        <>
            <ActivityIndicator visible={getCustomersApi.loading}/>
            <Screen style={styles.container}>
                <UploadScreen
                    onDone={() => setUploadVisible(false)}
                    progress={progress}
                    visible={uploadVisible}
                />
                <Form
                    initialValues={{
                        title: "",
                        price: "",
                        description: "",
                        category: null,
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <Picker
                        items={customers}
                        name="customer_business"
                        numberOfColumns={3}
                        PickerItemComponent={ListPickerItem}
                        placeholder="Customer Business"
                    />
                    <FormField maxLength={255} name="title" placeholder="Title"/>
                    <FormField
                        keyboardType="numeric"
                        maxLength={8}
                        name="price"
                        placeholder="Price"
                        width={120}
                    />
                    <FormField
                        maxLength={255}
                        multiline
                        name="description"
                        numberOfLines={3}
                        placeholder="Description"
                    />
                    <SubmitButton title="Add Sale"/>
                </Form>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
export default SaleAddScreen;
