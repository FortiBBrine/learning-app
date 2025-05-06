import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {
    ChatScreenNavigationProp,
    ChatScreenRouteProp
} from "../navigation/Navigator";
import {useTranslation} from "react-i18next";
import {Appbar, IconButton, Text, TextInput} from "react-native-paper";
import {ChatMessageDto, getMessages} from "../api/messagesApi";
import SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {useAuthStore} from "../store/authStore";

const ChatScreen = () => {

    const navigation = useNavigation<ChatScreenNavigationProp>();

    const route = useRoute<ChatScreenRouteProp>();
    const [messages, setMessages] = useState<ChatMessageDto[]>([]);
    const [message, setMessage] = useState<string>("");
    const { t } = useTranslation();
    const [stompClient, setStompClient] = useState<CompatClient | null>(null);
    const { accessToken } = useAuthStore();

    useEffect(() => {
        getMessages(route.params.person.username)
            .then(setMessages)
    }, [])


    useEffect(() => {
        const initializeWebSocket = () => {
            const socket = new SockJS('https://learning-app-1ll5.onrender.com/ws-chat');
            const client = Stomp.over(socket);

            client.connect(
                { Authorization: `Bearer ${accessToken}` },
                () => {
                    client.subscribe('/user/queue/private', (message) => {
                        const newMessage: ChatMessageDto = JSON.parse(message.body);
                        setMessages(prev => [...prev, newMessage]);
                    });
                },
                (error: any) => console.error('WebSocket Error:', error)
            );

            setStompClient(client);
            return () => client.disconnect();
        };

        if (accessToken) initializeWebSocket();
    }, [accessToken]);

    const writeMessage = async () => {
        if (!message.trim() || !stompClient) return;

        const messageDto: ChatMessageDto = {
            content: message,
            sender: "",
            receiver: route.params.person.username,
            timestamp: new Date().toISOString()
        };

        stompClient.send(
            '/app/send-private',
            {},
            JSON.stringify(messageDto)
        );

        setMessage('');
        setMessages(prev => [...prev, messageDto]);
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={route.params.person.name} />
            </Appbar.Header>

            <View style={styles.container}>
                <ScrollView style={{
                    flex: 1,
                    padding: 10
                }}>
                    <View style={{
                        gap: 10
                    }}>
                        { messages.map((message, index) => (
                            <View style={[styles.message, {
                                alignSelf: (route.params.person.username === message.sender) ? "flex-start" : "flex-end"
                            }]} key={index}>
                                <Text style={{color: "white"}}>{message.content}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.input}>
                    <TextInput
                        placeholder={t("chat-message")}
                        onSubmitEditing={writeMessage}
                        onChangeText={setMessage}
                        mode="outlined"
                        value={message}
                        style={{flex: 1}}
                    />
                    <IconButton icon={"attachment"} />
                    <IconButton icon={"send"} />
                </View>
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        alignItems: "stretch"
    },
    message: {
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#24A1DE"
    },
    username: {
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        margin: 5,
        flexDirection: "row"
    }
})

export default ChatScreen;