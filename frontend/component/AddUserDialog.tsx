import React from 'react';
import {Button, Dialog, Text, TextInput} from "react-native-paper";
import {addRelation} from "../api/relationApi";
import {useAppSelector} from "../store/store";

type AddUserDialogProps = {
    shown: boolean,
    onDismiss: () => void,
    refresh: () => Promise<void>
}

const AddUserDialog: React.FC<AddUserDialogProps> = (props) => {

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
            <Dialog.Title>Створити</Dialog.Title>
            <Dialog.Content>
                <Text>Увага! Це тимчасове меню!</Text>
                <TextInput
                    placeholder="Користувач"
                    onChangeText={text => setUsername(text)}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={addUser}>Створити</Button>
            </Dialog.Actions>
        </Dialog>

    );
};

export default AddUserDialog;