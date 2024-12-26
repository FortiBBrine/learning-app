import React, {useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import {RadioButton, Text, TouchableRipple} from "react-native-paper";
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeLanguageScreen = () => {

    const [checked, setChecked] = React.useState<string | null>(null);
    const [t, i18n] = useTranslation();

    useEffect(() => {
        setChecked(i18n.language);
    }, []);

    const setLanguage = async (language: string) => {
        setChecked(language);
        await i18n.changeLanguage(language);
        await AsyncStorage.setItem("language", language);
    }

    return (
        <View style={styles.list}>
            <View style={styles.listItem}>
                <RadioButton
                    value={"ua"}
                    status={checked === "ua" ? "checked" : "unchecked"}
                    onPress={async () => {await setLanguage("ua")}}
                />
                <Text variant={"titleLarge"}>{t("ua-language")}</Text>
            </View>
            <View style={styles.listItem}>
                <RadioButton
                    value={"uk"}
                    status={checked === "uk" ? "checked" : "unchecked"}
                    onPress={async () => {await setLanguage("uk")}}
                />
                <Text variant={"titleLarge"}>{t("uk-language")}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 15
    },
    listItem: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    }
})

export default ChangeLanguageScreen;