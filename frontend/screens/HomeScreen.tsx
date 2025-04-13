import React, {useEffect} from 'react';
import {Pressable, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Appbar, Avatar, Button, Dialog, FAB, IconButton, Portal, Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {HomeScreenNavigationProp} from "../navigation/Navigator";
import {deleteRelation, getAllRelations} from "../api/relationApi";
import {useTranslation} from "react-i18next";
import {usePeopleStore} from "../store/peopleStore";

const HomeScreen = () => {

    const { relations, setPeople } = usePeopleStore();

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [refreshing, setRefreshing] = React.useState(false);
    const [deleteUser, setDeleteUser] = React.useState<string | null>(null);

    const { t } = useTranslation();

    useEffect(() => {
        onRefresh().then()
    }, []);

    const onRefresh = async () => {
        setRefreshing(true)

        const data = await getAllRelations()
        setPeople(data);

        setRefreshing(false)
    }

    const onDeleteUser = async () => {
        if (deleteUser == null) return

        await deleteRelation(deleteUser)

        setDeleteUser(null)
        await onRefresh()
    }


    return (
        <>
            <Appbar.Header>
                <Appbar.Content title={t("main-page-title")} />
                <Appbar.Action icon={"calendar-month"} onPress={() => navigation.navigate("Calendar")} />
                <Appbar.Action icon={"tune"} onPress={async () => {
                    navigation.navigate("Tune")
                }} />
            </Appbar.Header>
            <ScrollView
                style={{
                    flex: 1,
                    margin: 15
                }}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
            >

                { relations.map((item, index) => (
                    <Pressable key={index} onPress={() => {
                        navigation.navigate(
                            "Profile",
                            {
                                person: item,
                                addButton: false
                            }
                        )
                    }}>
                        <View style={styles.listItem}>

                            <View style={{
                                flexDirection: "row",
                                gap: 20,
                                alignItems: "center"
                            }}>
                                <Avatar.Icon icon={"account"} size={36} />

                                <Text variant="titleLarge">
                                    {item.name}
                                </Text>
                            </View>

                            <IconButton
                                icon="trash-can-outline"
                                size={25}
                                onPress={() => setDeleteUser(item.username)}
                            />

                        </View>
                    </Pressable>
                ))}
                <StatusBar style="auto" />
            </ScrollView>

            <FAB
                icon="magnify"
                style={styles.magnify}
                onPress={() => navigation.navigate("AddRelationScreen")}
            />

            <Portal>
                <Dialog
                    visible={deleteUser != undefined}
                    onDismiss={() => setDeleteUser(null)}
                >
                    <Dialog.Title>{t("delete-dialog-title")}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            {t("delete-dialog-content")}{deleteUser}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onDeleteUser}>{t("yes-button")}</Button>
                        <Button onPress={() => setDeleteUser(null)}>{t("no-button")}</Button>
                    </Dialog.Actions>
                </Dialog>

            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 5,
        borderRadius: 10,
        // borderColor: "teal",
        // borderStyle: "solid",
        // borderWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    magnify: {
        position: "absolute",
        bottom: 20,
        right: 20
    }
})

export default HomeScreen;