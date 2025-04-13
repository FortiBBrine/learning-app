import React from 'react';
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ProfileScreenNavigationProp, ProfileScreenRouteProp} from "../navigation/Navigator";
import {Button, Chip, Text} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {addRelation} from "../api/relationApi";

const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const route = useRoute<ProfileScreenRouteProp>();

    const { t } = useTranslation();

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

                <View style={styles.subjectList}>
                    { route.params.person.subjects.map((value, index) => (
                        <Chip key={index} mode="outlined">
                            {t(value)}
                        </Chip>
                    ))}
                </View>

                <Button mode="outlined" onPress={() => {}}>
                    <Text variant="titleLarge">
                        {t("get-into-schedule")}
                    </Text>
                </Button>

                <Button mode="outlined" onPress={() => {}}>
                    <Text variant="titleLarge">
                        {t("schedule")}
                    </Text>
                </Button>

                <Button mode="outlined" icon="cloud-upload-outline" onPress={() => {}}>
                    <Text variant="titleLarge">
                        {t("upload")}
                    </Text>
                </Button>

                { route.params.addButton ? (
                    <Button mode="outlined" onPress={async () => {
                        await addRelation(route.params.person.username);

                        navigation.navigate("Home");
                    }}>
                        <Text variant="titleLarge">
                            {t("add")}
                        </Text>
                    </Button>
                ) : (
                    <Button mode="outlined" onPress={async () => {
                        navigation.navigate("Chat", {
                            person: route.params.person
                        });
                    }}>
                        <Text variant="titleLarge">
                            {t("chat")}
                        </Text>
                    </Button>
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