import React, {useEffect} from 'react';
import {Pressable, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useAppSelector} from "../store/store";
import {Appbar, Button, Dialog, IconButton, Portal, Text} from "react-native-paper";
import {useDispatch} from "react-redux";
import {setPeople} from "../store/slice/peopleSlice";
import {useNavigation} from "@react-navigation/native";
import {HomeScreenNavigationProp} from "../navigation/Navigator";
import {deleteRelation, getAllRelations} from "../api/relationApi";
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setToken} from "../store/slice/loginSlice";

const HomeScreen = () => {

    const people = useAppSelector(state => state.people.relations);
    const dispatch = useDispatch();

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [refreshing, setRefreshing] = React.useState(false);
    const [deleteUser, setDeleteUser] = React.useState<string | null>(null);

    const [t, i18n] = useTranslation();

    useEffect(() => {
        onRefresh().then()
    }, []);

    const onRefresh = async () => {
        setRefreshing(true)

        const data = await getAllRelations()
        dispatch(setPeople(data))

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
                <Appbar.Action icon={"plus"} onPress={() => {
                    navigation.navigate("AddRelationScreen")
                }} />
                <Appbar.Action icon={"calendar-month"} onPress={() => navigation.navigate("Calendar")} />
                <Appbar.Action icon={"logout"} onPress={async () => {
                    await AsyncStorage.removeItem("token")
                    dispatch(setToken(null))
                }} />
            </Appbar.Header>
            <ScrollView
                style={{
                    flex: 1,
                    margin: 15
                }}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
            >

                { people.map((item, index) => (
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
                            <Text variant="titleLarge">
                                {item.name}
                            </Text>

                            <IconButton
                                icon="trash-can"
                                size={25}
                                onPress={() => setDeleteUser(item.username)}
                            />

                        </View>
                    </Pressable>
                ))}
                <StatusBar style="auto" />
            </ScrollView>

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
        borderColor: "teal",
        borderStyle: "solid",
        borderWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    }
})

export default HomeScreen;