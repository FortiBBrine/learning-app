import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import {LoginScreenNavigationProp} from "../navigation/Navigator";
import {Button} from "react-native-paper";
import {useDispatch} from "react-redux";
import {setLoggedIn} from "../store/slice/loginSlice";

const LoginScreen = () => {

    const navigation = useNavigation<LoginScreenNavigationProp>();
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text>
                Please Log In
            </Text>
            <Button onPress={() => {
                dispatch(setLoggedIn(true))
            }} mode="outlined">Ввійти</Button>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default LoginScreen;