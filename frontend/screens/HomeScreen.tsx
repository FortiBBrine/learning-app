import React, {useEffect} from 'react';
import {StyleSheet} from "react-native";
import {Appbar, Button, Dialog, FAB, Portal, Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {HomeScreenNavigationProp} from "../navigation/Navigator";
import {deleteRelation, getRelations} from "../api/relationApi";
import {useTranslation} from "react-i18next";
import {usePeopleStore} from "../store/peopleStore";
import PersonList from "../component/PersonList";

const HomeScreen = () => {

    const { relations, setRelations } = usePeopleStore();

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [deleteUser, setDeleteUser] = React.useState<string | null>(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        onRefresh().then()
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);

        const data = await getRelations();
        setRelations(data);

        setRefreshing(false);
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
                <Appbar.Action icon={"bell-outline"} onPress={() => navigation.navigate("RequestsScreen")} />
                <Appbar.Action icon={"calendar-month"} onPress={() => navigation.navigate("ScheduledLessonsScreen")} />
                <Appbar.Action icon={"tune"} onPress={async () => {
                    navigation.navigate("Tune")
                }} />
            </Appbar.Header>

            <PersonList
                relations={relations}
                onRefresh={onRefresh}
                removeUser={async user => setDeleteUser(user.username)}
                onPress={async relation => {
                    navigation.navigate(
                        "Profile",
                        {
                            person: relation,
                            addButton: false
                        }
                    )
                }}
                refreshing={refreshing}
            />

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
    magnify: {
        position: "absolute",
        bottom: 20,
        right: 20
    }
})

export default HomeScreen;