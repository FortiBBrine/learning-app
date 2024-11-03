import React from 'react';
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {RegisterScreenNavigationProp} from "../navigation/Navigator";
import {StatusBar} from "expo-status-bar";
import {Button, HelperText, Text, TextInput} from "react-native-paper";
import {setToken} from "../store/slice/loginSlice";
import {useDispatch} from "react-redux";
import {register} from "../api/registerApi";

const RegisterScreen = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const dispatch = useDispatch()

    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [usernameErrors, setUsernameErrors] = React.useState<string | undefined>(undefined)
    const [passwordErrors, setPasswordErrors] = React.useState<string | undefined>(undefined)
    const [emailErrors, setEmailErrors] = React.useState<string | undefined>(undefined)

    const onPress = async () => {
        const res = await register(username, email, password)

        if (res.token == null) {
            setUsernameErrors(res.result.username)
            setEmailErrors(res.result.email)
            setPasswordErrors(res.result.password)
            return;
        }

        const token = res.token;

        dispatch(setToken(token))
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={{
                alignSelf: "center"
            }}>
                Зареєструйтесь
            </Text>

            <TextInput label="Користувач" value={username} onChangeText={text => setUsername(text)} />

            { usernameErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {usernameErrors}
                </HelperText>
            }

            <TextInput label="Електронна пошта" value={email} onChangeText={text => setEmail(text)} />

            { emailErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {emailErrors}
                </HelperText>
            }

            <TextInput secureTextEntry label="Пароль" value={password} onChangeText={text => setPassword(text)} />

            { passwordErrors != undefined &&
                <HelperText type="error" visible={true}>
                    {passwordErrors}
                </HelperText>
            }

            <Button onPress={onPress} mode="outlined">Зареєструватись</Button>

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