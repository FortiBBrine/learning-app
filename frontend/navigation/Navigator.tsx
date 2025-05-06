import React, {useEffect} from 'react';
import {NavigationContainer, RouteProp} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import {UserDto} from "../api/relationApi";
import {useTranslation} from "react-i18next";
import ScheduledLessonScreen from "../screens/ScheduledLessonScreen";
import AddRelationScreen from "../screens/AddRelationScreen";
import TuneScreen from "../screens/TuneScreen";
import ChangeLanguageScreen from "../screens/ChangeLanguageScreen";
import ChatScreen from "../screens/ChatScreen";
import {useAuthStore} from "../store/authStore";
import RequestsScreen from "../screens/RequestsScreen";
import ScheduleLessonScreen from "../screens/ScheduleLessonScreen";
import {getProfile} from "../api/profileApi";
import {usePeopleStore} from "../store/peopleStore";
import ChangeSubjectsScreen from "../screens/ChangeSubjectsScreen";
import SecurityScreen from "../screens/SecurityScreen";

export type RootStackParamList = {
    Home: undefined;
    Profile: { person: UserDto, addButton: boolean };
    Login: undefined;
    Register: undefined;
    ScheduledLessonsScreen: undefined;
    AddRelationScreen: undefined;
    Tune: undefined;
    ChangeLanguage: undefined;
    Chat: { person: UserDto };
    RequestsScreen: undefined;
    ScheduleLesson: { person: UserDto };
    ChangeSubjects: undefined;
    Security: undefined;
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">
export type AddRelationScreenNavigationProp = StackNavigationProp<RootStackParamList, "AddRelationScreen">
export type TuneScreenNavigationProp = StackNavigationProp<RootStackParamList, "Tune">
export type RequestsScreenNavigationProp = StackNavigationProp<RootStackParamList, "RequestsScreen">
export type ScheduleLessonScreenNavigationProp = StackNavigationProp<RootStackParamList, "ScheduleLesson">
export type ChangeSubjectsScreenNavigationProp = StackNavigationProp<RootStackParamList, "ChangeSubjects">
export type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, "Chat">
export type SecurityScreenNavigationProp = StackNavigationProp<RootStackParamList, "Security">

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">
export type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">
export type ScheduleLessonScreenRouteProp = RouteProp<RootStackParamList, "ScheduleLesson">

const Stack = createStackNavigator<RootStackParamList>()

const Navigator = () => {

    const { accessToken, refreshToken, isAuth, initializeAuthState } = useAuthStore();
    const { setProfile } = usePeopleStore();

    const { t } = useTranslation();

    useEffect(() => {
        initializeAuthState()
            .then()
            .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        getProfile()
            .then(setProfile)
            .catch(err => console.log(err));
    }, [accessToken, refreshToken]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { isAuth() ?
                    <>
                        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
                        <Stack.Screen options={{headerTitle: t("profile")}} name="Profile" component={ProfileScreen} />
                        <Stack.Screen options={{headerTitle: t("calendar")}} name="ScheduledLessonsScreen" component={ScheduledLessonScreen} />
                        <Stack.Screen options={{headerTitle: t("add")}} name="AddRelationScreen" component={AddRelationScreen} />
                        <Stack.Screen options={{headerShown: false}} name="Tune" component={TuneScreen} />
                        <Stack.Screen options={{headerShown: false}} name={"Chat"} component={ChatScreen} />
                        <Stack.Screen options={{headerShown: false}} name={"RequestsScreen"} component={RequestsScreen} />
                        <Stack.Screen options={{headerShown: false}} name={"ScheduleLesson"} component={ScheduleLessonScreen} />
                        <Stack.Screen options={{headerTitle: t("change-language")}} name={"ChangeLanguage"} component={ChangeLanguageScreen} />
                        <Stack.Screen options={{headerShown: false}} name={"ChangeSubjects"} component={ChangeSubjectsScreen} />
                        <Stack.Screen options={{headerShown: false}} name={"Security"} component={SecurityScreen} />
                    </> :
                    <>
                        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
                        <Stack.Screen options={{headerTitle: t("change-language")}} name={"ChangeLanguage"} component={ChangeLanguageScreen} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;