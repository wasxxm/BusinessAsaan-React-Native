import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import * as Yup from "yup";
import {modelName} from 'expo-device';

import Screen from "../components/Screen";
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import Logo from "../components/Logo";
import ActivityIndicator from "../components/ActivityIndicator";
import logger from "../utility/logger";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async ({email, password, device_name}) => {
        setLoading(true);
        const result = await authApi.login(email, password, device_name);
        setLoading(false);
        if (!result.ok) return setLoginFailed(true);
        setLoginFailed(false);
        auth.logIn(result.data);
    };

    return (
        <>
            <ActivityIndicator visible={loading}/>
            <Screen style={styles.container}>
                <View style={styles.logoWrapper}>
                    <Logo/>
                </View>
                <Form
                    initialValues={{email: "", password: "", device_name: modelName}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage
                        error="Invalid email and/or password."
                        visible={loginFailed}
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder="enter your account email"
                        textContentType="emailAddress"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password"
                        placeholder="enter your account password"
                        secureTextEntry
                        textContentType="password"
                    />
                    <SubmitButton title="Login"/>
                </Form>
            </Screen>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.white,
    },
    logoWrapper: {
        marginBottom: 50,
    },
});

export default LoginScreen;
