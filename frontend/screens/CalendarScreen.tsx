import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {useAppSelector} from "../store/store";
import {getAllCalendars} from "../api/calendarApi";

const CalendarScreen = () => {

    const token = useAppSelector(state => state.login.token)

    useEffect(() => {
        if (token == null) return;

        getAllCalendars(token)
            .then(res => {
                res.calendars.forEach(calendar => {
                    const from = new Date(calendar.from)
                    const to = new Date(calendar.to)

                    console.log(from)
                    console.log(to)

                })
            })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    padding: 30,
                    borderRadius: 10,
                    borderColor: "teal",
                    borderWidth: 3,
                    alignItems: "center"
                }}>
                    <Text variant="titleMedium">123</Text>
                </View>
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