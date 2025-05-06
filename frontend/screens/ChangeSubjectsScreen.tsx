import React, {useEffect, useState} from 'react';
import {Appbar, Chip} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {ChangeSubjectsScreenNavigationProp} from "../navigation/Navigator";
import { useTranslation } from 'react-i18next';
import {usePeopleStore} from "../store/peopleStore";
import {settingProfile} from "../api/profileApi";
import {StyleSheet, View} from "react-native";

const ChangeSubjectsScreen = () => {

    const navigation = useNavigation<ChangeSubjectsScreenNavigationProp>();
    const { t } = useTranslation();

    const { profile } = usePeopleStore();
    const subjects = [
        "ukrainian-language",
        "ukrainian-literature",
        "english-language",
        "german-language",
        "polish-language",
        "french-language",
        "world-literature",
        "ukrainian-history",
        "world-history",
        "algebra",
        "geometry",
        "biology",
        "geography",
        "physics",
        "astronomy",
        "chemistry",
        "computer-science"
    ];
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        if (profile != null) {
            setSelected(profile.subjects);
        }
    }, [profile]);

    const onSelect = async (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];

        setSelected(newSelected);
        await settingProfile({
            subjects: newSelected,
        });
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={t("choose-subjects")} />
            </Appbar.Header>

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
        </>
    );
};

const styles = StyleSheet.create({
    chips: {
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap",
        margin: 20
    }
});

export default ChangeSubjectsScreen;