import React from 'react';
import {Pressable, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useAppSelector} from "../store/store";
import {Text} from "react-native-paper";
import {useDispatch} from "react-redux";
import {setPeople} from "../store/slice/peopleSlice";
import {useNavigation} from "@react-navigation/native";
import {HomeScreenNavigationProp} from "../navigation/Navigator";

const HomeScreen = () => {

    const people = useAppSelector(state => state.people.people);
    const dispatch = useDispatch();

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                dispatch(setPeople(data))
                setRefreshing(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                margin: 30
            }}
            refreshControl={<RefreshControl onRefresh={() => onRefresh()} refreshing={refreshing} />}
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