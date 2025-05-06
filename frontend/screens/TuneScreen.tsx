import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Button, SegmentedButtons, Text, TextInput} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import {TuneScreenNavigationProp} from "../navigation/Navigator";
import {useAuthStore} from "../store/authStore";
import {settingProfile} from "../api/profileApi";
import {usePeopleStore} from "../store/peopleStore";
import {logoutAll} from "../api/loginApi";

const TuneScreen = () => {

    const { profile } = usePeopleStore();

    const { t } = useTranslation();
    const navigation = useNavigation<TuneScreenNavigationProp>();

    const { logout, refreshToken } = useAuthStore();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("NONE");

    const [nameEdit, setNameEdit] = useState<boolean>(false);
    const [emailEdit, setEmailEdit] = useState<boolean>(false);

    useEffect(() => {
        if (profile != null) {
            setName(profile.name);
            setRole(profile.role);
            setEmail(profile.email);
        }
    }, [profile]);

    const changeUserRole = async (role: string) => {
        setRole(role);

        await settingProfile({
            role: role,
        });
    };

    const changeUserName = async () => {
        setNameEdit(!nameEdit);

        if (nameEdit) {
            await settingProfile({
                name: name,
            });
        }
    };

    const changeUserEmail = async () => {
        setEmailEdit(!emailEdit);

        if (emailEdit) {
            await settingProfile({
                email: email,
            });
        }
    };

    return (
        <View style={styles.container}>
            { profile && (
                <>
                    <TextInput
                        label={t("name")}
                        disabled={!nameEdit}
                        value={name}
                        onChangeText={setName}
                        right={<TextInput.Icon icon="account-edit-outline" onPress={changeUserName} />}
                    />
                    <TextInput
                        label={t("email")}
                        disabled={!emailEdit}
                        value={email}
                        onChangeText={setEmail}
                        right={<TextInput.Icon icon="account-edit-outline" onPress={changeUserEmail} />}
                    />
                    <Text variant={"bodyMedium"}>
                        {t("rating")}: {profile.rating}
                    </Text>
                    <SegmentedButtons buttons={[
                        {
                            "value": "TEACHER",
                            "label": t("teacher")
                        },
                        {
                            "value": "STUDENT",
                            "label": t("student")
                        }
                    ]} value={role} onValueChange={changeUserRole} />
                </>
            )}

            <Button icon="book-edit" mode="contained-tonal" onPress={() => {
                navigation.navigate("ChangeSubjects");
            }}>{t("choose-subjects")}</Button>
            <Button icon="translate" mode="contained-tonal" onPress={() => {
                navigation.navigate("ChangeLanguage");
            }}>{t("change-language")}</Button>
            <Button icon="security" mode="contained-tonal" onPress={() => {
                navigation.navigate("Security");
            }}>{t("security")}</Button>
            <Button icon="lock" mode="contained-tonal" onPress={async () => {
                if (refreshToken != null) {
                    await logoutAll(refreshToken);
                }
            }}>{t("logout-all")}</Button>
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
    }
})

export default TuneScreen;