import React from 'react';
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ProfileScreenNavigationProp, ProfileScreenRouteProp} from "../navigation/Navigator";
import {Button, Chip, Text} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {addRelation, rating} from "../api/relationApi";
import {AirbnbRating} from "react-native-ratings";

const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const route = useRoute<ProfileScreenRouteProp>();

    const { t } = useTranslation();

    const finishRating = async (chosenRating: number) => {
        await rating(route.params.person.username, chosenRating);

        navigation.navigate("Home");
    };

    const newRelation = async () => {
        await addRelation(route.params.person.username);

        navigation.navigate("Home");
    };

    const goToChat = async () => {
        navigation.navigate("Chat", {
            person: route.params.person
        });
    };

    const goToScheduleLesson = async () => {
        navigation.navigate("ScheduleLesson", {
            person: route.params.person
        });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text variant="titleLarge" style={{
                    fontWeight: "bold",
                    textAlign: "center"
                }}>{route.params.person.name}</Text>
                <Image style={styles.image} source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/3024/3024605.png'
                }} />

                <Text variant="titleMedium" style={{
                    textAlign: "center"
                }}>{t("rating")}: {route.params.person.rating}</Text>

                { route.params.person.subjects.length > 0 && <View style={styles.subjectList}>
                        { route.params.person.subjects.map((value, index) => (
                            <Chip key={index} mode="outlined">
                                {t(value)}
                            </Chip>
                        ))}
                    </View>
                }

                <AirbnbRating
                    count={5}
                    size={15}
                    defaultRating={0}
                    showRating={false}
                    onFinishRating={finishRating}
                />

                { route.params.addButton ? (
                    <>
                        <Button
                            mode="contained-tonal"
                            icon="account-plus"
                            onPress={newRelation}>
                            <Text variant="titleMedium">
                                {t("add")}
                            </Text>
                        </Button>
                    </>
                ) : (
                    <>

                        <Button mode="contained-tonal" icon="calendar-edit" onPress={goToScheduleLesson}>
                            <Text variant="titleMedium">
                                {t("get-into-schedule")}
                            </Text>
                        </Button>

                        <Button mode="contained-tonal" icon="calendar-clock" onPress={() => {}}>
                            <Text variant="titleMedium">
                                {t("schedule")}
                            </Text>
                        </Button>

                        <Button mode="contained-tonal" icon="cloud-upload-outline" onPress={() => {}}>
                            <Text variant="titleMedium">
                                {t("upload")}
                            </Text>
                        </Button>
                        <Button mode="contained-tonal"icon="message-text-outline" onPress={goToChat}>
                            <Text variant="titleMedium">
                                {t("chat")}
                            </Text>
                        </Button>
                    </>
                )}

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: "flex-start",
        alignItems: "stretch",
        rowGap: 20
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    subjectList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        justifyContent: "center"
    }
})

export default ProfileScreen;