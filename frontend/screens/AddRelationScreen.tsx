import React, {useEffect} from 'react';
import {StyleSheet} from "react-native";
import {getSuggestions} from "../api/relationApi";
import {useNavigation} from "@react-navigation/native";
import {AddRelationScreenNavigationProp} from "../navigation/Navigator";
import {usePeopleStore} from "../store/peopleStore";
import PersonList from "../component/PersonList";

const AddRelationScreen = () => {

    const { setAllPeople, allPeople } = usePeopleStore();

    useEffect(() => {
        getSuggestions()
            .then(setAllPeople)
    }, []);

    const navigation = useNavigation<AddRelationScreenNavigationProp>()

    return (
        <PersonList
            relations={allPeople}
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