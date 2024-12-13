import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {useAppSelector} from "../store/store";

const AddRelationScreen = () => {

    useEffect(() => {

    }, []);

    const allPeople = useAppSelector(state => state.people.allPeople)

    return (
        <ScrollView contentContainerStyle={styles.list}>
            { allPeople.map((relation, index) => (
                <View key={index} style={styles.listItem}>
                    <Text variant="titleLarge">{relation.name}</Text>
                </View>
            ))}
        </ScrollView>
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