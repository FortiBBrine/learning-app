import React, {useEffect} from 'react';
import {ScrollView, View} from "react-native";
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
        <ScrollView style={{
            flex: 1,
            margin: 20,
            display: "flex",
            flexDirection: "column"
        }}>
            { calendars.map((calendar, index) => (
                <View key={index}>
                    { calendar.from != undefined && calendar.to != undefined &&
                        <View style={{
                            flex: 1,
                            padding: 15,
                            borderRadius: 15,
                            borderColor: "teal",
                            borderWidth: 2,
                            alignItems: "center",
                            marginTop: 15
                        }}>
                            <Text variant="titleLarge">{calendar.name}</Text>
                            <Text variant="titleMedium">{new Date(calendar.from).toDateString()}</Text>
                            <Text variant="titleSmall">
                                {new Date(calendar.from).getHours().toString().padStart(2, "0")}:
                                {new Date(calendar.from).getMinutes().toString().padStart(2, "0")}
                            </Text>
                            <Text variant="titleSmall">
                                {new Date(calendar.to).getHours().toString().padStart(2, "0")}:
                                {new Date(calendar.to).getMinutes().toString().padStart(2, "0")}
                            </Text>
                        </View>
                    }
                </View>

            ))}

        </ScrollView>
    );
};

export default CalendarScreen;