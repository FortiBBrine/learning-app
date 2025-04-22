import React, {FC, useState} from 'react';
import {Pressable, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {RelationDto} from "../api/relationApi";
import {Avatar, IconButton, Text} from "react-native-paper";
import {StatusBar} from "expo-status-bar";

type PersonListProps = {
    removeUser?: (relation: RelationDto) => Promise<void>;
    addButton?: boolean;
    onRefresh?: () => Promise<void>;
    relations: RelationDto[];
    onPress?: (relation: RelationDto) => Promise<void>,
    refreshing?: boolean;
}

const PersonList: FC<PersonListProps> = (props: PersonListProps) => {

    return (
        <ScrollView
            style={styles.list}
            refreshControl={<RefreshControl onRefresh={props.onRefresh} refreshing={props.refreshing} />}
        >

            { props.relations.map((item, index) => (
                <Pressable key={index} onPress={async () => {
                    if (props.onPress) {
                        await props.onPress(item);
                    }
                }}>
                    <View style={styles.listItem}>

                        <View style={{
                            flexDirection: "row",
                            gap: 20,
                            alignItems: "center"
                        }}>
                            <Avatar.Icon icon={"account"} size={36} />

                            <Text variant="titleLarge">
                                {item.name}
                            </Text>
                        </View>

                        { props.removeUser ? (
                            <IconButton
                                icon="trash-can-outline"
                                size={25}
                                onPress={async () => {
                                    if (props.removeUser) {
                                        await props.removeUser(item);
                                    }
                                }}
                            />
                        ) : (
                            <Text variant={"titleLarge"}>{item.rating}</Text>
                        )}

                    </View>
                </Pressable>
            ))}
            <StatusBar style="auto" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 15
    },
    listItem: {
        padding: 5,
        borderRadius: 10,
        // borderColor: "teal",
        // borderStyle: "solid",
        // borderWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    }
});

export default PersonList;