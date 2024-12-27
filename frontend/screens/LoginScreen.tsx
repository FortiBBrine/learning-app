import React from 'react';
import {StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import {LoginScreenNavigationProp} from "../navigation/Navigator";
import {Button, HelperText, Text, TextInput} from "react-native-paper";
import {useDispatch} from "react-redux";
import {setToken} from "../store/slice/loginSlice";
import {login} from "../api/loginApi";
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {

    const navigation = useNavigation<LoginScreenNavigationProp>();
    const dispatch = useDispatch();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [usernameErrors, setUsernameErrors] = React.useState<string | undefined>(undefined);
    const [passwordErrors, setPasswordErrors] = React.useState<string | undefined>(undefined);

    const [t, i18n] = useTranslation();
    const [secure, setSecure] = React.useState(true);

    const onPress = async () => {
        const data = await login(username, password);

        if (data.token == null) {
            setUsernameErrors(data.result.username);
            setPasswordErrors(data.result.password);
            return;
        }

        const token = data.token;

        await AsyncStorage.setItem("token", token);

        dispatch(setToken(token));
    };

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

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={{
                alignSelf: "center"
            }}>
                {t("login-page-title")}
            </Text>

            <TextInput label={t("login")} value={username} onChangeText={changeUsernameText} />

            { usernameErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {usernameErrors}
                </HelperText>
            }

            <TextInput
                label={t("password")}
                secureTextEntry={secure}
                value={password}
                onChangeText={changePasswordText}
                right={<TextInput.Icon onPress={() => setSecure(!secure)} icon={secure ? "eye-off" : "eye"} />}
            />

            { passwordErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {passwordErrors}
                </HelperText>
            }

            <Button onPress={onPress} mode="outlined">{t("login-button")}</Button>
            <Button onPress={() => {
                navigation.navigate("Register")
            }} mode="outlined">
                {t("register-goto-button")}
            </Button>
            <Button icon="translate" mode="outlined" onPress={() => {
                navigation.navigate("ChangeLanguage");
            }}>{t("change-language")}</Button>

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

export default LoginScreen;