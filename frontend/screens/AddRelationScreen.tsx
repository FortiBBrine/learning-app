import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {getSuggestions} from "../api/relationApi";
import {useNavigation} from "@react-navigation/native";
import {AddRelationScreenNavigationProp} from "../navigation/Navigator";
import {usePeopleStore} from "../store/peopleStore";
import PersonList from "../component/PersonList";
import {Searchbar} from "react-native-paper";
import {useTranslation} from "react-i18next";

const AddRelationScreen = () => {

    const { suggestions, setSuggestions } = usePeopleStore();
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        getSuggestions()
            .then(setSuggestions)
    }, []);

    const navigation = useNavigation<AddRelationScreenNavigationProp>()

    return (
        <View style={{gap: 10}}>
            <Searchbar
                placeholder={t("search")}
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={{margin: 10}}
            />

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
        </View>

    );
};

const styles = StyleSheet.create({

})

export default AddRelationScreen;