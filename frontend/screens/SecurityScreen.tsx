import React, {useState} from 'react';
import {Appbar, Button, RadioButton, Text} from "react-native-paper";
import {SecurityScreenNavigationProp} from "../navigation/Navigator";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {View} from "react-native";

const SecurityScreen = () => {

    const navigation = useNavigation<SecurityScreenNavigationProp>();
    const { t } = useTranslation();

    const [addRelationPolicy, setAddRelationPolicy] = useState<string>("all");

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={t("security")} />
            </Appbar.Header>

            <View style={{
                margin: 10,
                gap: 5
            }}>
                <Text style={{alignSelf: "center"}} variant="headlineSmall">{t("ability-to-add")}</Text>
                <RadioButton.Group onValueChange={value => setAddRelationPolicy(value)} value={addRelationPolicy}>
                    <RadioButton.Item value={"all"} label={t("all")} />
                    <RadioButton.Item value={"by-request"} label={t("by-request")} />
                    <RadioButton.Item value={"nobody"} label={t("nobody")} />
                </RadioButton.Group>
                <Button icon="delete-clock-outline" mode="contained-tonal" onPress={() => {}}>{t("delete-data")}</Button>
            </View>
        </>
    );
};

export default SecurityScreen;