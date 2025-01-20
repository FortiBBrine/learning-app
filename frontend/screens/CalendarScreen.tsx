import React, {useEffect} from 'react';
import {Avatar, Card, Text} from "react-native-paper";
import {Calendar, getAllCalendars} from "../api/calendarApi";
import {Agenda, AgendaEntry, AgendaSchedule} from "react-native-calendars";

const CalendarScreen = () => {

    const [schedule, setSchedule] = React.useState<{ [key: string]: { name: string }[] }>({});
    // const [calendars, setCalendars] = React.useState<Calendar[]>([]);

    useEffect(() => {
        getAllCalendars()
            .then(res => {
                const newSchedule: { [key: string]: { name: string }[] } = {};

                res.calendars.forEach(calendar => {
                    if (calendar.from === undefined) return;
                    if (calendar.name === undefined) return;
                    if (newSchedule[calendar.from.substring(0, 10)] === undefined) {
                        newSchedule[calendar.from.substring(0, 10)] = [{
                            name: calendar.name,
                        }];
                        return;
                    }
                    newSchedule[calendar.from.substring(0, 10)].push({
                        name: calendar.name
                    });
                });

                setSchedule(newSchedule);
            })
    }, [])

    return (
        <Agenda
            items={schedule}
            renderItem={(reservation: AgendaEntry, isFirst: boolean) => {
                return (
                    <Card mode="contained" style={{
                        margin: 10
                    }}>
                        <Card.Title title="Заняття" />
                        <Card.Content>
                            <Text>{reservation.name}</Text>
                        </Card.Content>
                    </Card>
                )
            }}
        />
        // <ScrollView style={{
        //     flex: 1,
        //     margin: 20,
        //     display: "flex",
        //     flexDirection: "column"
        // }}>
        //     { calendars.map((calendar, index) => (
        //         <View key={index}>
        //             { calendar.from != undefined && calendar.to != undefined &&
        //                 <View style={{
        //                     flex: 1,
        //                     padding: 15,
        //                     borderRadius: 15,
        //                     borderColor: "teal",
        //                     borderWidth: 2,
        //                     alignItems: "center",
        //                     marginTop: 15
        //                 }}>
        //                     <Text variant="titleLarge">{calendar.name}</Text>
        //                     <Text variant="titleMedium">{new Date(calendar.from).toDateString()}</Text>
        //                     <Text variant="titleSmall">
        //                         {new Date(calendar.from).getHours().toString().padStart(2, "0")}:
        //                         {new Date(calendar.from).getMinutes().toString().padStart(2, "0")}
        //                     </Text>
        //                     <Text variant="titleSmall">
        //                         {new Date(calendar.to).getHours().toString().padStart(2, "0")}:
        //                         {new Date(calendar.to).getMinutes().toString().padStart(2, "0")}
        //                     </Text>
        //                 </View>
        //             }
        //         </View>
        //
        //     ))}
        //
        // </ScrollView>
    );
};

export default CalendarScreen;