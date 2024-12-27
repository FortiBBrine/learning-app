import React from 'react';
import {RadioButton} from "react-native-paper";
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeLanguageScreen = () => {

    const [t, i18n] = useTranslation();
    const [value, setValue] = React.useState<string>(i18n.language);

    const setLanguage = async (language: string) => {
        setValue(language);
        await i18n.changeLanguage(language);
        await AsyncStorage.setItem("language", language);
    }

    return (
        <RadioButton.Group onValueChange={value => setLanguage(value)} value={value}>
            <RadioButton.Item value={"ua"} label={t("ua-language")} />
            <RadioButton.Item value={"uk"} label={t("uk-language")} />
        </RadioButton.Group>
    );
};

export default ChangeLanguageScreen;