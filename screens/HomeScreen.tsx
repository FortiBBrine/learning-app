import React, {useEffect} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useAppSelector} from "../store/store";
import {Text} from "react-native-paper";
import {useDispatch} from "react-redux";
import {setPeople} from "../store/slice/peopleSlice";
import {useNavigation} from "@react-navigation/native";
import {HomeScreenNavigationProp} from "../App";

const HomeScreen = () => {

    const people = useAppSelector(state => state.people.people);
    const dispatch = useDispatch();

    const navigation = useNavigation<HomeScreenNavigationProp>();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => dispatch(setPeople(data)))
            .catch(err => console.log(err));
    }, []);

    return (
        <ScrollView
            style={{
                flex: 1,
                margin: 30
            }}
        >

            { people.map((item, index) => (
                <Pressable onPress={() => {
                    navigation.navigate(
                        "Profile",
                        {
                            person: item
                        }
                    )
                }}>
                    <View style={styles.listItem}>
                        <Text variant="titleLarge">
                            {item.name}
                        </Text>

                    </View>
                </Pressable>
            ))}
            <StatusBar style="auto" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        borderRadius: 10,
        borderColor: "teal",
        borderStyle: "solid",
        borderWidth: 1,
        alignItems: "center",
        marginTop: 10
    }
})

export default HomeScreen;