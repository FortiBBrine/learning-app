import React from 'react';
import {StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Button, Checkbox, HelperText, Text, TextInput} from "react-native-paper";
import {setToken} from "../store/slice/loginSlice";
import {useDispatch} from "react-redux";
import {register} from "../api/registerApi";
import {useTranslation} from "react-i18next";

const RegisterScreen = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    const [usernameErrors, setUsernameErrors] = React.useState<string | undefined>(undefined);
    const [passwordErrors, setPasswordErrors] = React.useState<string | undefined>(undefined);
    const [emailErrors, setEmailErrors] = React.useState<string | undefined>(undefined);
    const [nameErrors, setNameErrors] = React.useState<string | undefined>(undefined);

    const [secure, setSecure] = React.useState<boolean>(true);
    const [personalData, setPersonalData] = React.useState<boolean>(false);

    const [t, i18n] = useTranslation();

    const changeUsernameText = (value: string) => {
        setUsername(
            value
                .split("")
                .filter(char => /[A-Za-z0-9]/.test(char))
                .join("")
        );
    };

    const changePasswordText = (value: string) => {
        setPassword(
            value
                .split("")
                .filter(char => /[A-Za-z0-9.%+-]/.test(char))
                .join("")
        );
    };

    const changeEmailText = (value: string) => {
        setEmail(
            value
                .toLowerCase()
                .split("")
                .filter(char => /[A-Za-z0-9@.]/.test(char))
                .join("")
        );
    };

    const onPress = async () => {
        const res = await register(email, name, username, password);

        if (res.token == null) {
            setUsernameErrors(res.result.username);
            setEmailErrors(res.result.email);
            setPasswordErrors(res.result.password);
            setNameErrors(res.result.name);
            return;
        }

        const token = res.token;

        dispatch(setToken(token));
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={{
                alignSelf: "center"
            }}>
                {t("register-page-title")}
            </Text>

            <TextInput label={t("username")} value={username} onChangeText={changeUsernameText} />

            { usernameErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {usernameErrors}
                </HelperText>
            }

            <TextInput label={t("name")} value={name} onChangeText={text => setName(text)} />

            { nameErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {nameErrors}
                </HelperText>
            }

            <TextInput label={t("email")} value={email} onChangeText={changeEmailText} />

            { emailErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {emailErrors}
                </HelperText>
            }

            <TextInput
                secureTextEntry={secure}
                label={t("password")}
                value={password}
                onChangeText={changePasswordText}
                right={<TextInput.Icon onPress={() => setSecure(!secure)} icon={secure ? "eye" : "eye-off"} />}
            />

            <Checkbox.Item status={personalData ? "checked" : "unchecked"} label={t("personal-data")} onPress={() => setPersonalData(!personalData)} />

            { passwordErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {passwordErrors}
                </HelperText>
            }

            <Button onPress={onPress} mode="outlined">{t("register-button")}</Button>

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: "center",
        alignItems: "stretch",
        gap: 20
    }
})

export default RegisterScreen;