import React from 'react';
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setToken} from "../store/slice/loginSlice";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import {TuneScreenNavigationProp} from "../navigation/Navigator";

const TuneScreen = () => {

    const dispatch = useDispatch();
    const [t, i18n] = useTranslation();
    const navigation = useNavigation<TuneScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Button icon="translate" mode="outlined" onPress={() => {
                navigation.navigate("ChangeLanguage");
            }}>{t("change-language")}</Button>
            <Button icon="lock" mode="outlined" onPress={async () => {
                await AsyncStorage.removeItem("token");
                dispatch(setToken(null));
            }}>{t("logout")}</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        gap: 20,
        alignItems: "stretch",
        justifyContent: "center",
    }
})

export default TuneScreen;