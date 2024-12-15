import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ProfileScreenNavigationProp, ProfileScreenRouteProp} from "../navigation/Navigator";
import {Button, Text} from "react-native-paper";
import {StatusBar} from "expo-status-bar";
import {useTranslation} from "react-i18next";
import {addRelation} from "../api/relationApi";

const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const route = useRoute<ProfileScreenRouteProp>();

    const [t, i18n] = useTranslation();

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={{
                fontWeight: "bold",
                textAlign: "center"
            }}>{route.params.person.name}</Text>
            <Image style={{
                width: 200,
                height: 200,
                alignSelf: "center"
            }} source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3024/3024605.png'
            }} />

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

            { route.params.addButton && (
                <Button mode="outlined" onPress={async () => {
                    await addRelation(route.params.person.username);

                    navigation.navigate("Home");
                }}>
                    <Text variant="titleLarge">
                        {t("add")}
                    </Text>
                </Button>
            )}

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: "flex-start",
        alignItems: "stretch",
        rowGap: 20
    }
})

export default ProfileScreen;