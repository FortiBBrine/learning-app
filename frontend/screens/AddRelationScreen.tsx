import React, {useEffect} from 'react';
import {StyleSheet} from "react-native";
import {getSuggestions} from "../api/relationApi";
import {useNavigation} from "@react-navigation/native";
import {AddRelationScreenNavigationProp} from "../navigation/Navigator";
import {usePeopleStore} from "../store/peopleStore";
import PersonList from "../component/PersonList";

const AddRelationScreen = () => {

    const { suggestions, setSuggestions } = usePeopleStore();

    useEffect(() => {
        getSuggestions()
            .then(setSuggestions)
    }, []);

    const navigation = useNavigation<AddRelationScreenNavigationProp>()

    return (
        <PersonList
            relations={suggestions}
            onPress={async relation => {
                navigation.navigate(
                    "Profile",
                    {
                        person: relation,
                        addButton: true
                    }
                )
            }}
        />
    );
};

const styles = StyleSheet.create({

})

export default AddRelationScreen;