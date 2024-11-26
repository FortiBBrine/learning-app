import React from 'react';
import {Button, Dialog, Text, TextInput} from "react-native-paper";
import {addRelation} from "../api/relationApi";
import {useAppSelector} from "../store/store";
import {useTranslation} from "react-i18next";

type AddUserDialogProps = {
    shown: boolean,
    onDismiss: () => void,
    refresh: () => Promise<void>
}

const AddUserDialog: React.FC<AddUserDialogProps> = (props) => {

    const [t, i18n] = useTranslation();
    const [username, setUsername] = React.useState("")
    const token = useAppSelector(state => state.login.token);

    const addUser = async () => {
        if (token == null) return

        try {
            await addRelation(username, token)
        } catch (err) {
            console.log(err);
        }

        setUsername("")
        props.onDismiss()
        await props.refresh()
    }

    return (

        <Dialog
            visible={props.shown}
            onDismiss={props.onDismiss}
        >
            <Dialog.Title>{t("create-relation-dialog-title")}</Dialog.Title>
            <Dialog.Content>
                <Text>{t("create-relation-dialog-content")}</Text>
                <TextInput
                    placeholder={t("create-relation-dialog-input")}
                    onChangeText={text => setUsername(text)}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={addUser}>{t("create-relation-dialog-button")}</Button>
            </Dialog.Actions>
        </Dialog>

    );
};

export default AddUserDialog;