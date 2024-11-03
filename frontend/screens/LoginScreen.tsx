import React from 'react';
import {StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import {LoginScreenNavigationProp} from "../navigation/Navigator";
import {Button, HelperText, Text, TextInput} from "react-native-paper";
import {useDispatch} from "react-redux";
import {setToken} from "../store/slice/loginSlice";
import {login} from "../api/loginApi";

const LoginScreen = () => {

    const navigation = useNavigation<LoginScreenNavigationProp>();
    const dispatch = useDispatch();

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [usernameErrors, setUsernameErrors] = React.useState<string | undefined>(undefined)
    const [passwordErrors, setPasswordErrors] = React.useState<string | undefined>(undefined)

    const onPress = async () => {
        const data = await login(username, password)

        if (data.token == null) {
            setUsernameErrors(data.result.username)
            setPasswordErrors(data.result.password)
            return
        }

        const token = data.token;

        dispatch(setToken(token))
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={{
                alignSelf: "center"
            }}>
                Ввійдіть в акаунт
            </Text>

            <TextInput label="Користувач" value={username} onChangeText={text => setUsername(text)} />

            { usernameErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {usernameErrors}
                </HelperText>
            }

            <TextInput label="Пароль" secureTextEntry value={password} onChangeText={text => setPassword(text)} />

            { passwordErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {passwordErrors}
                </HelperText>
            }

            <Button onPress={onPress} mode="outlined">Ввійти</Button>
            <Button onPress={() => {
                navigation.navigate("Register")
            }} mode="outlined">
                Реєстрація
            </Button>
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