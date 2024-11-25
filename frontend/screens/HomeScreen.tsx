import React from 'react';
import {Pressable, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useAppSelector} from "../store/store";
import {Appbar, Button, Dialog, IconButton, Portal, Text} from "react-native-paper";
import {useDispatch} from "react-redux";
import {setPeople} from "../store/slice/peopleSlice";
import {useNavigation} from "@react-navigation/native";
import {HomeScreenNavigationProp} from "../navigation/Navigator";
import {deleteRelation, getAllRelations} from "../api/relationApi";
import AddUserDialog from "../component/AddUserDialog";

const HomeScreen = () => {

    const people = useAppSelector(state => state.people.people);
    const token = useAppSelector(state => state.login.token);
    const dispatch = useDispatch();

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [refreshing, setRefreshing] = React.useState(false);
    const [deleteUser, setDeleteUser] = React.useState<string | null>(null);
    const [addUserDialogShown, setAddUserDialogShown] = React.useState(false);

    const onRefresh = async () => {
        if (token == null) return
        setRefreshing(true)

        try {
            const data = await getAllRelations(token)
            dispatch(setPeople(data))
        } catch (err) {
            console.log(err);
        }

        setRefreshing(false)
    }

    const onDeleteUser = async () => {
        if (deleteUser == null) return
        if (token == null) return

        try {
            await deleteRelation(deleteUser, token)
        } catch (err) {
            console.log(err);
        }

        setDeleteUser(null)
        await onRefresh()
    }


    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Вчителі / учні" />
                <Appbar.Action icon={"plus"} onPress={() => setAddUserDialogShown(true)} />
            </Appbar.Header>
            <ScrollView
                style={{
                    flex: 1,
                    margin: 30
                }}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
            >

                { people.map((item, index) => (
                    <Pressable key={index} onPress={() => {
                        navigation.navigate(
                            "Profile",
                            {
                                person: item
                            }
                        )
                    }}>
                        <View style={styles.listItem}>
                            <Text variant="titleMedium">
                                {item.name}
                            </Text>

                            <IconButton
                                icon="trash-can"
                                size={20}
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
                    <Dialog.Title>Видалити</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Видалити користувача {deleteUser}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onDeleteUser}>Так</Button>
                        <Button onPress={() => setDeleteUser(null)}>Ні</Button>
                    </Dialog.Actions>
                </Dialog>
                <AddUserDialog
                    shown={addUserDialogShown}
                    onDismiss={() => setAddUserDialogShown(false)}
                    refresh={onRefresh}
                />

            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
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