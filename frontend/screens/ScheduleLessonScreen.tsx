import React from 'react';
import {StyleSheet, View} from "react-native";
import {Appbar, Button, Portal, Switch, Text, TextInput} from "react-native-paper";
import {useNavigation, useRoute} from "@react-navigation/native";
import {
    ScheduleLessonScreenNavigationProp, ScheduleLessonScreenRouteProp
} from "../navigation/Navigator";
import {useTranslation} from "react-i18next";
import {sendScheduleRequest} from "../api/scheduledLessonsApi";
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';

const ScheduleLessonScreen = () => {
    const navigation = useNavigation<ScheduleLessonScreenNavigationProp>();
    const route = useRoute<ScheduleLessonScreenRouteProp>();
    const { t, i18n } = useTranslation();

    // Date and time states
    const initialDate = new Date();
    const initialHours = initialDate.getHours();
    const initialMinutes = initialDate.getMinutes();
    const initialEndMinutes = initialMinutes + 30;

    const [date, setDate] = React.useState(initialDate);
    const [startTime, setStartTime] = React.useState({
        hours: initialHours,
        minutes: initialMinutes
    });
    const [endTime, setEndTime] = React.useState({
        hours: initialHours + Math.floor(initialEndMinutes / 60),
        minutes: initialEndMinutes % 60
    });

    // Picker visibility states
    const [datePickerVisible, setDatePickerVisible] = React.useState(false);
    const [startTimePickerVisible, setStartTimePickerVisible] = React.useState(false);
    const [endTimePickerVisible, setEndTimePickerVisible] = React.useState(false);

    // Form states
    const [title, setTitle] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [from, setFrom] = React.useState("");
    const [to, setTo] = React.useState("");
    const [online, setOnline] = React.useState(false);

    // Update ISO strings when date or times change
    React.useEffect(() => {
        const combineDateTime = (baseDate: Date, time: { hours: number, minutes: number }) => {
            const newDate = new Date(baseDate);
            newDate.setHours(time.hours);
            newDate.setMinutes(time.minutes);
            return newDate.toISOString();
        };

        setFrom(combineDateTime(date, startTime));
        setTo(combineDateTime(date, endTime));
    }, [date, startTime, endTime]);

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
                <TextInput
                    label={t("title-lesson")}
                    value={title}
                    onChangeText={setTitle}
                />

                <TextInput
                    label={t("subject")}
                    value={subject}
                    onChangeText={setSubject}
                />

                {/* Date Picker */}
                <Button
                    mode="contained-tonal"
                    onPress={() => setDatePickerVisible(true)}
                >
                    <Text variant={"titleMedium"}>
                        {date.toLocaleDateString()}
                    </Text>
                </Button>

                {/* Start Time Picker */}
                <Button
                    mode="contained-tonal"
                    onPress={() => setStartTimePickerVisible(true)}
                >
                    <Text variant={"titleMedium"}>
                        {`${startTime.hours}:${String(startTime.minutes).padStart(2, '0')}`}
                    </Text>
                </Button>

                {/* End Time Picker */}
                <Button
                    mode="contained-tonal"
                    onPress={() => setEndTimePickerVisible(true)}
                >
                    <Text variant={"titleMedium"}>
                        {`${endTime.hours}:${String(endTime.minutes).padStart(2, '0')}`}
                    </Text>
                </Button>

                <View style={styles.switchContainer}>
                    <Text variant="bodyMedium">{t("online")}</Text>
                    <Switch value={online} onValueChange={setOnline} />
                </View>

                <Button
                    mode="contained-tonal"
                    icon="calendar-edit"
                    onPress={scheduleLesson}
                >
                    <Text variant="titleMedium">
                        {t("get-into-schedule")}
                    </Text>
                </Button>

            </View>

            <Portal>

                {/* Date Picker Modal */}
                <DatePickerModal
                    locale={i18n.language}
                    mode="single"
                    visible={datePickerVisible}
                    onDismiss={() => setDatePickerVisible(false)}
                    date={date}
                    onConfirm={({ date: selectedDate }) => {
                        setDatePickerVisible(false);
                        if (selectedDate) setDate(selectedDate);
                    }}
                />

                {/* Start Time Picker Modal */}
                <TimePickerModal
                    locale={i18n.language}
                    visible={startTimePickerVisible}
                    onDismiss={() => setStartTimePickerVisible(false)}
                    onConfirm={({ hours, minutes }) => {
                        setStartTimePickerVisible(false);
                        setStartTime({ hours, minutes });
                    }}
                    hours={startTime.hours}
                    minutes={startTime.minutes}
                />

                {/* End Time Picker Modal */}
                <TimePickerModal
                    locale={i18n.language}
                    visible={endTimePickerVisible}
                    onDismiss={() => setEndTimePickerVisible(false)}
                    onConfirm={({ hours, minutes }) => {
                        setEndTimePickerVisible(false);
                        setEndTime({ hours, minutes });
                    }}
                    hours={endTime.hours}
                    minutes={endTime.minutes}
                />
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        alignItems: "stretch",
        gap: 20
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
});

export default ScheduleLessonScreen;