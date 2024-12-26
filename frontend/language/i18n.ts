import translationUkrainian from "./ua.json";
import translationEnglish from "./uk.json";
import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
    ua: {
        translation: translationUkrainian
    },
    uk: {
        translation: translationEnglish
    }
}

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "ua"
    })

AsyncStorage.getItem("language").then((value) => {
    if (value !== null) {
        i18next.changeLanguage(value);
    }
})

export default i18next;
