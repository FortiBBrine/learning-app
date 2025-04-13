import React, {useEffect} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {getNotMyRelations} from "../api/relationApi";
import {useNavigation} from "@react-navigation/native";
import {AddRelationScreenNavigationProp} from "../navigation/Navigator";
import {usePeopleStore} from "../store/peopleStore";

const AddRelationScreen = () => {

    const { setAllPeople, allPeople } = usePeopleStore();

    useEffect(() => {
        getNotMyRelations()
            .then(setAllPeople)
    }, []);

    const navigation = useNavigation<AddRelationScreenNavigationProp>()

    return (
        <View style={styles.list}>
            <ScrollView>
                { allPeople.map((relation, index) => (
                    <View key={index} style={styles.listItem}>
                        <Pressable onPress={() => {
                            navigation.navigate(
                                "Profile",
                                {
                                    person: relation,
                                    addButton: true
                                }
                            )
                        }}>
                            <Text variant="titleLarge">{relation.name}</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 15,
        flexDirection: "column",
    },
    listItem: {
        padding: 15,
        borderRadius: 10,
        borderColor: "teal",
        borderStyle: "solid",
        borderWidth: 2,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    }
})

export default AddRelationScreen;