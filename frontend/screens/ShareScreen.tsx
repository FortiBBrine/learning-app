import React from 'react';
import {Appbar, Button} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {ShareScreenNavigationProp} from "../navigation/Navigator";
import {Share, StyleSheet, View} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {useNavigation} from "@react-navigation/native";
import {usePeopleStore} from "../store/peopleStore";

const ShareScreen = () => {

    const { t } = useTranslation();
    const navigation = useNavigation<ShareScreenNavigationProp>();
    const { profile } = usePeopleStore();

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={t("share")} />
            </Appbar.Header>

            <View style={styles.container}>
                { profile != null && (
                    <View style={{
                        alignSelf: "center"
                    }}>
                        <QRCode
                            value={profile.username}
                            size={325}
                            backgroundColor={"transparent"}
                        />
                    </View>

                )}
                <Button mode="contained-tonal" icon={"share"} onPress={async () => {
                    const result = await Share.share({
                        message: "LearningApp. Користувач: " + profile?.name
                    });
                }}>{t("share")}</Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        alignItems: "stretch",
        gap: 10
    }
});

export default ShareScreen;