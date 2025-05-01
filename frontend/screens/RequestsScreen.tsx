import React, {useEffect, useState} from 'react';
import {Appbar, IconButton, List} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import {RequestsScreenNavigationProp} from "../navigation/Navigator";
import {answerScheduleRequest, getScheduleRequests, ScheduleRequestResponseDto} from "../api/scheduledLessonsApi";
import {View} from "react-native";

const RequestsScreen = () => {

    const { t } = useTranslation();
    const navigation = useNavigation<RequestsScreenNavigationProp>();

    const [scheduleRequests, setScheduleRequests] = useState<ScheduleRequestResponseDto[]>([]);

    const load = async () => {
        getScheduleRequests().then(data => {
            setScheduleRequests(data);
        });
    };

    useEffect(() => {
        load().then();
    }, [])

    const handleApprove = async (requestId: number) => {
        await answerScheduleRequest(requestId, true);
        await load();
    };

    const handleReject = async (requestId: number) => {
        await answerScheduleRequest(requestId, false);
        await load();
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={t("requests")} />
            </Appbar.Header>

            { scheduleRequests.map((scheduleRequest: ScheduleRequestResponseDto, index: number) => (
                <List.Item
                    key={index}
                    title={scheduleRequest.source.name}
                    description={scheduleRequest.title}
                    onPress={() => {}}
                    left={props => <List.Icon {...props} icon="calendar-clock-outline" />}
                    right={props =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconButton
                                icon="check"
                                iconColor="green"
                                size={20}
                                onPress={() => handleApprove(scheduleRequest.id)}
                            />
                            <IconButton
                                icon="close"
                                iconColor="red"
                                size={20}
                                onPress={() => handleReject(scheduleRequest.id)}
                            />
                        </View>
                    }
                />
            ))}
        </>
    );
};

export default RequestsScreen;