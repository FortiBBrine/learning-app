import translationUkrainian from "./ua.json"
import i18next from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    ua: {
        translation: translationUkrainian
    }
}

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "ua"
    })

export default i18next;
