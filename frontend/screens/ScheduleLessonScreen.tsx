import React from 'react';
import {StyleSheet, View} from "react-native";
import {Appbar, Button, Switch, Text, TextInput} from "react-native-paper";
import {useNavigation, useRoute} from "@react-navigation/native";
import {
    ScheduleLessonScreenNavigationProp, ScheduleLessonScreenRouteProp
} from "../navigation/Navigator";
import {useTranslation} from "react-i18next";
import {sendScheduleRequest} from "../api/scheduledLessonsApi";

const ScheduleLessonScreen = () => {

    const navigation = useNavigation<ScheduleLessonScreenNavigationProp>();
    const route = useRoute<ScheduleLessonScreenRouteProp>();
    const { t } = useTranslation();
    const [title, setTitle] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [from, setFrom] = React.useState("");
    const [to, setTo] = React.useState("");
    const [online, setOnline] = React.useState(false);

    const scheduleLesson = async () => {
        await sendScheduleRequest({
            title: title,
            online: online,
            subject: subject,
            from: from,
            to: to,
            target: route.params.person.username
        });

        navigation.goBack();
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={t("schedule-lesson")} />
            </Appbar.Header>

            <View style={styles.container}>
                <TextInput label={t("title-subject")} value={title} onChangeText={setTitle} />
                <TextInput label={t("subject")} value={subject} onChangeText={setSubject} />
                <TextInput label={t("from-time")} value={from} onChangeText={setFrom} />
                <TextInput label={t("to-time")} value={to} onChangeText={setTo} />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Text variant="bodyMedium">{t("online")}</Text>
                    <Switch value={online} onValueChange={setOnline} />
                </View>

                <Button mode="contained-tonal" icon="calendar-edit" onPress={scheduleLesson}>
                    <Text variant="titleMedium">
                        {t("get-into-schedule")}
                    </Text>
                </Button>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        // justifyContent: "center",
        alignItems: "stretch",
        gap: 20
    }
});

export default ScheduleLessonScreen;