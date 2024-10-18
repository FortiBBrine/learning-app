import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ProfileScreenNavigationProp, ProfileScreenRouteProp} from "../App";
import {Button, Text} from "react-native-paper";

const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>()
    const route = useRoute<ProfileScreenRouteProp>()

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

            <Button mode="outlined">
                <Text variant="titleLarge">
                    Записатись на зайняття
                </Text>
            </Button>

            <Button mode="outlined">
                <Text variant="titleLarge">
                    Розклад
                </Text>
            </Button>
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