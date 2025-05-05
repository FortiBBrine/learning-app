import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Button, Chip, Text} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import {TuneScreenNavigationProp} from "../navigation/Navigator";
import {changeSubjectList, getMySubjectList} from "../api/subjectApi";
import {useAuthStore} from "../store/authStore";
import { UserDto } from '../api/relationApi';
import {getProfile} from "../api/profileApi";

const TuneScreen = () => {

    const { t } = useTranslation();
    const navigation = useNavigation<TuneScreenNavigationProp>();

    const { logout } = useAuthStore();
    const [selected, setSelected] = useState<string[]>([]);
    const [user, setUser] = useState<UserDto | null>(null);

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
        getProfile()
            .then(user => {
                setUser(user);
                setSelected(user.subjects);
            })
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
            { user && (
                <>
                    <Text variant={"bodyMedium"}>
                        {t("name")}: {user.name}
                    </Text>
                    <Text variant={"bodyMedium"}>
                        {t("email")}: {user.email}
                    </Text>
                    <Text variant={"bodyMedium"}>
                        {t("rating")}: {user.rating}
                    </Text>
                </>
            )}

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
            <Button icon="lock" mode="contained-tonal" onPress={logout}>{t("logout")}</Button>
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