import React, {useEffect} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {useAppSelector} from "../store/store";
import {useDispatch} from "react-redux";
import {getNotMyRelations} from "../api/relationApi";
import {setAllPeople} from "../store/slice/peopleSlice";
import {useNavigation} from "@react-navigation/native";
import {AddRelationScreenNavigationProp} from "../navigation/Navigator";

const AddRelationScreen = () => {

    useEffect(() => {
        if (token == null) return
        getNotMyRelations(token)
            .then(res => {
                dispatch(setAllPeople(res));
            })
    }, []);

    const navigation = useNavigation<AddRelationScreenNavigationProp>()
    const token = useAppSelector(state => state.login.token)
    const dispatch = useDispatch();
    const allPeople = useAppSelector(state => state.people.allPeople)

    return (
        <ScrollView contentContainerStyle={styles.list}>
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