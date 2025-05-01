import React, {useEffect} from 'react';
import {Card, Text} from "react-native-paper";
import {Agenda, AgendaEntry} from "react-native-calendars";
import {getLessons} from "../api/scheduledLessonsApi";

const ScheduledLessonScreen = () => {

    const [schedule, setSchedule] = React.useState<{ [key: string]: { name: string }[] }>({});
    // const [calendars, setCalendars] = React.useState<Calendar[]>([]);

    useEffect(() => {
        getLessons()
            .then(res => {
                const newSchedule: { [key: string]: { name: string }[] } = {};

                res.forEach(lesson => {
                    if (lesson.from === undefined) return;
                    if (lesson.name === undefined) return;
                    if (newSchedule[lesson.from.substring(0, 10)] === undefined) {
                        newSchedule[lesson.from.substring(0, 10)] = [{
                            name: lesson.name,
                        }];
                        return;
                    }
                    newSchedule[lesson.from.substring(0, 10)].push({
                        name: lesson.name
                    });
                });

                setSchedule(newSchedule);
            })
    }, [])

    return (
        <Agenda
            items={schedule}
            renderItem={(reservation: AgendaEntry) => {
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
    );
};

export default ScheduledLessonScreen;
