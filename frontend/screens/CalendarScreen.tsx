import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {useAppSelector} from "../store/store";
import {Calendar, getAllCalendars} from "../api/calendarApi";

const CalendarScreen = () => {

    const token = useAppSelector(state => state.login.token)
    const [calendars, setCalendars] = React.useState<Calendar[]>([]);

    useEffect(() => {
        if (token == null) return;

        getAllCalendars(token)
            .then(res => {
                setCalendars(res.calendars)
            })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={{
                flex: 1
            }}>
                { calendars.map((calendar, index) => (
                    <View key={index} style={{
                        flex: 1,
                        padding: 30,
                        borderRadius: 10,
                        borderColor: "teal",
                        borderWidth: 3,
                        alignItems: "center"
                    }}>
                        <Text variant="titleLarge">{calendar.name}</Text>
                        <Text variant="titleLarge">{new Date(calendar.from).toDateString()}</Text>
                        <Text variant="titleSmall">
                            {calendar.from}
                        </Text>
                        <Text variant="titleSmall">
                            {calendar.to}
                        </Text>
                    </View>
                ))}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: "center",
        alignItems: "stretch",
        gap: 20
    }
})

export default CalendarScreen;