import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Button, Chip} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import {TuneScreenNavigationProp} from "../navigation/Navigator";
import {changeSubjectList, getMySubjectList} from "../api/subjectApi";
import {useAuthStore} from "../store/authStore";

const TuneScreen = () => {

    const { t } = useTranslation();
    const navigation = useNavigation<TuneScreenNavigationProp>();

    const { setAccessToken, setRefreshToken } = useAuthStore();

    const [selected, setSelected] = useState<string[]>([]);

    const subjects = [
        "math",
        "physics",
        "geography",
        "history",
        "biology",
        "chemistry",
        "algebra",
        "geometry",
        "information-technology",
        "foreign-languages"
    ];

    useEffect(() => {
        getMySubjectList()
            .then(data => {
                setSelected(data)
            });
    }, [])

    const onSelect = async (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];

        setSelected(newSelected);
        await changeSubjectList(newSelected);
    }

    return (
        <View style={styles.container}>
            <View style={styles.chips}>
                { subjects.map((subject, index) => (
                    <Chip
                        key={index}
                        onPress={async () => onSelect(subject)}
                        selected={selected.includes(subject)}
                    >
                        {t(subject)}
                    </Chip>
                ))}
            </View>
            <Button icon="translate" mode="contained-tonal" onPress={() => {
                navigation.navigate("ChangeLanguage");
            }}>{t("change-language")}</Button>
            <Button icon="lock" mode="contained-tonal" onPress={async () => {
                await setAccessToken(null);
                await setRefreshToken(null);
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
    },
    chips: {
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap"
    }
})

export default TuneScreen;